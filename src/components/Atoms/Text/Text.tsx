import React from "react";
import { tv } from "tailwind-variants";

export interface TextProps {
  as?: React.ElementType;
  /**
   * Text color. Every option reaches the 4.5:1 text contrast on white.
   */
  color?: "base" | "dark" | "darker" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  weight?: "normal" | "bold" | "semibold";
  underline?: boolean;
  children: React.ReactNode;
  className?: string;
}

const textStyles = tv({
  base: "font-sans",
  variants: {
    color: {
      base: "text-neutral-500",
      dark: "text-neutral-700",
      darker: "text-neutral-900",
      primary: "text-primary",
      secondary: "text-secondary",
    },
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
    weight: {
      normal: "font-normal",
      bold: "font-bold",
      semibold: "font-semibold",
    },
    underline: {
      true: "underline",
      false: "",
    },
  },
  defaultVariants: {
    color: "dark",
    size: "medium",
    weight: "normal",
    underline: false,
  },
});

export const Text: React.FC<TextProps> = ({
  as: Component = "div",
  color = "dark",
  size = "medium",
  weight = "normal",
  underline = false,
  children,
  className = "",
}) => {
  return (
    <Component className={textStyles({ color, size, weight, underline, className })}>
      {children}
    </Component>
  );
};
