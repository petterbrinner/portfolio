<script lang="ts">
	import { onMount } from 'svelte';
	import {
		THEME_LABELS,
		cycleThemePreference,
		getThemePreferenceFromDocument,
		setThemePreference,
		type ThemePreference,
	} from '../lib/theme';
	import sunSvg from '../assets/sun.svg?raw';
	import moonSvg from '../assets/moon.svg?raw';
	import computerSvg from '../assets/computer.svg?raw';
	import arrowsSvg from '../assets/arrows.svg?raw';

	const themeIcons = [
		{ preference: 'light', label: 'Ljust', svg: sunSvg },
		{ preference: 'system', label: 'Auto', svg: computerSvg },
		{ preference: 'dark', label: 'Mörkt', svg: moonSvg },
	] as const;

	let preference = $state<ThemePreference>('system');

	onMount(() => {
		preference = getThemePreferenceFromDocument();

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onSystemChange = () => {
			if (getThemePreferenceFromDocument() === 'system') {
				setThemePreference('system');
				preference = 'system';
			}
		};

		media.addEventListener('change', onSystemChange);
		return () => media.removeEventListener('change', onSystemChange);
	});

	function toggle() {
		const next = cycleThemePreference(getThemePreferenceFromDocument());
		setThemePreference(next);
		preference = next;
	}
</script>


	<button
		id="theme-toggle"
		type="button"
		class="grid! place-items-center px-0.5 md:py-0.5 md:px-2! font-serif text-base font-medium transition border rounded styled-anchor gap-x-2 theme-toggle border-current/25"
		aria-label={THEME_LABELS[preference]}
		title={THEME_LABELS[preference]}
		onclick={toggle}
	>
		{#each themeIcons as { preference: iconPreference, label, svg } (iconPreference)}
            <span class="flex gap-[0.25em] items-center col-start-1 row-start-1 {preference === iconPreference ? '' : 'invisible'}">
                <span class="theme-toggle-label">{label}</span>
                <span
                    class="grid theme-toggle-svg theme-toggle-icon place-items-center size-4"
                    data-theme-icon={iconPreference}
                >
				    {@html svg}
                </span>
                <!-- <span
                    class="ml-auto size-4"
                >
                    {@html arrowsSvg}
                </span> -->
            </span>
		{/each}
	</button>
