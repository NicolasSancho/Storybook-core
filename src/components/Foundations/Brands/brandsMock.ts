import type { CSSProperties } from "react";

/**
 * Example brands for Storybook. A tenant's brand is two tokens, `--color-primary` and
 * `--color-primary-darker`, each with a light and a dark value. These are made-up examples that
 * show the components follow an override; they are not tied to any app's tenants.
 */
export interface MockedBrand {
  id: string;
  title: string;
  /** `[light, dark]` values. Omitted for the library's own blue. */
  primary?: [string, string];
  /** `[light, dark]` hover values. */
  primaryDarker?: [string, string];
}

export const mockedBrands: MockedBrand[] = [
  { id: "library", title: "Library blue" },
  {
    id: "green",
    title: "Example green",
    primary: ["#1f5f4a", "#62a088"],
    primaryDarker: ["#024b38", "#78b69e"],
  },
  {
    id: "violet",
    title: "Example violet",
    primary: ["#6b4cae", "#9f82e9"],
    primaryDarker: ["#583797", "#b499ff"],
  },
];

/** The token overrides of a brand as inline custom properties (none for the library blue). */
export const brandTokens = (brand: MockedBrand): Record<string, string> =>
  brand.primary && brand.primaryDarker
    ? {
        "--color-primary": `light-dark(${brand.primary[0]}, ${brand.primary[1]})`,
        "--color-primary-darker": `light-dark(${brand.primaryDarker[0]}, ${brand.primaryDarker[1]})`,
      }
    : {};

/** The same overrides as a React `style` prop, to scope a brand to one element. */
export const brandStyle = (brand: MockedBrand): CSSProperties =>
  brandTokens(brand) as CSSProperties;
