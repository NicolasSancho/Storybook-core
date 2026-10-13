import React from "react";
import { tv } from "tailwind-variants";

export interface ContainerProps {
  children: React.ReactNode;
  /** Element to render. Defaults to a `div`; pass `main`, `section` and so on for a landmark. */
  as?: React.ElementType;
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
}) => <Component className={containerStyles({ className })}>{children}</Component>;
