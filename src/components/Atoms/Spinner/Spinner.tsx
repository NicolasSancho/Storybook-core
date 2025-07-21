import React from "react";
import { tv } from "tailwind-variants";

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "gray";
  className?: string;
}

const spinnerStyles = tv({
  base: "inline-block animate-spin rounded-full border-4 border-t-transparent",
  variants: {
    size: {
      small: "w-4 h-4 border-2",
      medium: "w-8 h-8 border-4",
      large: "w-12 h-12 border-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const colorMap: Record<string, string> = {
  primary: "border-primary",
  secondary: "border-secondary",
  gray: "border-gray-400",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "primary",
  className,
}) => {
  return (
    <span
      className={`${spinnerStyles({ size })} ${colorMap[color]} ${className}`}
      role="status"
      aria-label="loading"
    />
  );
};
