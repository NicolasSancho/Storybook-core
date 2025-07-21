import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../../Atoms/Icon/Icon";
import { Text } from "../../Atoms/Text/Text";

export interface CartIconProps {
  count?: number;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary" | "black";
}

const cartIconStyles = tv({
  base: "relative inline-flex items-center cursor-pointer",
  slots: {
    badge: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1",
  },
});

export const CartIcon: React.FC<CartIconProps> = ({
  count = 0,
  onClick,
  color = "black",
  className,
}) => {
  const styles = cartIconStyles();

  return (
    <div className={`${styles.base()} ${className}`} onClick={onClick}>
      <Icon name="ShoppingCart" color={color} size="medium" />
      {count > 0 && (
        <Text as="span" className={styles.badge()}>
          {count}
        </Text>
      )}
    </div>
  );
};
