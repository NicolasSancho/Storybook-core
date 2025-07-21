import React from "react";
import { tv } from "tailwind-variants";

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const headerStyles = tv({
  base: "w-full flex items-center justify-between px-4 py-2 bg-white shadow",
});

const slotStyles = tv({
  base: "flex items-center gap-2 flex-row",
  variants: {
    position: {
      left: "flex-1 justify-start",
      center: "flex-1 justify-center",
      right: "flex-1 justify-end",
    },
  },
});

export const Header: React.FC<HeaderProps> & {
  Left: React.FC<HeaderSlotProps>;
  Center: React.FC<HeaderSlotProps>;
  Right: React.FC<HeaderSlotProps>;
} = ({ children, className }) => {
  return (
    <header role="banner" className={`${headerStyles()} ${className}`}>
      {children}
    </header>
  );
};

export interface HeaderSlotProps {
  children: React.ReactNode;
  className?: string;
}

const Left: React.FC<HeaderSlotProps> = ({ children, className }) => (
  <div className={`${slotStyles({ position: "left" })} ${className}`}>{children}</div>
);

const Center: React.FC<HeaderSlotProps> = ({ children, className }) => (
  <div className={`${slotStyles({ position: "center" })} ${className}`}>{children}</div>
);

const Right: React.FC<HeaderSlotProps> = ({ children, className }) => (
  <div className={`${slotStyles({ position: "right" })} ${className}`}>{children}</div>
);

Header.Left = Left;
Header.Center = Center;
Header.Right = Right;
