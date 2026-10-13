import React from "react";
import { tv } from "tailwind-variants";

export interface ChipProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "onClick"
> {
  children: React.ReactNode;
  /**
   * Whether the chip is the active choice. With `href` it sets `aria-current="true"` on the
   * link; without it sets `aria-pressed` on the button, which turns the button into a toggle.
   * Leave it out for a button that is not a toggle, such as a submit button.
   */
  selected?: boolean;
  /**
   * Makes the chip a link, for filters that live in the URL (for example `?category=shirts`).
   * It needs no JavaScript. Without `href` the chip is a `<button>`.
   */
  href?: string;
  /**
   * Component used to render the link when `href` is set. Receives `href`, `onClick`,
   * `className`, `children` and `aria-current`, so a framework link (e.g. `next/link`) can be
   * passed directly. Defaults to a plain `<a>`. Define it outside the render function: an inline
   * definition remounts the link.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    children: React.ReactNode;
    className?: string;
    "aria-current"?: "true";
  }>;
  /** Click handler. Optional: a link or a submit button needs none. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const chipStyles = tv({
  base: "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  variants: {
    selected: {
      true: "border-primary bg-primary text-on-primary hover:bg-primary-darker",
      false: "border-neutral-400 bg-surface text-neutral-900 hover:border-neutral-900",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

/**
 * A pill for choosing a filter or category. A link when `href` is set, a button otherwise.
 * Both work without JavaScript: the link navigates, and a `type="submit"` button with a `name`
 * and `value` submits a native form.
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  selected,
  href,
  LinkComponent = "a",
  onClick,
  className,
  type = "button",
  disabled = false,
  ...props
}) => {
  if (href) {
    return (
      <LinkComponent
        href={href}
        onClick={onClick}
        className={chipStyles({ selected: Boolean(selected), className })}
        aria-current={selected ? "true" : undefined}
      >
        {children}
      </LinkComponent>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={chipStyles({ selected: Boolean(selected), disabled, className })}
      {...props}
    >
      {children}
    </button>
  );
};
