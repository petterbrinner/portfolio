export type ThemePreference = 'light' | 'dark' | 'system';

export const THEME_LABELS: Record<ThemePreference, string> = {
	system: 'Using system appearance. Switch to light mode.',
	light: 'Using light mode. Switch to dark mode.',
	dark: 'Using dark mode. Switch to system appearance.',
};

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
