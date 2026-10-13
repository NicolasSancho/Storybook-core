import { tv } from "tailwind-variants";

// Shared by Chip (a button) and ChipLink (a link) so the two look the same. It is not exported
// from `src/index.js`: it is an implementation detail, not public API.
export const chipStyles = tv({
  base: "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  variants: {
    selected: {
      true: "border-primary bg-primary text-on-primary hover:bg-primary-darker",
      false: "border-neutral-400 bg-surface text-neutral-900 hover:border-neutral-900",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: {
    selected: false,
  },
});
