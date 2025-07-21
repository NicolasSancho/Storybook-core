import React from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../Atoms/Button/Button";
import { Text } from "../../Atoms/Text/Text";

export interface ProductCardProps {
  imageUrl: string;
  title: string;
  brand: string;
  price: string;
  tag?: string;
  onClick?: () => void;
  className?: string;
}

const productCardStyles = tv({
  base: "rounded-lg border shadow-sm flex flex-col overflow-hidden",
  slots: {
    imageWrapper: "relative",
    image: "w-full h-48 object-cover",
    tag: "absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded",
    body: "p-2 flex flex-col",
    title: "text-sm font-medium",
    subTitle: "text-sm text-gray-600",
    price: "text-sm text-gray-600",
  },
});

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  brand,
  price,
  tag,
  onClick,
  className,
}) => {
  const styles = productCardStyles();

  return (
    <div className={`${styles.base} ${className}`}>
      <div className={styles.imageWrapper()}>
        <img src={imageUrl} alt={title} className={styles.image()} />
        {tag && <span className={styles.tag()}>{tag}</span>}
      </div>
      <div className={styles.body()}>
        <Text as="h3" size="small" weight="semibold" className={styles.title()}>
          {title}
        </Text>
        <Text as="h3" size="small" color="base" className={styles.subTitle()}>
          {brand}
        </Text>
        <Text as="p" size="small" color="base" className={styles.price()}>
          {price}
        </Text>
        <Button
          variant="primary"
          onClick={onClick}
          className="mt-2"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
