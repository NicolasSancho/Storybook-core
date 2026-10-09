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
  value: string | number;
  onChange: (value: string | number) => void;
  columns?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: "none" | "small" | "medium" | "large" | "xl";
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
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
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </Grid>
    </fieldset>
  );
};
