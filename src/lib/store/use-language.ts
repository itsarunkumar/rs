import { writable } from 'svelte/store';
import type { Language } from '$lib/types';
import { appConfig } from './config-store';

const languages = writable<Language[]>([]);

const fetchLanguages = async () => {
	const lang = await appConfig.getStore('language');

	languages.set(lang as Language[]);
};

const addLanguage = async (lang: Language) => {
	await appConfig.setLanguage(lang);
	await fetchLanguages();
};

const removeLanguage = async (lang: Language) => {
	await appConfig.removeLanguage(lang);
	await fetchLanguages();
};

export { languages, fetchLanguages, addLanguage, removeLanguage };
