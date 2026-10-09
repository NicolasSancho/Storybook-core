import React from "react";
import { tv } from "tailwind-variants";

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "gray";
  className?: string;
  /**
   * Text announced by screen readers. Override it for translations or more context
   * (e.g. "Loading products").
   */
  label?: string;
}

const spinnerStyles = tv({
  base: "inline-block motion-safe:animate-spin motion-reduce:animate-[spin_3s_linear_infinite] rounded-full border-4",
  variants: {
    size: {
      small: "w-4 h-4 border-2",
      medium: "w-8 h-8 border-4",
      large: "w-12 h-12 border-4",
    },
    // The transparent top must come after the color, or tailwind-merge drops it
    // and the ring renders as a solid (seemingly static) circle.
    color: {
      primary: "border-primary border-t-transparent",
      secondary: "border-secondary border-t-transparent",
      gray: "border-gray-400 border-t-transparent",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "primary",
  className,
  label = "Loading",
}) => {
  return (
    <span className={spinnerStyles({ size, color, className })} role="status">
      <span className="sr-only">{label}</span>
    </span>
  );
};
