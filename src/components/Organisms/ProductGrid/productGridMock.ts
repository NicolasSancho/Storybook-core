import { ProductGridProps } from "./ProductGrid";
import { mockedProductDefault } from "../../Molecules/ProductCard/productCardMock";

const mockedProductList = [
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
  mockedProductDefault,
];

export const mockedProductGridDefault: ProductGridProps = {
  products: mockedProductList,
  columns: 3,
  gap: "medium",
  getOnProductClick: () => {
    console.log("Product clicked");
    return () => {};
  },
};

export const mockedProductGridFourColumns: ProductGridProps = {
  products: mockedProductList,
  columns: 4,
  gap: "small",
  getOnProductClick: () => {
    console.log("Product clicked");
    return () => {};
  },
};

export const mockedProductGridLargeGap: ProductGridProps = {
  products: mockedProductList,
  columns: 2,
  gap: "large",
  getOnProductClick: () => {
    console.log("Product clicked");
    return () => {};
  },
};
