export type ThemePreference = 'light' | 'dark' | 'system';

export const THEME_LABELS: Record<ThemePreference, string> = {
	system: 'Using system appearance. Switch to light mode.',
	light: 'Using light mode. Switch to dark mode.',
	dark: 'Using dark mode. Switch to system appearance.',
};

/** Matches body `bg-stone-100` / `dark:bg-stone-800`. */
export const THEME_SURFACE_COLORS = {
	light: '#f5f5f4',
	dark: '#292524',
} as const;

const storageKey = 'theme';

export function getThemePreference(): ThemePreference {
	const stored = localStorage.getItem(storageKey);
	if (stored === 'light' || stored === 'dark') return stored;
	return 'system';
}

/** Read preference synced to <html data-theme-preference> by the inline head script. */
export function getThemePreferenceFromDocument(): ThemePreference {
	const fromDom = document.documentElement.dataset.themePreference;
	if (fromDom === 'light' || fromDom === 'dark' || fromDom === 'system') {
		return fromDom;
	}
	return getThemePreference();
}

export function syncThemePreferenceDataset(preference: ThemePreference): void {
	document.documentElement.dataset.themePreference = preference;
}

export function resolveDark(preference: ThemePreference): boolean {
	if (preference === 'dark') return true;
	if (preference === 'light') return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(dark: boolean): void {
	document.documentElement.classList.toggle('dark', dark);
	applyThemeColor(dark);
}

export function applyThemeColor(dark: boolean): void {
	const color = dark ? THEME_SURFACE_COLORS.dark : THEME_SURFACE_COLORS.light;

	for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
		meta.remove();
	}

	const themeColor = document.createElement('meta');
	themeColor.name = 'theme-color';
	themeColor.content = color;
	document.head.appendChild(themeColor);

	const colorScheme = document.querySelector('meta[name="color-scheme"]');
	if (colorScheme) colorScheme.setAttribute('content', dark ? 'dark' : 'light');

	const appleStatus = document.querySelector(
		'meta[name="apple-mobile-web-app-status-bar-style"]',
	);
	if (appleStatus) appleStatus.setAttribute('content', dark ? 'black' : 'default');
}

export function setThemePreference(preference: ThemePreference): void {
	if (preference === 'system') {
		localStorage.removeItem(storageKey);
	} else {
		localStorage.setItem(storageKey, preference);
	}
	syncThemePreferenceDataset(preference);
	applyTheme(resolveDark(preference));
}

export function cycleThemePreference(
	preference: ThemePreference,
): ThemePreference {
	const order: ThemePreference[] = ['system', 'light', 'dark'];
	return order[(order.indexOf(preference) + 1) % order.length];
}

export function isDark(): boolean {
	return document.documentElement.classList.contains('dark');
}
