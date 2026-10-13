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

// Disabled - a choice that is not available
export const mockedChipDisabled: ChipProps = {
  children: "Sold out",
  disabled: true,
};

// A submit chip with a name and value: a native form control, no handler needed
export const mockedChipSubmit: ChipProps = {
  children: "Shirts",
  type: "submit",
  name: "category",
  value: "shirts",
};
