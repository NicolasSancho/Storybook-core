import { tv } from "tailwind-variants";
import { focusRing } from "../../styles/focusRing.js";

// Shared by Button and ButtonLink, not exported from `src/index.js`. The hover classes are in
// `compoundVariants` because `enabled:` never matches an `<a>`. The gap between children (an icon
// and a label) is half the horizontal padding, so it scales with the size.
export const buttonStyles = tv({
  base: ["font-bold inline-flex items-center enabled:cursor-pointer", focusRing],
  variants: {
    variant: {
      primary: "rounded-sm bg-primary text-on-primary",
      secondary: "rounded-sm bg-secondary text-on-secondary",
      text: "rounded-sm text-primary",
      outline: "rounded-sm border border-neutral-400 bg-surface text-neutral-900",
    },
    size: {
      small: "min-h-8 gap-1 text-xs px-2 py-1",
      medium: "min-h-10 gap-2 text-sm px-4 py-2",
      large: "min-h-12 gap-3 text-lg px-6 py-2",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    link: {
      true: "no-underline",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "primary", link: false, class: "enabled:hover:bg-primary-darker" },
    { variant: "primary", link: true, class: "hover:bg-primary-darker" },
    { variant: "secondary", link: false, class: "enabled:hover:bg-secondary-darker" },
    { variant: "secondary", link: true, class: "hover:bg-secondary-darker" },
    { variant: "outline", link: false, class: "enabled:hover:bg-neutral-100" },
    { variant: "outline", link: true, class: "hover:bg-neutral-100" },
    { variant: "text", link: false, class: "enabled:hover:underline" },
    { variant: "text", link: true, class: "hover:underline" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "medium",
    link: false,
  },
});
