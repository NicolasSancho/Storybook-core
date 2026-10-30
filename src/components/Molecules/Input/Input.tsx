import React, { useId } from "react";
import { tv } from "tailwind-variants";
import { Label } from "../../Atoms/Label/Label.js";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * The field's name. It is always rendered as a real `<label>`, so every input has an accessible
   * name and clicking the text focuses the field.
   */
  label: string;
  /**
   * Hides the label visually (`sr-only`) and keeps it for screen readers. Use it when the
   * surrounding UI already names the field, for example a search box next to a heading.
   */
  hideLabel?: boolean;
  /** Help text under the field. Linked with `aria-describedby`. */
  description?: string;
  /**
   * Error message under the field. Setting it marks the field `aria-invalid` and links the
   * message with `aria-describedby`. Moving focus to the field is the page's job, for example
   * after a failed submit.
   */
  error?: string;
  /** The kind of field. `search` makes it a search box. */
  type?: "text" | "email" | "password" | "search" | "url" | "tel";
  /**
   * Current text. Setting it makes the input controlled: pair it with `onChange`. Leave it out
   * for an uncontrolled input (set the initial text with `defaultValue`), which a native `<form>`
   * can submit without any handler, for example a Server Action form rendered on the server.
   */
  value?: string;
  /** Called on every change. Optional, so the input renders from a Server Component. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional classes for the `<input>` element */
  className?: string;
}

const inputStyles = tv({
  slots: {
    root: "flex flex-col gap-1",
    field:
      "w-full rounded-sm border bg-surface px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    description: "text-sm text-neutral-500",
    error: "text-sm text-danger",
  },
  variants: {
    invalid: {
      true: { field: "border-danger focus:border-danger focus:ring-danger" },
      false: { field: "border-neutral-400 focus:border-primary focus:ring-primary" },
    },
  },
  defaultVariants: { invalid: false },
});

/**
 * A text field with its label, optional help text and optional error message. It needs no
 * JavaScript of its own: the label, description and error are wired with native attributes, and
 * an uncontrolled input is submitted by a native `<form>`.
 */
export const Input: React.FC<InputProps> = ({
  label,
  hideLabel = false,
  description,
  error,
  type = "text",
  id,
  className,
  "aria-describedby": describedBy,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const ids = [describedBy, description && descriptionId, error && errorId].filter(Boolean);
  const styles = inputStyles({ invalid: Boolean(error) });

  return (
    <div className={styles.root()}>
      <Label htmlFor={inputId} color="darker" className={hideLabel ? "sr-only" : undefined}>
        {label}
      </Label>
      <input
        {...props}
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.length > 0 ? ids.join(" ") : undefined}
        className={styles.field({ className })}
      />
      {description && (
        <p id={descriptionId} className={styles.description()}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error()}>
          {error}
        </p>
      )}
    </div>
  );
};
