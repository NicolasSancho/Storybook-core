import React from "react";
import { Grid } from "../../Layouts/Grid/Grid";
import { ProductCard, ProductCardProps } from "../../Molecules/ProductCard/ProductCard";

export interface ProductGridProps {
  products: ProductCardProps[];
  columns?: 2 | 3 | 4 | 6;
  gap?: "small" | "medium" | "large";
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 3,
  gap = "medium",
  className,
}) => {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {products.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </Grid>
  );
};
