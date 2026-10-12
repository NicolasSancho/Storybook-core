import type { Preview } from "@storybook/react-vite";
import "../src/styles/tailwind.css";
import { ThemedDocsContainer } from "./ThemedDocsContainer";
import { initialThemeChoice, parseThemeChoice, setThemeChoice } from "./theme";

const preview: Preview = {
  // Theme switch in the toolbar: Light and Dark force the theme, System follows the OS
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "auto", title: "System" },
        ],
      },
    },
  },
  initialGlobals: { theme: initialThemeChoice() },
  decorators: [
    (Story, context) => {
      setThemeChoice(parseThemeChoice(context.globals.theme));
      return Story();
    },
  ],
  // Stories have no router: a real link would load a missing page inside the preview iframe.
  // Cancel the navigation (the click handlers still run), and clean up after each story.
  beforeEach: () => {
    const cancelNavigation = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a[href]")) {
        event.preventDefault();
      }
    };
    document.addEventListener("click", cancelNavigation);
    return () => document.removeEventListener("click", cancelNavigation);
  },
  parameters: {
    docs: { container: ThemedDocsContainer },
    // Welcome first, then setup and the tokens, then the components
    options: {
      storySort: {
        order: [
          "Welcome",
          "Consumers",
          "Foundations",
          "Atoms",
          "Molecules",
          "Organisms",
          "Layouts",
        ],
      },
    },
    // Run axe on every story in `npm test`; a violation fails the story
    a11y: { test: "error" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
