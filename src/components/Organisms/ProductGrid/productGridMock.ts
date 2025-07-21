import { ProductGridProps } from "./ProductGrid";
import {
  mockedProductDefault,
  mockedProductWithTag,
  mockedProductOnSale,
} from "../../Molecules/ProductCard/productCardMock";

const mockedProductList = [
  mockedProductDefault,
  mockedProductWithTag,
  mockedProductOnSale,
  mockedProductDefault,
  mockedProductOnSale,
  mockedProductWithTag,
];

export const mockedProductGridDefault: ProductGridProps = {
  products: mockedProductList,
  columns: 3,
  gap: "medium",
};

export const mockedProductGridFourColumns: ProductGridProps = {
  products: mockedProductList,
  columns: 4,
  gap: "small",
};

export const mockedProductGridLargeGap: ProductGridProps = {
  products: mockedProductList,
  columns: 2,
  gap: "large",
};
