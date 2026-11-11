/**
 * The brand contract: the tokens an app may override per brand.
 * A token name is its CSS variable without the leading `--`, so `color-primary` is `--color-primary`.
 * Every other token in `theme.css` is fixed: semantic colors, `on-*`, `black` and the deprecated
 * primary ramp. `test:package` fails when a compiled utility reads a variable that is on neither list.
 */

const neutralSteps = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const brandColorTokenNames = [
  "color-primary",
  "color-primary-darker",
  "color-secondary",
  "color-secondary-darker",
  "color-surface",
  ...neutralSteps.map((step) => `color-neutral-${step}` as const),
] as const;

export const brandRadiusTokenNames = [
  "radius-button",
  "radius-field",
  "radius-card",
  "radius-sm",
  "radius-lg",
] as const;

export const brandFontTokenNames = ["font-sans", "font-display"] as const;

export const brandTokenNames = [
  ...brandColorTokenNames,
  ...brandRadiusTokenNames,
  ...brandFontTokenNames,
] as const;

export type BrandColorToken = (typeof brandColorTokenNames)[number];
export type BrandRadiusToken = (typeof brandRadiusTokenNames)[number];
export type BrandFontToken = (typeof brandFontTokenNames)[number];
export type BrandToken = (typeof brandTokenNames)[number];

/** A light and a dark value, each a `#rrggbb` hex color. */
export type BrandColor = readonly [light: string, dark: string];

/**
 * A brand: any subset of the brand tokens. Colors are `[light, dark]` hex pairs, radii are lengths
 * (`9999px`, `0.5rem`) and fonts are font-family lists (`"Lora", serif`). A token left out keeps the
 * library default.
 */
export type Brand = Partial<
  { [Token in BrandColorToken]: BrandColor } & {
    [Token in BrandRadiusToken | BrandFontToken]: string;
  }
>;

/** A color token that a brand cannot change, but that a pairing reads. */
export type FixedColorToken =
  | "color-danger"
  | "color-danger-subtle"
  | "color-success"
  | "color-success-subtle"
  | "color-warning"
  | "color-warning-subtle"
  | "color-on-primary"
  | "color-on-secondary"
  | "color-on-danger";

export type PairingColorToken = BrandColorToken | FixedColorToken;

/** A color painted at `alpha` over `over`, as `bg-primary/10` on the surface. */
export interface TranslucentColor {
  color: PairingColorToken;
  alpha: number;
  over: PairingColorToken;
}
