<script lang="ts">
	import { onMount } from 'svelte';
	import {
		cycleThemePreference,
		getThemePreference,
		setThemePreference,
		type ThemePreference,
	} from '../lib/theme';
	import sunSvg from '../assets/sun.svg?raw';
	import moonSvg from '../assets/moon.svg?raw';
	import computerSvg from '../assets/computer.svg?raw';

	interface Props {
		wrapperClass?: string;
	}

	let { wrapperClass = '' }: Props = $props();

	let preference = $state<ThemePreference>('system');

	const icons: Record<ThemePreference, string> = {
		system: computerSvg,
		light: sunSvg,
		dark: moonSvg,
	};

	const labels: Record<ThemePreference, string> = {
		system: 'Using system appearance. Switch to light mode.',
		light: 'Using light mode. Switch to dark mode.',
		dark: 'Using dark mode. Switch to system appearance.',
	};

	onMount(() => {
		preference = getThemePreference();

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onSystemChange = () => {
			if (getThemePreference() === 'system') {
				setThemePreference('system');
			}
		};

		media.addEventListener('change', onSystemChange);
		return () => media.removeEventListener('change', onSystemChange);
	});

	function toggle() {
		preference = cycleThemePreference(preference);
		setThemePreference(preference);
	}
</script>

<div class={wrapperClass}>
	<button
		type="button"
		onclick={toggle}
		class="grid p-2 -m-1 transition rounded-full text-stone-600 dark:text-stone-100 place-items-center hover:bg-stone-800 hover:text-stone-50 dark:hover:bg-stone-50 dark:hover:text-stone-600"
		aria-label={labels[preference]}
		title={labels[preference]}
	>
		<span class="size-4 md:size-4.5">
			{@html icons[preference]}
		</span>
	</button>
</div>

<style>
	span :global(svg) {
		width: 100%;
		height: 100%;
	}
</style>
