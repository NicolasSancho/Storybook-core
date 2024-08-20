import React from 'react';
import { tv } from 'tailwind-variants'

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Tailwind Variants object for the button component
 */
const button = tv({
  base: 'font-bold rounded text-cream focus:outline-none transition-all',
  variants: {
    primary: {
      true: 'bg-dark-coffee',
      false: 'bg-cream text-espresso',
    },
    size: {
      small: 'text-xs px-2 py-1',
      medium: 'text-sm px-4 py-2',
      large: 'text-lg px-6 py-3',
    },
  },
  
  defaultVariants: {
    primary: false,
    size: 'medium',
  },
});


/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={button({ primary, size })}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
