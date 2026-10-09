import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../../Atoms/Icon/Icon";
import { Text } from "../../Atoms/Text/Text";

export interface CartIconProps {
  count?: number;
  onClick?: () => void;
  className?: string;
  color?: "primary" | "secondary" | "black";
  size?: "small" | "medium" | "large";
  /**
   * Accessible name. Defaults to "Shopping cart, N items".
   * Override it for translations or custom wording.
   */
  ariaLabel?: string;
}

const cartIconStyles = tv({
  base: "relative inline-flex items-center",
  variants: {
    interactive: {
      true: "cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    },
  },
  slots: {
    badge: "absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1",
  },
});

export const CartIcon: React.FC<CartIconProps> = ({
  count = 0,
  onClick,
  color = "black",
  size = "medium",
  className,
  ariaLabel,
}) => {
  const styles = cartIconStyles({ interactive: Boolean(onClick) });
  const label = ariaLabel ?? `Shopping cart, ${count} ${count === 1 ? "item" : "items"}`;

  const content = (
    <>
      <Icon name="ShoppingCart" color={color} size={size} />
      {count > 0 && (
        <Text as="span" className={styles.badge()}>
          {count}
        </Text>
      )}
    </>
  );

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={styles.base({ className })}
    >
      {content}
    </button>
  ) : (
    <span role="img" aria-label={label} className={styles.base({ className })}>
      {content}
    </span>
  );
};
