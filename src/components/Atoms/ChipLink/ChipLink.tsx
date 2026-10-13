import React from "react";
import { chipStyles } from "../Chip/chipStyles.js";

export interface ChipLinkProps {
  children: React.ReactNode;
  /** Where the chip goes, for example `/products?category=shirts`. It needs no JavaScript. */
  href: string;
  /** Whether the chip is the current choice. It sets `aria-current="true"` on the link. */
  selected?: boolean;
  /**
   * Component used to render the link. Receives `href`, `className`, `children` and
   * `aria-current`, so a framework link (e.g. `next/link`) can be passed directly. Defaults to a
   * plain `<a>`. Define it outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
    "aria-current"?: "true";
  }>;
  className?: string;
}

/**
 * A pill link for filters that live in the URL, such as a category. Put the chips in a `<nav>` or
 * a list and mark the current one with `selected`. For a toggle or a form control, use `Chip`.
 */
export const ChipLink: React.FC<ChipLinkProps> = ({
  children,
  href,
  selected,
  LinkComponent = "a",
  className,
}) => (
  <LinkComponent
    href={href}
    className={chipStyles({ selected: Boolean(selected), className })}
    aria-current={selected ? "true" : undefined}
  >
    {children}
  </LinkComponent>
);
