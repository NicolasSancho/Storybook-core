import path from "node:path";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// Every story runs twice, once per theme, so dark mode gets the same play and axe checks.
const storybookProject = (theme: "light" | "dark") => ({
  extends: true,
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({ configDir: path.join(import.meta.dirname, ".storybook") }),
  ],
  test: {
    name: theme === "light" ? "storybook" : "storybook-dark",
    env: { STORYBOOK_THEME: theme },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" as const }],
    },
  },
});

export default defineConfig({
  test: {
    projects: [storybookProject("light"), storybookProject("dark")],
  },
});
