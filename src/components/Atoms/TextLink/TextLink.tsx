import React from "react";
import { linkStyles } from "../../styles/linkStyles.js";

export interface TextLinkProps {
  /** Where the link goes, for example `/products/42`. It needs no JavaScript. */
  href: string;
  /** Link contents */
  children: React.ReactNode;
  /**
   * Component used to render the link. Receives `href`, `className` and `children`, so a
   * framework link (e.g. `next/link`) can be passed directly. Defaults to a plain `<a>`. Define it
   * outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  /**
   * Additional classes for custom styling
   */
  className?: string;
}

/**
 * A link in content, such as a sentence or a table cell. It is always underlined, so it reads as a
 * link without hover. For a call to action, use `ButtonLink`.
 */
export const TextLink: React.FC<TextLinkProps> = ({
  href,
  children,
  LinkComponent = "a",
  className,
}) => (
  <LinkComponent href={href} className={linkStyles({ variant: "inline", className })}>
    {children}
  </LinkComponent>
);
