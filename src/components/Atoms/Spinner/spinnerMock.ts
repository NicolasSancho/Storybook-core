import { SpinnerProps } from "./Spinner";

// Default spinner - medium size with primary color
export const mockedSpinnerDefault: SpinnerProps = {
  size: "medium",
  color: "primary",
};

// Small spinner - for inline loading states
export const mockedSpinnerSmall: SpinnerProps = {
  size: "small",
  color: "primary",
};

// Large spinner - for full page loading states
export const mockedSpinnerLarge: SpinnerProps = {
  size: "large",
  color: "primary",
};

// Secondary color - alternative brand color
export const mockedSpinnerSecondary: SpinnerProps = {
  size: "medium",
  color: "secondary",
};

// Black color - neutral loading indicator
export const mockedSpinnerBlack: SpinnerProps = {
  size: "medium",
  color: "gray",
};
