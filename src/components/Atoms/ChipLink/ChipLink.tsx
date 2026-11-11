import React from "react";
import { chipStyles } from "../Chip/chipStyles.js";
import type { LinkAttributes, LinkComponentType } from "../../types/linkComponent.js";

/**
 * Takes every `<a>` attribute (`data-*`, `lang`, `hrefLang`, `ref` and so on) and passes it to the
 * link, except `aria-current`, which `selected` sets. `className` is merged with the chip classes.
 */
export interface ChipLinkProps extends Omit<LinkAttributes, "aria-current"> {
  children: React.ReactNode;
  /** Where the chip goes, for example `/products?category=shirts`. It needs no JavaScript. */
  href: string;
  /** Whether the chip is the current choice. It sets `aria-current="true"` on the link. */
  selected?: boolean;
  /**
   * Component used to render the link, such as `next/link` (with typed routes, through a small wrapper: see the Consumers guide). Defaults to a plain `<a>`. It receives
   * `href`, `className`, `children`, `aria-current` and every other attribute passed to this
   * component. Define it outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: LinkComponentType;
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
  ...attributes
}) => (
  <LinkComponent
    {...attributes}
    href={href}
    className={chipStyles({ selected: Boolean(selected), className })}
    aria-current={selected ? "true" : undefined}
  >
    {children}
  </LinkComponent>
);
