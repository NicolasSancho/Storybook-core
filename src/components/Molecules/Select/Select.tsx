import React, { useId } from "react";
import { tv } from "../../styles/tv.js";
import { Label } from "../../Atoms/Label/Label.js";
import { fieldStyles } from "../Input/fieldStyles.js";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "multiple" | "size"
> {
  /** The field's name, always rendered as a real `<label>`. */
  label: string;
  /** Hides the label visually (`sr-only`) and keeps it for screen readers. */
  hideLabel?: boolean;
  /** The choices, in display order. */
  options: SelectOption[];
  /** Name submitted with a native `<form>`. */
  name?: string;
  /**
   * Current value. Setting it makes the select controlled: pair it with `onChange`. Leave it out
   * for an uncontrolled select (set the initial choice with `defaultValue`), which a native
   * `<form>` can submit without any handler.
   */
  value?: string;
  /** Initial choice of an uncontrolled select. */
  defaultValue?: string;
  /** Called when the choice changes. Optional, so the select renders from a Server Component. */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Additional classes for the `<select>` element */
  className?: string;
}

const selectStyles = tv({ base: "flex flex-col gap-1" });

/** A native `<select>` with its label, styled like `Input`. It needs no JavaScript of its own. */
export const Select: React.FC<SelectProps> = ({
  label,
  hideLabel = false,
  options,
  id,
  className,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={selectStyles()}>
      <Label htmlFor={selectId} color="darker" className={hideLabel ? "sr-only" : undefined}>
        {label}
      </Label>
      <select {...props} id={selectId} className={fieldStyles({ className })}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
