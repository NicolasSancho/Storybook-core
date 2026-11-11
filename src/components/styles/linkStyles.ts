import { tv } from "./tv.js";
import { focusRing } from "./focusRing.js";

// Not exported from `src/index.js`. `inline` is always underlined, so a link in content reads as a
// link without hover. `nav` is for lists of links, where the position already says so.
export const linkStyles = tv({
  base: ["rounded-sm", focusRing],
  variants: {
    variant: {
      inline:
        "text-neutral-900 underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-900",
      nav: "text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline",
    },
  },
  defaultVariants: { variant: "inline" },
});
