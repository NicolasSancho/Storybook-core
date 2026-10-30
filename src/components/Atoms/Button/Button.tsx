import { buttonStyles } from "./buttonStyles.js";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The type of the button. `outline` is a neutral bordered button for secondary actions: it does
   * not follow the brand colors, so it looks the same under any theme.
   */
  variant?: "primary" | "secondary" | "text" | "outline";
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
