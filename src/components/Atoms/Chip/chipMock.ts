import { ChipProps } from "./Chip";

// Default state - an unselected toggle button
export const mockedChipDefault: ChipProps = {
  children: "All",
  selected: false,
};

// Selected state - the active choice
export const mockedChipSelected: ChipProps = {
  children: "All",
  selected: true,
};

// Link - a filter that lives in the URL
export const mockedChipLink: ChipProps = {
  children: "Shirts",
  href: "/products?category=shirts",
  selected: false,
};

// Disabled - a choice that is not available
export const mockedChipDisabled: ChipProps = {
  children: "Sold out",
  disabled: true,
};
