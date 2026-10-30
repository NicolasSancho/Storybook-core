import React from "react";
import { tv } from "tailwind-variants";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The element to render. A `section` is only a landmark when it has an accessible name, so
   * pass `aria-labelledby` (or `aria-label`) with it.
   */
  as?: "div" | "section" | "article";
  /** Card contents */
  children: React.ReactNode;
  /** Additional classes for custom styling, for example padding */
  className?: string;
}

const cardStyles = tv({
  base: "rounded-lg border border-neutral-200 bg-surface shadow-xs",
});

/**
 * A bordered surface that groups related content, such as a sign-in form or a table. It has no
 * padding of its own, so the content decides the spacing.
 */
export const Card: React.FC<CardProps> = ({
  as: Component = "div",
  children,
  className,
  ...props
}) => (
  <Component {...props} className={cardStyles({ className })}>
    {children}
  </Component>
);
