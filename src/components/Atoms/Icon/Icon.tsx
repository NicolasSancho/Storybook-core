import React from "react";
import { tv } from "../../styles/tv.js";
import { IconsMap } from "./iconsMap.js";

export interface IconProps {
  name: keyof typeof IconsMap;
  size?: "small" | "medium" | "large";
  /**
   * Icon color. `current` (the default) takes the text color of the element around it, so an icon
   * inside a button or a link matches its label in every variant, theme and brand. The other values
   * set a token color.
   */
  color?: "current" | "primary" | "secondary" | "danger" | "black";
  /**
   * Accessible name for icons that convey meaning on their own.
   * Without it the icon is treated as decorative and hidden from screen readers.
   */
  ariaLabel?: string;
}

const iconStyles = tv({
  base: "icon",
  variants: {
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    },
    color: {
      current: "text-current",
      primary: "text-primary",
      secondary: "text-secondary",
      danger: "text-danger",
      black: "text-neutral-950",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "current",
  },
});

/**
 * Internal: draws the icons the library's own components use (Alert, Breadcrumbs, Popover and
 * others). It is not exported from the package; apps use their own icon library.
 */
export const Icon: React.FC<IconProps> = ({ name, size, color = "current", ariaLabel }) => {
  const IconComponent = IconsMap[name];
  const a11yProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": true, focusable: false };

  return <IconComponent className={iconStyles({ size, color })} {...a11yProps} />;
};
