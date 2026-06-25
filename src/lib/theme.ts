export type ThemePreference = 'light' | 'dark' | 'system';

const storageKey = 'theme';

export function getThemePreference(): ThemePreference {
	const stored = localStorage.getItem(storageKey);
	if (stored === 'light' || stored === 'dark') return stored;
	return 'system';
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
