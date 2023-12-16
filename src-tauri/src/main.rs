// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process;
use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

// src-tauri/src/utils/mod.rs
mod utils;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn run_script(command: String, args: Vec<String>) -> String {
    println!("Running script: {command} {args:?}");
    process::Command::new(command)
        .args(args)
        .spawn()
        .unwrap()
        .id()
        .to_string()
}

fn main() {
    tauri::Builder::default()
        .system_tray(utils::make_tray())
        .on_system_tray_event(utils::handle_tray_event)
        .invoke_handler(tauri::generate_handler![
            greet,
            run_script,
            utils::open_script
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);

            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_fs_extra::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
