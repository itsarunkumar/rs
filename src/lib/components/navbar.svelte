<script>
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
</script>

<nav class="px-5 flex items-center gap-3 capitalize font-medium mb-2 text-gray-500">
	<a href="/" class={cn('', $page.route.id === '/' ? 'underline text-gray-950' : '')}>scripts</a>
	<a href="/config" class={cn('', $page.route.id === '/config' ? 'underline text-gray-950' : '')}
		>config</a
	>
</nav>
