import { tv } from "tailwind-variants";
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

const buttonStyles = tv({
  base: "font-bold text-white inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  variants: {
    variant: {
      primary: "rounded bg-primary text-white enabled:hover:bg-primary-darker",
      secondary:
        "rounded bg-secondary text-white enabled:hover:bg-secondary-darker focus-visible:ring-secondary",
      text: "rounded text-primary enabled:hover:underline",
    },
    size: {
      small: "text-xs px-2 py-1",
      medium: "text-sm px-4 py-2",
      large: "text-lg px-6 py-3",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

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
