import React from "react";
import { RadioButton } from "../../Atoms/RadioButton/RadioButton";
import { Grid } from "../../Layouts/Grid/Grid";

export interface RadioGroupOption {
  label: string;
  value: string | number;
}

export interface RadioGroupProps {
  name: string;
  options: RadioGroupOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  columns?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: "none" | "small" | "medium" | "large" | "xl";
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  columns = 1,
  gap = "small",
  className,
}) => {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
      ))}
    </Grid>
  );
};
