import React, { useId } from "react";
import { RadioButton } from "../../Atoms/RadioButton/RadioButton";
import { Text } from "../../Atoms/Text/Text";
import { Grid } from "../../Layouts/Grid/Grid";

export interface RadioGroupOption {
  label: string;
  value: string | number;
}

export interface RadioGroupProps {
  /**
   * Visible label for the group, rendered as the fieldset legend.
   * Strongly recommended: without it screen readers can't tell what the options are for.
   */
  label?: string;
  /**
   * Name shared by the radio inputs. Defaults to a unique generated name, so several
   * groups on the same page never interfere. Pass one only when the form submission
   * needs a specific field name, and keep it unique within the page.
   */
  name?: string;
  options: RadioGroupOption[];
  /**
   * Selected option. Setting it makes the group controlled: pair it with `onChange`. Leave it
   * out for an uncontrolled group (see `defaultValue`). Pick one mode and keep it: React warns
   * when a group switches between them.
   */
  value?: string | number;
  /**
   * Initially selected option of an uncontrolled group, which a native `<form>` can submit
   * without any handler (the Server Action receives the option's `value` as a string).
   * Ignored when `value` is set.
   */
  defaultValue?: string | number;
  /** Called with the selected option's value. Optional, so the group renders on the server. */
  onChange?: (value: string | number) => void;
  columns?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: "none" | "small" | "medium" | "large" | "xl";
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  columns = 1,
  gap = "small",
  className,
}) => {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <fieldset>
      {label && (
        <legend className="mb-2 font-medium">
          <Text as="span" size="small">
            {label}
          </Text>
        </legend>
      )}
      <Grid columns={columns} gap={gap} className={className}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={groupName}
            label={option.label}
            value={option.value}
            checked={value === undefined ? undefined : value === option.value}
            defaultChecked={value === undefined ? defaultValue === option.value : undefined}
            onChange={onChange}
          />
        ))}
      </Grid>
    </fieldset>
  );
};
