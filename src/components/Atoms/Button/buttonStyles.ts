import { tv } from "tailwind-variants";

// Shared by Button and ButtonLink, not exported from `src/index.js`. The hover classes are in
// `compoundVariants` because `enabled:` never matches an `<a>`.
export const buttonStyles = tv({
  base: "font-bold inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  variants: {
    variant: {
      primary: "rounded-sm bg-primary text-on-primary",
      secondary: "rounded-sm bg-secondary text-on-secondary focus-visible:ring-secondary",
      text: "rounded-sm text-primary",
    },
    size: {
      small: "text-xs px-2 py-1",
      medium: "text-sm px-4 py-2",
      large: "text-lg px-6 py-3",
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
    { variant: "text", link: false, class: "enabled:hover:underline" },
    { variant: "text", link: true, class: "hover:underline" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "medium",
    link: false,
  },
});
