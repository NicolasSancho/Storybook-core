import { ChipLinkProps } from "./ChipLink";

// Default state - a link to a filtered page
export const mockedChipLinkDefault: ChipLinkProps = {
  children: "Shirts",
  href: "/products?category=shirts",
};

// Selected state - the current filter
export const mockedChipLinkSelected: ChipLinkProps = {
  ...mockedChipLinkDefault,
  selected: true,
};
