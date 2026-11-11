import React from "react";
import { tv } from "../../styles/tv.js";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /**
   * Element to render. Defaults to a `div`; pass `main`, `section` and so on for a landmark. Pass
   * an HTML element name: only global HTML attributes (`id`, `aria-*`, `data-*` and so on) are
   * typed, and they are passed to the element. A `section` is only a landmark when it has an
   * accessible name, so pass `aria-labelledby` (or `aria-label`) with it.
   */
  as?: React.ElementType;
  /** A ref to the rendered element. */
  ref?: React.Ref<HTMLElement>;
  className?: string;
}

const containerStyles = tv({
  base: "mx-auto w-full max-w-6xl px-4 sm:px-6",
});

/**
 * Keeps page content at one width, centered, with matching side padding. `Header` and `Footer`
 * use it for their content, so page content wrapped in a `Container` lines up with both. Their
 * background, shadow and borders stay full-width.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = "div",
  className,
  ...props
}) => (
  <Component {...props} className={containerStyles({ className })}>
    {children}
  </Component>
);
