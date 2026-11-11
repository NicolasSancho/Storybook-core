import type { CSSProperties } from "react";
import type { Brand } from "../../../brand/brand";
import { brandToCssVariables } from "../../../brand/validateBrand";

/**
 * Example brands for Storybook and for the `validateBrand` unit test, which checks that each one
 * is valid. They are made-up examples that show the components follow an override; they are not
 * tied to any app. "Example warm" overrides every brand token.
 */
export interface MockedBrand {
  id: string;
  title: string;
  brand: Brand;
}

export const mockedBrands: MockedBrand[] = [
  { id: "library", title: "Library blue", brand: {} },
  {
    id: "green",
    title: "Example green",
    brand: {
      "color-primary": ["#1f5f4a", "#62a088"],
      "color-primary-darker": ["#024b38", "#78b69e"],
    },
  },
  {
    id: "violet",
    title: "Example violet",
    brand: {
      "color-primary": ["#6b4cae", "#9f82e9"],
      "color-primary-darker": ["#583797", "#b499ff"],
      "radius-button": "9999px",
    },
  },
  {
    id: "warm",
    title: "Example warm",
    brand: {
      "color-primary": ["#8a3b12", "#e8946a"],
      "color-primary-darker": ["#6e2d0b", "#f2ad88"],
      "color-secondary": ["#3f4a3c", "#c9d4c5"],
      "color-secondary-darker": ["#2e372c", "#dde6da"],
      "color-surface": ["#fffdf8", "#17140f"],
      "color-neutral-25": ["#fcf9f2", "#1b1812"],
      "color-neutral-50": ["#f7f3ea", "#1f1b15"],
      "color-neutral-100": ["#ebe5d8", "#2b2620"],
      "color-neutral-200": ["#d6cfbf", "#3a342c"],
      "color-neutral-300": ["#b8b0a0", "#524b41"],
      "color-neutral-400": ["#8f8778", "#736b5f"],
      "color-neutral-500": ["#706959", "#8d8577"],
      "color-neutral-600": ["#5f584a", "#a39b8c"],
      "color-neutral-700": ["#514b3e", "#bab2a3"],
      "color-neutral-800": ["#474134", "#c9c1b2"],
      "color-neutral-900": ["#3e382c", "#d8d0c1"],
      "color-neutral-950": ["#302b21", "#ebe4d6"],
      "radius-button": "9999px",
      "radius-field": "0.5rem",
      "radius-card": "1rem",
      "radius-sm": "0.375rem",
      "radius-lg": "0.75rem",
      "font-sans": '"Trebuchet MS", ui-sans-serif, system-ui, sans-serif',
      "font-display": "Georgia, ui-serif, serif",
    },
  },
];

/** A brand's CSS custom properties, through the exported conversion apps use. */
export const brandTokens = ({ brand }: MockedBrand): Record<string, string> =>
  brandToCssVariables(brand) as Record<string, string>;

/** The same overrides as a React `style` prop, to scope a brand to one element. */
export const brandStyle = (brand: MockedBrand): CSSProperties =>
  brandTokens(brand) as CSSProperties;
