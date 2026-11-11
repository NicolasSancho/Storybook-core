/** WCAG 2 contrast math on `#rrggbb` colors. Shared by `validateBrand` and the Colors story. */

const channels = (hex: string): number[] =>
  [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));

const toHex = (values: number[]): string =>
  `#${values.map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;

const channelToLinear = (value: number): number => {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string): number => {
  const [r, g, b] = channels(hex).map(channelToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (foreground: string, background: string): number => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * The opaque color of `color` painted at `alpha` over `over`, as the browser blends it (in sRGB).
 * Tailwind's `bg-primary/10` is `primary` at 10% over whatever is below it.
 */
export const composite = (color: string, alpha: number, over: string): string => {
  const top = channels(color);
  const bottom = channels(over);
  return toHex(top.map((value, index) => value * alpha + bottom[index] * (1 - alpha)));
};
