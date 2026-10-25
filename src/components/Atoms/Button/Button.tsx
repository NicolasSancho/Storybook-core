import { buttonStyles } from "./buttonStyles.js";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The type of the button
   */
  variant?: "primary" | "secondary" | "text";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Additional classes for custom styling
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant,
  type = "button",
  size = "medium",
  disabled = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className, disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
