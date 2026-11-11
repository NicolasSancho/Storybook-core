// Compiles the Tailwind setup from the Consumers guide against the installed package.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { brandTokenNames } from "@nicolassancho/ui";

const from = new URL("./src/styles.css", import.meta.url).pathname;
// Tailwind scans the project for classes. Limit it to `src/`, so the class names in this file
// are not found and only `@source` can bring in the package.
const base = new URL("./src/", import.meta.url).pathname;
const { css } = await postcss([tailwind({ base })]).process(readFileSync(from, "utf8"), { from });

// `bg-primary` is only in the package's JavaScript, so it appears if `@source` finds `dist/`.
assert.match(css, /\.bg-primary\b/, "a class used by the library is missing: check @source");
// The token comes from `theme.css`, imported through the package `exports` map.
assert.match(css, /--color-primary:/, "theme tokens are missing: check the theme.css export");

// The brand contract: every color, radius and font variable the compiled CSS reads is either a brand
// token (an app may override it) or on the fixed list below. A component that starts reading a new
// token fails here until the token is added to one of the two lists. Inline styles are not seen.
const fixed = new Set([
  // Semantic colors and the text color on a fill.
  "color-danger",
  "color-danger-subtle",
  "color-success",
  "color-success-subtle",
  "color-warning",
  "color-warning-subtle",
  "color-on-primary",
  "color-on-secondary",
  "color-on-danger",
  // The Popover backdrop.
  "color-black",
  // Tailwind's own preflight reads it for `code` and `pre`; no component sets it.
  "font-mono",
  // Tailwind's weight scale, which shares the `--font-` prefix with the families.
  "font-weight-normal",
  "font-weight-medium",
  "font-weight-semibold",
  "font-weight-bold",
]);
const read = new Set(
  [...css.matchAll(/var\(--((?:color|radius|font)-[a-z0-9-]+)/g)].map(([, name]) => name)
);
assert.ok(read.size > 0, "no token variables found in the compiled CSS");
const outside = [...read].filter((name) => !brandTokenNames.includes(name) && !fixed.has(name));
assert.deepEqual(outside, [], "a utility reads a token that is neither a brand token nor fixed");

console.log("Style checks passed.");
