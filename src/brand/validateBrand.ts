import {
  brandColorTokenNames,
  brandFontTokenNames,
  brandRadiusTokenNames,
  type BrandColor,
  type BrandToken,
  type PairingColorToken,
  type TranslucentColor,
} from "./brand.js";
import { composite, contrastRatio } from "./contrast.js";
import { defaultColors, pairings } from "./pairings.js";

export type BrandTheme = "light" | "dark";

/** Why a brand was rejected. Data, not messages, so an app can word and translate them. */
export type BrandFailure =
  /** The brand is not a plain object. */
  | { kind: "invalid-brand"; value: unknown }
  /** A key that is not a brand token. */
  | { kind: "unknown-token"; token: string }
  /** A value that is not a `[light, dark]` hex pair, a length or a font-family list. */
  | { kind: "format"; token: BrandToken; value: unknown }
  /** A pairing the components use that misses its contrast target in one theme. */
  | {
      kind: "contrast";
      /** The pairing's stable id, such as `primary-button-text`. Key translations on it. */
      pairing: string;
      /** English description of the pairing, for logs. */
      label: string;
      theme: BrandTheme;
      foreground: PairingColorToken;
      background: PairingColorToken | TranslucentColor;
      ratio: number;
      min: number;
    };

const HEX = /^#[0-9a-f]{6}$/i;
// Plain lengths only: these values end up in CSS, so nothing that could close a declaration,
// call a function (`var()`, `url()`) or reach another property gets through.
const LENGTH = /^(0|(\d{1,4}(\.\d{1,4})?|\.\d{1,4})(px|rem|em))$/;
// A family is a quoted name or unquoted words. Quoted names exclude quotes, backslashes, the
// characters that end a declaration or a rule, and control characters: a newline ends a CSS string
// early, and the rest of the stylesheet would then be read as part of it.
const QUOTED = String.raw`"[^"\\;{}<>\x00-\x1f\x7f]*"|'[^'\\;{}<>\x00-\x1f\x7f]*'`;
const UNQUOTED = String.raw`[A-Za-z][A-Za-z0-9-]*(?: [A-Za-z][A-Za-z0-9-]*)*`;
const FAMILY = `(?:${QUOTED}|${UNQUOTED})`;
const FONT_LIST = new RegExp(`^${FAMILY}(?:\\s*,\\s*${FAMILY})*$`);
// CSS-wide keywords (and `default`, which CSS reserves) are valid custom property values but not font
// families: `initial` would turn the page into the browser's default serif.
const CSS_WIDE_KEYWORDS = new Set([
  "inherit",
  "initial",
  "unset",
  "revert",
  "revert-layer",
  "default",
]);

const isHex = (value: unknown): boolean => typeof value === "string" && HEX.test(value);

const isColor = (value: unknown): value is BrandColor =>
  Array.isArray(value) && value.length === 2 && isHex(value[0]) && isHex(value[1]);

const isFontList = (value: unknown): boolean =>
  typeof value === "string" &&
  value.length <= 200 &&
  FONT_LIST.test(value) &&
  [...value.matchAll(new RegExp(FAMILY, "g"))].every(
    ([family]) => !CSS_WIDE_KEYWORDS.has(family.toLowerCase())
  );

const colorTokens = new Set<string>(brandColorTokenNames);
const radiusTokens = new Set<string>(brandRadiusTokenNames);
const fontTokens = new Set<string>(brandFontTokenNames);

const isValid = (token: string, value: unknown): boolean => {
  if (colorTokens.has(token)) return isColor(value);
  if (radiusTokens.has(token)) return typeof value === "string" && LENGTH.test(value);
  return isFontList(value);
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** The tokens a brand sets. A key whose value is `undefined` is not set, as `Partial` allows. */
const entries = (brand: Record<string, unknown>): [string, unknown][] =>
  Object.entries(brand).filter(([, value]) => value !== undefined);

const formatFailures = (brand: unknown): BrandFailure[] => {
  if (!isPlainObject(brand)) return [{ kind: "invalid-brand", value: brand }];
  return entries(brand).flatMap(([token, value]): BrandFailure[] => {
    if (!colorTokens.has(token) && !radiusTokens.has(token) && !fontTokens.has(token)) {
      return [{ kind: "unknown-token", token }];
    }
    return isValid(token, value) ? [] : [{ kind: "format", token: token as BrandToken, value }];
  });
};

const THEMES: BrandTheme[] = ["light", "dark"];

/**
 * Checks a brand that the app did not write itself. It takes `unknown`, so input can be passed as
 * it arrives. First the format: the brand must be a plain object, every key a
 * brand token and every value a `[light, dark]` pair of `#rrggbb` colors, a length (`px`, `rem` or
 * `em`) or a font-family list, because the values end up in CSS. Then, if the format is valid, the
 * brand is laid over the library defaults and every pairing in the library's list (the colors the
 * components put on each other) is checked in both themes. Returns the failures; an empty array means
 * the brand is valid.
 */
export const validateBrand = (brand: unknown): BrandFailure[] => {
  const failures = formatFailures(brand);
  if (failures.length > 0 || !isPlainObject(brand)) return failures;

  const colors: Record<PairingColorToken, BrandColor> = { ...defaultColors };
  entries(brand).forEach(([token, value]) => {
    if (colorTokens.has(token)) colors[token as PairingColorToken] = value as BrandColor;
  });

  return THEMES.flatMap((theme) => {
    const side = theme === "light" ? 0 : 1;
    return pairings.flatMap((pairing): BrandFailure[] => {
      const { background } = pairing;
      const backgroundHex =
        typeof background === "string"
          ? colors[background][side]
          : composite(
              colors[background.color][side],
              background.alpha,
              colors[background.over][side]
            );
      const ratio = contrastRatio(colors[pairing.foreground][side], backgroundHex);
      return ratio >= pairing.min
        ? []
        : [
            {
              kind: "contrast",
              pairing: pairing.id,
              label: pairing.label,
              theme,
              foreground: pairing.foreground,
              background,
              ratio,
              min: pairing.min,
            },
          ];
    });
  });
};
