<script>
	import { SingleScript } from '$lib/components';
	import { scripts, fetchScripts } from '$lib/store/use-script';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetchScripts();
	});
</script>

<div class="w-full h-full flex flex-col gap-1">
	<div class="flex flex-col gap-1 h-[320px] overflow-y-scroll">
		{#each $scripts as script}
			<SingleScript {script} />
		{/each}
	</div>
</div>
