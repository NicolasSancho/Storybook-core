import { createTV } from "tailwind-variants";

/**
 * The library's `tv()`. Every component imports it from here, never from `tailwind-variants`
 * (an ESLint rule enforces this), so the tailwind-merge configuration that resolves a consumer's
 * `className` against the component classes is the same everywhere.
 */
export const tv = createTV({});
