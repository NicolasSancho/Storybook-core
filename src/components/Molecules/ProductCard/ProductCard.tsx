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
  buttonLabel?: string;
  onClick?: () => void;
  onProductClick?: () => void;
  className?: string;
}

const productCardStyles = tv({
  base: "rounded-lg border shadow-sm flex flex-col overflow-hidden",
  slots: {
    imageWrapper: "relative",
    image: "w-full h-48 object-cover",
    tag: "absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded",
    body: "p-2 flex flex-col",
    productInfo: "flex flex-col",
    title: "text-sm font-medium",
    subTitle: "text-sm text-gray-600",
    price: "text-sm text-gray-600",
    clickableArea: "cursor-pointer",
  },
});

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  brand,
  price,
  tag,
  buttonLabel = "Add to Cart",
  onClick,
  onProductClick,
  className,
}) => {
  const styles = productCardStyles();

  const productContent = (
    <>
      <div className={styles.imageWrapper()}>
        <img src={imageUrl} alt={title} className={styles.image()} />
        {tag && <span className={styles.tag()}>{tag}</span>}
      </div>
      <div className={styles.productInfo()}>
        <Text as="h3" size="small" weight="semibold" className={styles.title()}>
          {title}
        </Text>
        <Text as="h3" size="small" color="base" className={styles.subTitle()}>
          {brand}
        </Text>
        <Text as="p" size="small" color="base" className={styles.price()}>
          {price}
        </Text>
      </div>
    </>
  );

  return (
    <div className={`${styles.base} ${className}`}>
      <div className={styles.body()}>
        {onProductClick ? (
          <div className={styles.clickableArea()} onClick={onProductClick}>
            {productContent}
          </div>
        ) : (
          productContent
        )}
        <Button variant="primary" onClick={onClick} className="mt-2">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
