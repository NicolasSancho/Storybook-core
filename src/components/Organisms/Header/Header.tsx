import React from "react";
import { tv } from "tailwind-variants";

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderSlotProps {
  children: React.ReactNode;
  className?: string;
  position: "left" | "center" | "right";
}

const headerStyles = tv({
  base: "w-full flex items-center justify-between px-4 h-16 bg-white shadow",
});

const slotStyles = tv({
  base: "flex items-center gap-2 flex-row h-full",
  variants: {
    position: {
      left: "flex-1 justify-start",
      center: "flex-1 justify-center",
      right: "flex-1 justify-end",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

const Slot: React.FC<HeaderSlotProps> = ({ children, className, position }) => (
  <div className={`${slotStyles({ position })} ${className ?? ""}`}>
    {children}
  </div>
);

export const Header: React.FC<HeaderProps> & {
  Left: React.FC<Omit<HeaderSlotProps, "position">>;
  Center: React.FC<Omit<HeaderSlotProps, "position">>;
  Right: React.FC<Omit<HeaderSlotProps, "position">>;
} = ({ children, className }) => {
  return <header className={`${headerStyles()} ${className ?? ""}`}>{children}</header>;
};

Header.Left = ({ children, className }) => (
  <Slot position="left" className={className}>
    {children}
  </Slot>
);

Header.Center = ({ children, className }) => (
  <Slot position="center" className={className}>
    {children}
  </Slot>
);

Header.Right = ({ children, className }) => (
  <Slot position="right" className={className}>
    {children}
  </Slot>
);
