import React from "react";
import { tv } from "tailwind-variants";
import { Text } from "../../Atoms/Text/Text";

export interface RadioButtonProps {
  label: string;
  value: string | number;
  checked: boolean;
  onChange: (value: string | number) => void;
  name: string;
  className?: string;
}

const radioButtonStyles = tv({
  base: "flex items-center gap-2 cursor-pointer",
  slots: {
    input: "form-radio text-primary",
  },
});

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  name,
  className,
}) => {
  const styles = radioButtonStyles();

  return (
    <label className={`${styles.base()} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.input()}
      />
      <Text as="span" size="small" color="dark">
        {label}
      </Text>
    </label>
  );
};
