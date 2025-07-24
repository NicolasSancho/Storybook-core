import React from "react";
import { Grid } from "../../Layouts/Grid/Grid";
import { ProductCard, ProductCardProps } from "../../Molecules/ProductCard/ProductCard";

export interface ProductGridProps {
  products: ProductCardProps[];
  columns?: 2 | 3 | 4 | 6;
  gap?: "small" | "medium" | "large";
  className?: string;
  getOnProductClick?: (product: ProductCardProps, index: number) => () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 3,
  gap = "medium",
  className,
  getOnProductClick = () => undefined, // optional click handler for each product card
}) => {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={`xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product, idx) => (
        <ProductCard key={idx} {...product} onProductClick={getOnProductClick?.(product, idx)} />
      ))}
    </Grid>
  );
};
