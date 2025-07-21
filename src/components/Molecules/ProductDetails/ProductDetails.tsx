import React from "react";
import { tv } from "tailwind-variants";
import { Text } from "../../Atoms/Text/Text";

export interface ProductDetailItem {
  label: string;
  value: string | number;
}

export interface ProductDetailsProps {
  details: ProductDetailItem[];
  className?: string;
}

const detailsStyles = tv({
  base: "flex flex-col gap-1",
  slots: {
    item: "flex justify-between text-sm text-gray-700 gap-2",
    label: "font-medium",
    value: "",
  },
});

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  details,
  className,
}) => {
  const styles = detailsStyles();

  return (
    <ul className={`${styles.base()} ${className}`}>
      {details.map((item, idx) => (
        <li key={idx} className={styles.item()}>
          <Text as="span" weight="semibold" className={styles.label()}>
            {item.label}
          </Text>
          <Text as="span">{item.value}</Text>
        </li>
      ))}
    </ul>
  );
};
