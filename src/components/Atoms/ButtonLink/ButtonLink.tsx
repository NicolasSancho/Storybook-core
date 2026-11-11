import React from "react";
import { buttonStyles } from "../Button/buttonStyles.js";
import type { LinkAttributes, LinkComponentType } from "../../types/linkComponent.js";

/**
 * Takes every `<a>` attribute (`aria-*`, `data-*`, `target`, `rel`, `hrefLang`, `ref` and so on) and
 * passes it to the link. `className` is merged with the button classes.
 */
export interface ButtonLinkProps extends LinkAttributes {
  /** Where the link goes, for example `/products`. It needs no JavaScript. */
  href: string;
  /** Link contents */
  children: React.ReactNode;
  /**
   * The type of the button. `outline` is the default for a second action: it does not follow the
   * brand colors, so it looks the same under any theme. `secondary` is a filled button with as much
   * emphasis as `primary`, neutral unless the app sets its own color.
   */
  variant?: "primary" | "secondary" | "text" | "outline";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
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
 * A link that looks like a `Button`, for a call to action that goes to another page, such as
 * "Shop the collection". For an action that runs code or submits a form, use `Button`.
 */
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  variant,
  size = "medium",
  LinkComponent = "a",
  className,
  ...attributes
}) => (
  <LinkComponent
    {...attributes}
    href={href}
    className={buttonStyles({ variant, size, link: true, className })}
  >
    {children}
  </LinkComponent>
);
