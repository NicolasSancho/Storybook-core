// Compiles the Tailwind setup from the Consumers guide against the installed package.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const from = new URL("./src/styles.css", import.meta.url).pathname;
// Tailwind scans the project for classes. Limit it to `src/`, so the class names in this file
// are not found and only `@source` can bring in the package.
const base = new URL("./src/", import.meta.url).pathname;
const { css } = await postcss([tailwind({ base })]).process(readFileSync(from, "utf8"), { from });

// `bg-primary` is only in the package's JavaScript, so it appears if `@source` finds `dist/`.
assert.match(css, /\.bg-primary\b/, "a class used by the library is missing: check @source");
// The token comes from `theme.css`, imported through the package `exports` map.
assert.match(css, /--color-primary:/, "theme tokens are missing: check the theme.css export");

console.log("Style checks passed.");
