<script lang="ts">
	import type { PageData } from './$types';
	import { scripts, fetchScripts, editScript } from '$lib/store/use-script';
	import { onMount } from 'svelte';
	import { SingleScript } from '$lib/components';

	export let data: PageData;

	onMount(async () => {
		await fetchScripts();
	});
</script>

<h1 class="text-lg font-medium mx-auto px-5">Edit Scripts</h1>

<div class="flex flex-col gap-1 h-[320px] pb-4 overflow-y-scroll">
	{#each $scripts as script}
		<SingleScript {script} edit />
	{/each}
</div>
