import React from "react";
import { tv } from "tailwind-variants";
import { Text } from "../../Atoms/Text/Text";

export interface RadioButtonProps {
  label: string;
  value: string | number;
  /**
   * Makes the radio controlled. Leave it out for an uncontrolled radio (see `defaultChecked`),
   * which a native form can submit without any handler.
   */
  checked?: boolean;
  /** Initial state of an uncontrolled radio. Ignored when `checked` is set. */
  defaultChecked?: boolean;
  /** Called with the radio's `value` when it is selected. Optional, so it renders on the server. */
  onChange?: (value: string | number) => void;
  name: string;
  className?: string;
}

const radioButtonStyles = tv({
  base: "flex items-center gap-2 cursor-pointer",
  slots: {
    input: "text-primary",
  },
});

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  defaultChecked,
  onChange,
  name,
  className,
}) => {
  const styles = radioButtonStyles();

  return (
    <label className={styles.base({ className })}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={onChange && (() => onChange(value))}
        className={styles.input()}
      />
      <Text as="span" size="small" color="dark">
        {label}
      </Text>
    </label>
  );
};
