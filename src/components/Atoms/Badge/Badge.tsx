import React from "react";
import { tv } from "tailwind-variants";

export interface BadgeProps {
  /** The text. It is always visible, so meaning never depends on color alone. */
  children: React.ReactNode;
  /** `success` for a good state, such as Active. `neutral` for everything else. */
  variant?: "neutral" | "success";
  /** Additional classes for custom styling */
  className?: string;
}

const badgeStyles = tv({
  base: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
  variants: {
    variant: {
      neutral: "border border-neutral-200 bg-neutral-50 text-neutral-700",
      success: "bg-success-subtle text-success",
    },
  },
  defaultVariants: { variant: "neutral" },
});

/** A small label for a status. */
export const Badge: React.FC<BadgeProps> = ({ children, variant, className }) => (
  <span className={badgeStyles({ variant, className })}>{children}</span>
);
