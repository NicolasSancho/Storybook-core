import { ProductGridProps } from "./ProductGrid";
import { mockedProductDefault } from "../../Molecules/ProductCard/productCardMock";

// Each product needs a unique id: ProductGrid uses it as the React key.
const mockedProductList = Array.from({ length: 8 }, (_, index) => ({
  ...mockedProductDefault,
  id: `product-${index + 1}`,
}));

export const mockedProductGridDefault: ProductGridProps = {
  products: mockedProductList,
  columns: 3,
  gap: "medium",
  getOnProductClick: () => () => {},
};

export const mockedProductGridFourColumns: ProductGridProps = {
  products: mockedProductList,
  columns: 4,
  gap: "small",
  getOnProductClick: () => () => {},
};

export const mockedProductGridLargeGap: ProductGridProps = {
  products: mockedProductList,
  columns: 2,
  gap: "large",
  getOnProductClick: () => () => {},
};
