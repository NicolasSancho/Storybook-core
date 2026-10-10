import React from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../Atoms/Button/Button";
import { Text } from "../../Atoms/Text/Text";

export interface ProductCardProps {
  /** Optional unique id, used as the React key when rendered in a list (falls back to `title`). */
  id?: string;
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
  base: "relative rounded-lg border border-neutral-200 shadow-sm flex flex-col overflow-hidden",
  slots: {
    imageWrapper: "relative",
    image: "w-full aspect-[3/4] object-cover",
    tag: "absolute top-2 left-2 bg-neutral-950 text-white text-xs px-2 py-1 rounded",
    body: "p-2 flex flex-col",
    productInfo: "flex flex-col",
    title: "text-sm font-medium",
    titleButton:
      "text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary focus-visible:after:rounded-lg",
    subTitle: "text-sm text-neutral-600",
    price: "text-sm text-neutral-600",
    action: "relative z-10 mt-2",
  },
});

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  brand,
  price,
  tag,
  buttonLabel = "Add to Cart",
  onClick = undefined,
  onProductClick,
  className,
}) => {
  const styles = productCardStyles();

  return (
    <div className={styles.base({ className })}>
      <div className={styles.body()}>
        <div className={styles.imageWrapper()}>
          <img src={imageUrl} alt="" className={styles.image()} />
          {tag && <span className={styles.tag()}>{tag}</span>}
        </div>
        <div className={styles.productInfo()}>
          <Text as="h3" size="small" weight="semibold" className={styles.title()}>
            {onProductClick ? (
              <button type="button" onClick={onProductClick} className={styles.titleButton()}>
                {title}
              </button>
            ) : (
              title
            )}
          </Text>
          <Text as="p" size="small" color="base" className={styles.subTitle()}>
            {brand}
          </Text>
          <Text as="p" size="small" color="base" className={styles.price()}>
            {price}
          </Text>
        </div>
        {onClick && (
          <Button variant="primary" onClick={onClick} className={styles.action()}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
