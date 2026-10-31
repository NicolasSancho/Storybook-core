import type { Preview } from "@storybook/react-vite";
import "../src/styles/tailwind.css";
import { brandTokens, mockedBrands } from "../src/components/Foundations/Brands/brandsMock";
import { ThemedDocsContainer } from "./ThemedDocsContainer";
import { initialThemeChoice, parseThemeChoice, setThemeChoice } from "./theme";

/** Sets the chosen example brand's tokens on <html>, and clears the previous brand's. */
const applyBrand = (id: unknown): void => {
  const root = document.documentElement.style;
  const tokens = brandTokens(mockedBrands.find((brand) => brand.id === id) ?? mockedBrands[0]);
  ["--color-primary", "--color-primary-darker"].forEach((name) => {
    if (name in tokens) root.setProperty(name, tokens[name]);
    else root.removeProperty(name);
  });
};

const preview: Preview = {
  // Theme switch in the toolbar: Light and Dark force the theme, System follows the OS. The Brand
  // switch sets the two brand tokens on <html> from example brands, to see any story re-themed.
  globalTypes: {
    brand: {
      description: "Example brand",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        dynamicTitle: true,
        items: mockedBrands.map(({ id, title }) => ({ value: id, title })),
      },
    },
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
  initialGlobals: { theme: initialThemeChoice(), brand: "library" },
  decorators: [
    (Story, context) => {
      setThemeChoice(parseThemeChoice(context.globals.theme));
      applyBrand(context.globals.brand);
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
