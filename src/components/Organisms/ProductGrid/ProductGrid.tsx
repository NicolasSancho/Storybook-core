import React from "react";
import { tv } from "tailwind-variants";
import { Grid } from "../../Layouts/Grid/Grid";
import { ProductCard, ProductCardProps } from "../../Molecules/ProductCard/ProductCard";

export interface ProductGridProps {
  products: ProductCardProps[];
  columns?: 2 | 3 | 4 | 6;
  gap?: "small" | "medium" | "large";
  className?: string;
  /**
   * Link component used by every card that has an `href`. A product can override it with
   * its own `LinkComponent`. See `ProductCard`.
   */
  LinkComponent?: ProductCardProps["LinkComponent"];
  /**
   * Image component used by every card. A product can override it with its own
   * `ImageComponent`. See `ProductCard`.
   */
  ImageComponent?: ProductCardProps["ImageComponent"];
}

const productGridStyles = tv({
  base: "xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
});

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 3,
  gap = "medium",
  className,
  LinkComponent,
  ImageComponent,
}) => {
  return (
    <Grid columns={columns} gap={gap} className={productGridStyles({ className })}>
      {products.map((product) => (
        <ProductCard
          key={product.id ?? product.title}
          LinkComponent={LinkComponent}
          ImageComponent={ImageComponent}
          {...product}
        />
      ))}
    </Grid>
  );
};
