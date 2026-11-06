import { tv } from "tailwind-variants";
import { focusRing } from "../../styles/focusRing.js";

/** The look shared by form fields, so `Input` and `Select` stay the same. */
export const fieldStyles = tv({
  base: [
    "h-10 w-full rounded-sm border bg-surface px-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    focusRing,
  ],
  variants: {
    invalid: {
      true: "border-danger",
      false: "border-neutral-400",
    },
  },
  defaultVariants: { invalid: false },
});
