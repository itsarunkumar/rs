<script lang="ts">
	import '../app.css';

	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { appWindow } from '@tauri-apps/api/window';
	import { getName, getVersion } from '@tauri-apps/api/app';
	import { register } from '@tauri-apps/api/globalShortcut';
	import { enable, isEnabled } from 'tauri-plugin-autostart-api';

	import { Navbar, SearchBar } from '$lib/components';
	import { initializeApp } from '$lib/init/initialize';
	import { fetchFolders } from '$lib/store/use-folder';
	import { fetchScripts } from '$lib/store/use-script';

	let name: string;
	let version: string;

	function closeonEsc(event: { code: string }) {
		if (event.code === 'Escape') {
			appWindow.hide();
		}
	}

	onMount(async () => {
		name = await getName();
		version = await getVersion();

		await initializeApp();
		await fetchFolders();
		await fetchScripts();
		await enable();

		await register('Alt+;', () => {
			appWindow.isVisible().then((visible) => {
				console.log(visible);
				if (visible) {
					appWindow.hide();
				} else {
					appWindow.show();
				}
			});
		});
		console.log('auto', await isEnabled());

		document.addEventListener('keydown', closeonEsc);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', closeonEsc);
	});
</script>

<div class="w-full h-full relative bg-slate-100 text-slate-950">
	<SearchBar />
	<Navbar />
	<slot />
	<div
		class="absolute bottom-0 w-full flex items-center justify-between gap-2 bg-slate-950 text-slate-50 px-2"
	>
		<span class="text-sm">{$page.url.pathname}</span>
		{#if name && version}
			<p class="text-sm">{name} {version}</p>
		{/if}
		<button on:click={() => appWindow.hide()}>close</button>
	</div>
</div>

<style>
</style>
