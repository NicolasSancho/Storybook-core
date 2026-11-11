import React from "react";
import { linkStyles } from "../../styles/linkStyles.js";
import type { LinkAttributes, LinkComponentType } from "../../types/linkComponent.js";

/**
 * Takes every `<a>` attribute (`aria-*`, `data-*`, `target`, `rel`, `hrefLang`, `ref` and so on) and
 * passes it to the link. `className` is merged with the link classes.
 */
export interface TextLinkProps extends LinkAttributes {
  /** Where the link goes, for example `/products/42`. It needs no JavaScript. */
  href: string;
  /** Link contents */
  children: React.ReactNode;
  /**
   * Component used to render the link, such as `next/link` (with typed routes, through a small wrapper: see the Consumers guide). Defaults to a plain `<a>`. It receives
   * `href`, `className`, `children` and every other attribute passed to this component. Define it
   * outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: LinkComponentType;
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
  ...attributes
}) => (
  <LinkComponent
    {...attributes}
    href={href}
    className={linkStyles({ variant: "inline", className })}
  >
    {children}
  </LinkComponent>
);
