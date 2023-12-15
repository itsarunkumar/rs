<script lang="ts">
	const configs = [
		{
			name: 'Folders',
			url: '/folders',
			description: 'add and remove folders'
		},
		{
			name: 'Languages',
			url: '/languages',
			description: 'add and remove languages'
		},
		{
			name: 'Scripts',
			url: '/edit-scripts',
			description: 'edit property of scripts'
		},
		{
			name: 'Update',
			url: '/update',
			description: 'check for updates'
		}
	];
</script>

<div class="px-5 flex flex-row flex-wrap gap-5 my-2">
	{#each configs as config (config.url)}
		<a
			href={config.url}
			class=" w-72 h-28 px-4 bg-gray-900 hover:bg-gray-800 text-slate-50 border border-slate-800 border-opacity-20 rounded-md flex flex-col justify-center items-start gap-2"
		>
			<h1 class="capitalize text-lg font-bold">
				{config.name}
			</h1>
			<p class="text-sm text-gray-500">
				{config.description}
			</p>
		</a>
	{/each}
</div>
