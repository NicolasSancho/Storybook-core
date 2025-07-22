import { CartIconProps } from "./CartIcon";

// Empty cart - no badge shown
export const mockedCartIconEmpty: CartIconProps = {
  count: 0,
  onClick: () => {},
};

// Single item - shows badge with 1
export const mockedCartIconSingleItem: CartIconProps = {
  count: 1,
  onClick: () => {},
};

// Multiple items - typical shopping scenario
export const mockedCartIconMultipleItems: CartIconProps = {
  count: 5,
  onClick: () => {},
};

// Very high count - edge case with large numbers
export const mockedCartIconVeryHighCount: CartIconProps = {
  count: 99,
  onClick: () => {},
};

// Primary color - shows different icon color
export const mockedCartIconPrimary: CartIconProps = {
  count: 3,
  onClick: () => {},
  color: "primary",
};

// Large size - shows different icon size
export const mockedCartIconLarge: CartIconProps = {
  count: 2,
  onClick: () => {},
  size: "large",
};
