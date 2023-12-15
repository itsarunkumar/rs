<script lang="ts">
	import { onMount } from 'svelte';
	import { open } from '@tauri-apps/api/dialog';

	import type { PageData } from './$types';

	import { addFolder, folders, fetchFolders, deleteFolder } from '$lib/store/use-folder';

	export let data: PageData;

	async function addNewFolder() {
		const path = (await open({ directory: true })) as string;
		await addFolder(path);
	}

	async function removeFolder(id: string | undefined) {
		await deleteFolder(id as string);
	}

	onMount(async () => {
		await fetchFolders();
	});
</script>

<div class="w-full flex items-center justify-between px-5 pb-3">
	<h1 class="capitalize font-medium">Folders</h1>
	<button
		class="px-3 py-1 rounded text-slate-50 bg-slate-900 hover:bg-slate-800"
		on:click={addNewFolder}>Add folder</button
	>
</div>
<div class="flex flex-col gap-1 h-[300px] overflow-y-scroll">
	{#each $folders as folder (folder.id)}
		<div
			class=" w-5/6 cursor-pointer mx-auto flex justify-between items-center gap-2 py-2 px-5 rounded-md hover:bg-gray-200 my-2"
		>
			<div>
				<h1 class="capitalize text-base font-medium">{folder.name}</h1>
				<p class="text-xs text-gray-600">{folder.path}</p>
			</div>
			<button
				class="px-3 py-1 rounded text-slate-50 bg-slate-900 hover:bg-slate-800"
				on:click={() => removeFolder(folder.id)}
			>
				Remove
			</button>
		</div>
	{/each}
</div>
