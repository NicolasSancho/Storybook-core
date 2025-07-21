import React from "react";
import { Text, TextProps } from "../Text/Text";
import { tv } from "tailwind-variants";

export interface LabelProps extends Pick<TextProps, "color"> {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const labelStyles = tv({
  base: "block font-medium",
  // Define other styles here
});

/**
 * Label component that reuses the Text component for styling.
 */
export const Label: React.FC<LabelProps> = ({ htmlFor, children, className, color = "base" }) => {
  return (
    <label htmlFor={htmlFor} className={`${labelStyles()} ${className}`}>
      <Text as="span" color={color} size="small">
        {children}
      </Text>
    </label>
  );
};
