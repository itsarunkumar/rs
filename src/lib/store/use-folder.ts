import { writable } from 'svelte/store';
import { sep } from '@tauri-apps/api/path';
import { folderDb } from '$lib/db';
import type { Folder } from '$lib/types';

const folders = writable<Folder[]>([]);

const fetchFolders = async () => {
	const folder = await folderDb.getFolders();
	folders.set(folder);
};

const addFolder = async (path: string) => {
	const folderName = path.split(sep);
	const name = folderName[folderName.length - 1];

	await folderDb.insertFolder({ name, path });

	await fetchFolders();
};

const deleteFolder = async (folderId: string) => {
	await folderDb.deleteFolder(folderId);

	await fetchFolders();
};

export { folders, fetchFolders, addFolder, deleteFolder };
