import React from "react";
import { tv } from "tailwind-variants";

export interface TextProps {
  as?: React.ElementType;
  /**
   * Text color. Every option reaches the 4.5:1 text contrast on white.
   */
  color?: "base" | "dark" | "darker" | "primary" | "secondary";
  /**
   * Text size: 14px, 16px and 20px for body copy, 32px for headings and a fluid 40 to 64px for
   * hero text. Each size sets its own line-height, and `display` also tightens the tracking.
   */
  size?: "small" | "medium" | "large" | "heading" | "display";
  weight?: "normal" | "medium" | "semibold" | "bold";
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
      heading: "text-2xl",
      display: "text-4xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
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
