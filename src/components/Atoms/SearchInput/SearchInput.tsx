import React from "react";
import { tv } from "tailwind-variants";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  isInvalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  /**
   * Custom visual size of the input.
   */
  variantSize?: "small" | "medium" | "large";
}

const searchInputStyles = tv({
  base: "w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors",
  variants: {
    variantSize: {
      small: "text-xs py-1 px-2",
      medium: "text-sm py-2 px-3",
      large: "text-base py-3 px-4",
    },
    isInvalid: {
      true: "border border-red-500 focus:border-red-500 focus:ring-red-500",
      false: "border border-gray-300 focus:border-primary",
    },
  },
  defaultVariants: {
    variantSize: "medium",
    isInvalid: false,
  },
});

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search…",
  value,
  isInvalid = false,
  onChange,
  className,
  variantSize = "medium",
  ...props
}) => {
  return (
    <input
      type="text"
      id="search-input"
      name="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${searchInputStyles({ variantSize, isInvalid })} ${className}`}
      {...props}
    />
  );
};
