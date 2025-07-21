import React from "react";
import { tv } from "tailwind-variants";

export interface TextProps {
  as?: React.ElementType;
  color?: "lighter" | "light" | "base" | "dark" | "darker" | "primary" | "secondary";
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
      lighter: "text-gray-100",
      light: "text-gray-300",
      base: "text-gray-500",
      dark: "text-gray-700",
      darker: "text-gray-900",
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
    <Component className={`${textStyles({ color, size, weight, underline })} ${className}`}>
      {children}
    </Component>
  );
};
