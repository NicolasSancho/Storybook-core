/**
 * Theme switching for the Storybook preview. The library itself only reads `data-theme` on
 * <html> (see src/styles/theme.css); this file is the toolbar side of that contract.
 */
export type ThemeChoice = "light" | "dark" | "auto";

export const themeChoices: ThemeChoice[] = ["light", "dark", "auto"];

export const parseThemeChoice = (value: unknown): ThemeChoice =>
  themeChoices.find((choice) => choice === value) ?? "light";

/**
 * The theme a fresh Storybook starts in. `npm test` runs the stories a second time with
 * `STORYBOOK_THEME=dark` (see vitest.config.ts), so dark mode is held to the same axe checks.
 */
export const initialThemeChoice = (): ThemeChoice => {
  const env = (import.meta as { env?: Record<string, string | undefined> }).env;
  return parseThemeChoice(env?.STORYBOOK_THEME);
};

/** "light" and "dark" force the theme; "auto" removes the attribute so the OS setting decides. */
export const applyTheme = (choice: ThemeChoice): void => {
  const root = document.documentElement;
  if (choice === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", choice);
  }
};

/**
 * The current toolbar choice, kept outside React. Storybook remounts the docs container when the
 * globals change, so component state would reset to the (stale) iframe URL on every switch.
 */
let currentChoice: ThemeChoice | undefined;
const listeners = new Set<() => void>();

export const getThemeChoice = (): ThemeChoice =>
  (currentChoice ??= themeFromUrl() ?? initialThemeChoice());

export const subscribeThemeChoice = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Records the choice, applies it to <html> and tells the docs container. */
export const setThemeChoice = (choice: ThemeChoice): void => {
  applyTheme(choice);
  if (choice === currentChoice) return;
  currentChoice = choice;
  listeners.forEach((listener) => listener());
};

export const isDarkTheme = (choice: ThemeChoice): boolean =>
  choice === "dark" ||
  (choice === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);

/** The toolbar value Storybook puts in the iframe URL (`?globals=theme:dark`), if any. */
export const themeFromUrl = (): ThemeChoice | undefined => {
  const globals = new URLSearchParams(window.location.search).get("globals") ?? "";
  const entry = globals.split(";").find((item) => item.startsWith("theme:"));
  return entry ? parseThemeChoice(entry.slice("theme:".length)) : undefined;
};
