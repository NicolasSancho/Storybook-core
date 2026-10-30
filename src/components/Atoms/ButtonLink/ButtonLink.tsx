import React from "react";
import { buttonStyles } from "../Button/buttonStyles.js";

export interface ButtonLinkProps {
  /** Where the link goes, for example `/products`. It needs no JavaScript. */
  href: string;
  /** Link contents */
  children: React.ReactNode;
  /**
   * The type of the button. `outline` is a neutral bordered button for secondary actions: it does
   * not follow the brand colors, so it looks the same under any theme.
   */
  variant?: "primary" | "secondary" | "text" | "outline";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
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
}) => (
  <LinkComponent href={href} className={buttonStyles({ variant, size, link: true, className })}>
    {children}
  </LinkComponent>
);
