import React from "react";
import { chipStyles } from "./chipStyles";

export interface ChipProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className"
> {
  children: React.ReactNode;
  /**
   * Whether the chip is the active choice. It sets `aria-pressed`, which makes the chip a toggle
   * button. Leave it out for a button that is not a toggle, such as a submit button.
   */
  selected?: boolean;
  className?: string;
}

/**
 * A pill button for choosing a filter or an option. It works without JavaScript inside a native
 * form: a `type="submit"` chip with a `name` and `value` submits that value. For a filter that
 * lives in the URL, use `ChipLink`.
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  selected,
  className,
  type = "button",
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    aria-pressed={selected}
    className={chipStyles({ selected: Boolean(selected), disabled, className })}
    {...props}
  >
    {children}
  </button>
);
