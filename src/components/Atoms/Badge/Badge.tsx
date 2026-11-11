import React from "react";
import { tv } from "../../styles/tv.js";

export interface BadgeProps {
  /** The text. It is always visible, so meaning never depends on color alone. */
  children: React.ReactNode;
  /** `success` for a good state, such as Active. `neutral` for everything else. */
  variant?: "neutral" | "success";
  /**
   * Shows a small dot before the text, in the text color, for a live status such as "Open now". It
   * is hidden from screen readers: the text carries the meaning.
   */
  dot?: boolean;
  /** Additional classes for custom styling */
  className?: string;
}

const badgeStyles = tv({
  slots: {
    base: "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
    dot: "size-1.5 shrink-0 rounded-full bg-current",
  },
  variants: {
    variant: {
      neutral: { base: "border border-neutral-200 bg-neutral-50 text-neutral-700" },
      success: { base: "bg-success-subtle text-success" },
    },
  },
  defaultVariants: { variant: "neutral" },
});

/** A small label for a status. */
export const Badge: React.FC<BadgeProps> = ({ children, variant, dot, className }) => {
  const styles = badgeStyles({ variant });

  return (
    <span className={styles.base({ className })}>
      {dot && <span aria-hidden="true" className={styles.dot()} />}
      {children}
    </span>
  );
};
