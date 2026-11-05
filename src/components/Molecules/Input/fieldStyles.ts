import { tv } from "tailwind-variants";

/** The look shared by form fields, so `Input` and `Select` stay the same. */
export const fieldStyles = tv({
  base: "w-full rounded-sm border bg-surface px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    invalid: {
      true: "border-danger focus:border-danger focus:ring-danger",
      false: "border-neutral-400 focus:border-primary focus:ring-primary",
    },
  },
  defaultVariants: { invalid: false },
});
