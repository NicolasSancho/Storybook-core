import React, { useSyncExternalStore } from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import { themes } from "storybook/theming";
import {
  getThemeChoice,
  isDarkTheme,
  parseThemeChoice,
  setThemeChoice,
  subscribeThemeChoice,
} from "./theme";

type ThemedDocsContainerProps = React.ComponentProps<typeof DocsContainer>;

interface GlobalsUpdate {
  globals?: { theme?: unknown };
}

// MDX pages have no stories, so no decorator runs there: follow the toolbar from the channel.
// Registered once, when the preview loads, so it also covers a remounted container.
addons.getChannel().on(GLOBALS_UPDATED, ({ globals }: GlobalsUpdate) => {
  setThemeChoice(parseThemeChoice(globals?.theme));
});

/**
 * Docs pages (autodocs and MDX) do not run story decorators for the page itself, so this
 * container gives the docs chrome the Storybook theme that matches the toolbar choice. Without it
 * the components would be dark inside a white docs page.
 */
export const ThemedDocsContainer: React.FC<ThemedDocsContainerProps> = ({ children, context }) => {
  const choice = useSyncExternalStore(subscribeThemeChoice, getThemeChoice);

  return (
    <DocsContainer context={context} theme={isDarkTheme(choice) ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  );
};
