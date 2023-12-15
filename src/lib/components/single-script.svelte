<script lang="ts">
	import { onMount } from 'svelte';
	import { Play } from 'lucide-svelte';

	import type { Language } from '$lib/types';

	import { executeScript } from '$lib/rust';
	import { appConfig } from '$lib/store/config-store';
	import { editScript } from '$lib/store/use-script';
	import { openFile } from '$lib/rust';

	export let script: import('$lib/types').Script;

	export let edit: boolean = false;

	let dialog: HTMLDialogElement;
	let name: string;

	let cmdLang: Language;

	onMount(async () => {
		const extension = script.fileName.split('.').toReversed()[0];

		cmdLang = (await appConfig.getLangAndCommand(extension)) as Language;
	});
</script>

{#if edit}
	<div
		class="w-4/6 cursor-pointer mx-auto px-4 py-2 flex items-center justify-between rounded-md border hover:bg-gray-200"
	>
		<div>
			<h1 class="capitalize font-medium">
				{script.name} -
				<span class="text-sm font-normal text-gray-500 lowercase">{cmdLang && cmdLang.name}</span>
			</h1>
			<p class="text-sm">{script.fileName}</p>
		</div>

		<div class="flex items-center gap-2">
			<button
				on:click={() => {
					openFile(script.path);
				}}
				class="px-2 py-1 rounded flex items-center gap-2 text-slate-50 bg-slate-900 hover:bg-slate-800"
			>
				Open
			</button>
			<button
				on:click={() => dialog.showModal()}
				class="px-2 py-1 rounded flex items-center gap-2 text-slate-50 bg-slate-900 hover:bg-slate-800"
			>
				Edit
			</button>
		</div>
	</div>
{:else}
	<div
		class="w-4/6 cursor-pointer mx-auto px-4 py-2 flex items-center justify-between rounded-md border hover:bg-gray-200"
	>
		<div>
			<h1 class="capitalize font-medium">
				{script.name} -
				<span class="text-sm font-normal text-gray-500 lowercase">{cmdLang && cmdLang.name}</span>
			</h1>
			<p class="text-sm">{script.fileName}</p>
		</div>
		<button
			class="px-2 py-1 rounded flex items-center gap-2 text-slate-50 bg-slate-900 hover:bg-slate-800"
			on:click={() => executeScript({ command: cmdLang?.command, args: [script.path] })}
			>Run <Play class="w-4 h-4" />
		</button>
	</div>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click|self={() => dialog.close()}
	class="w-96 h-40 border rounded-md p-2"
>
	<div class="flex flex-col gap-1 items-center">
		<h1 class="capitalize font-medium">Change script name</h1>

		<label for="language" class="flex flex-col w-full">
			<h3 class="text-sm font-medium">Script name:</h3>
			<input
				class="w-full px-3 py-2 border outline-none rounded"
				bind:value={name}
				type="text"
				name="new_name"
				id="new_name"
				placeholder="Script Name"
			/>
		</label>

		<div class=" w-full flex gap-2 items-center justify-around py-2">
			<button
				class=" w-full px-3 py-1 rounded text-slate-50 bg-slate-900 hover:bg-slate-800"
				on:click={() => {
					dialog.close();
				}}>Close</button
			>
			<button
				class=" w-full px-3 py-1 rounded text-slate-50 bg-slate-900 hover:bg-slate-800"
				on:click={() => {
					editScript(script, name);
					dialog.close();
				}}>Save</button
			>
		</div>
	</div>
</dialog>
