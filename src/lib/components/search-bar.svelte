<script>
	import { onMount } from 'svelte';

	import { Search, SearchX } from 'lucide-svelte';

	import { searchResults, searchTerm, fetchScripts } from '$lib/store/use-script';
	import { cn } from '$lib/utils';

	import SingleScript from './single-script.svelte';

	onMount(async () => {
		await fetchScripts();
	});
</script>

<div
	class={cn('w-full  border-b border-gray-400 border-opacity-20 ', {
		'h-full': $searchTerm.length > 0
	})}
>
	<div class="flex flex-col px-2 cursor-pointer border-b border-gray-800 border-opacity-30">
		<div class="flex items-center px-2 cursor-pointer">
			<input
				type="text"
				name="search"
				id="search"
				placeholder="Search for your script..."
				class="bg-transparent text-slate-950 w-full px-2 py-3 placeholder:text-gray-500 border-none outline-none"
				bind:value={$searchTerm}
			/>

			{#if $searchResults.length > 0}
				<button on:click={() => ($searchTerm = '')}
					><SearchX class="w-5 h-5 text-gray-500 hover:text-gray-900" /></button
				>
			{:else}
				<Search class="w-5 h-5 text-gray-500 hover:text-gray-900" />
			{/if}
		</div>
	</div>

	{#if $searchTerm && $searchResults.length > 0}
		{#each $searchResults as result}
			<SingleScript script={result} />
		{/each}
	{:else if $searchTerm.length > 0 && $searchResults.length === 0}
		<p class="text-center w-full my-auto">No results</p>
	{/if}
</div>
