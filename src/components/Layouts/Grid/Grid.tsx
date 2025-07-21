import React from "react";
import { tv } from "tailwind-variants";

export interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: "none" | "small" | "medium" | "large" | "xl";
  className?: string;
  // Define other props here
}

const gridStyles = tv({
  base: "grid w-full",
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      8: "grid-cols-8",
      12: "grid-cols-12",
    } as const,
    gap: {
      none: "gap-0",
      small: "gap-2",
      medium: "gap-4",
      large: "gap-6",
      xl: "gap-8",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "medium",
  },
});

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = "medium",
  className,
  ...props
}) => {
  return (
    <div className={`${gridStyles({ columns, gap })} ${className}`} {...props}>
      {children}
    </div>
  );
};
