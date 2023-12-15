<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { languages, fetchLanguages, addLanguage, removeLanguage } from '$lib/store/use-language';
	import type { Language } from '$lib/types';
	import clickOutside from '$lib/actions/click-outside';
	import { Trash2 } from 'lucide-svelte';

	export let data: PageData;

	let dialog: HTMLDialogElement;

	let newLanguage: Language = {
		name: '',
		extension: '',
		command: ''
	};

	async function addLanguageto({ name, extension, command }: Language) {
		// console.log({ name, extension, command });
		await addLanguage({ name, extension, command });
	}

	async function removeLanguagefrom(lang: Language) {
		await removeLanguage(lang);
	}

	onMount(async () => {
		await fetchLanguages();
	});
</script>

<div class="w-full flex items-center justify-between px-5 pb-3">
	<h1 class="capitalize font-medium">Languages</h1>
	<button
		on:click={() => dialog.showModal()}
		class="px-3 py-1 rounded text-slate-50 bg-slate-900 hover:bg-slate-800">Add language</button
	>
</div>

<div class=" h-[300px] px-5 py-3 flex flex-row flex-wrap gap-5 my-2 overflow-y-scroll">
	{#each $languages as language}
		<div
			class="relative w-72 h-28 px-4 cursor-pointer bg-gray-900 hover:bg-gray-800 text-slate-50 border border-slate-800 border-opacity-20 rounded-md flex flex-col justify-center items-start gap-2"
		>
			<h1 class="capitalize text-lg font-bold">
				{language.name}
			</h1>
			<p class="text-sm text-gray-500">
				command to execute : {language.command}
			</p>
			<p class="text-sm text-gray-500 lowercase">
				Script Extension : {language.extension}
			</p>
			<button
				class="absolute -top-1 -right-1 bg-slate-100 p-1 rounded rounded-bl-lg hover:bg-slate-200"
				on:click={() => removeLanguagefrom(language)}
			>
				<Trash2 class="w-4 h-4 text-rose-600" />
			</button>
		</div>
	{/each}
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click|self={() => dialog.close()}
	class="w-96 h-72 border rounded-md p-2"
>
	<div class="flex flex-col gap-1 items-center">
		<h1 class="capitalize font-medium">Add language</h1>

		<label for="language" class="flex flex-col w-full">
			<h3 class="text-sm font-medium">Language name:</h3>
			<input
				class="w-full px-3 py-2 border outline-none rounded"
				bind:value={newLanguage.name}
				type="text"
				name="language"
				id="language"
				placeholder="Language name"
			/>
		</label>
		<label for="command" class="flex flex-col w-full">
			<h3 class="text-sm font-medium">Command:</h3>
			<input
				class="w-full px-3 py-2 border outline-none rounded"
				bind:value={newLanguage.command}
				type="text"
				name="command"
				id="command"
				placeholder="Command "
			/>
		</label>

		<label for="extension" class="flex flex-col w-full">
			<h3 class="text-sm font-medium">Exetension:</h3>
			<input
				class="w-full px-3 py-2 border outline-none rounded"
				bind:value={newLanguage.extension}
				type="text"
				name="extension"
				id="extension"
				placeholder="Extension"
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
					addLanguageto(newLanguage);
					newLanguage = {
						name: '',
						extension: '',
						command: ''
					};
					dialog.close();
				}}>Add</button
			>
		</div>
	</div>
</dialog>
