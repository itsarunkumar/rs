import { writable, derived } from 'svelte/store';
import Fuse from 'fuse.js';

import { localStore } from './local-store';
import { ALL_SCRIPTS } from './store-constants';

import type { Script } from '$lib/types';

const scripts = writable<Script[]>([]);

const searchTerm = writable<string>('');

const searchResults = derived([scripts, searchTerm], ([$scripts, $searchTerm]) => {
	if (!$searchTerm) {
		return [];
	}

	const flattenedData = $scripts.flat();
	const fuse = new Fuse(flattenedData, {
		shouldSort: true,
		includeScore: true,
		threshold: 0.6,
		keys: ['name', 'path', 'fileName']
	});

	const results = fuse.search($searchTerm);
	return results.map((result) => result.item);
});

const fetchScripts = async () => {
	const scriptsData = (await localStore.getStore(ALL_SCRIPTS)) as (Script | null)[];
	scripts.set(scriptsData as Script[]);
};

const editScript = async (script: Script, name: string) => {
	const oldScripts = (await localStore.getStore(ALL_SCRIPTS)) as Script[];
	const editScript = oldScripts.find((s) => s.path === script.path);

	const unEditedScripts = oldScripts.filter((s) => s.path !== script.path);
	const newScripts = [...unEditedScripts, { ...editScript, name }];

	await localStore.newStore(ALL_SCRIPTS, newScripts);
	await fetchScripts();
};

const search = (search: string) => {
	searchTerm.set(search as string);
};

export { scripts, searchTerm, searchResults, fetchScripts, editScript, search };
