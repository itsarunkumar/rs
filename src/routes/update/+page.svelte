<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import { checkUpdate, type UpdateResult } from '@tauri-apps/api/updater';

	export let data: PageData;

	let update: UpdateResult;

	onMount(async () => {
		update = await checkUpdate();
	});
</script>

<div class="w-full h-full flex flex-col items-center">
	<h1>Update Page</h1>
	{#if update}
		<div>
			{JSON.stringify(update)}
		</div>
	{/if}
</div>
