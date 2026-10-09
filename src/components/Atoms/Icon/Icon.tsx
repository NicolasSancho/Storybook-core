import React from "react";
import { tv } from "tailwind-variants";
import { IconsMap } from "./iconsMap";

export interface IconProps {
  name: keyof typeof IconsMap;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "black";
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
      primary: "text-primary",
      secondary: "text-secondary",
      black: "text-black",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

export const Icon: React.FC<IconProps> = ({ name, size, color = "black", ariaLabel }) => {
  const IconComponent = IconsMap[name];
  const a11yProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": true, focusable: false };

  return <IconComponent className={iconStyles({ size, color })} {...a11yProps} />;
};
