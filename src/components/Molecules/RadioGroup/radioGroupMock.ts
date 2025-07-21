import { RadioGroupProps } from "./RadioGroup";

// Default state - single column layout (default)
export const mockedRadioGroupDefault: RadioGroupProps = {
  name: "default-group",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  value: "option1",
  onChange: () => {},
  columns: 1, // Default single column
  gap: "small", // Default small gap
};

// Two columns layout - shows horizontal arrangement
export const mockedRadioGroupTwoColumns: RadioGroupProps = {
  name: "two-columns-group",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
  ],
  value: "b",
  onChange: () => {},
  columns: 2, // Two column grid
  gap: "medium",
};

// Three columns layout - compact horizontal layout
export const mockedRadioGroupThreeColumns: RadioGroupProps = {
  name: "three-columns-group",
  options: [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
    { label: "XXXL", value: "xxxl" },
  ],
  value: "medium",
  onChange: () => {},
  columns: 3, // Three column grid
  gap: "small",
};

// Large gap spacing - shows different gap sizes
export const mockedRadioGroupLargeGap: RadioGroupProps = {
  name: "large-gap-group",
  options: [
    { label: "First", value: "first" },
    { label: "Second", value: "second" },
    { label: "Third", value: "third" },
  ],
  value: "second",
  onChange: () => {},
  columns: 1,
  gap: "large", // Large gap between items
};

// Four columns with many options - shows grid with more items
export const mockedRadioGroupFourColumns: RadioGroupProps = {
  name: "four-columns-group",
  options: [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Pink", value: "pink" },
    { label: "Black", value: "black" },
  ],
  value: "blue",
  onChange: () => {},
  columns: 4, // Four column grid
  gap: "medium",
};

