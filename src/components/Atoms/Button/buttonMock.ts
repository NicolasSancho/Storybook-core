import { ButtonProps } from "./Button";

export const mockedButtonPrimary: ButtonProps = {
  variant: "primary",
  size: "medium",
  disabled: false,
  children: "Primary Button",
  className: "primary-button",
};

export const mockedButtonSecondary: ButtonProps = {
  variant: "secondary",
  size: "medium",
  disabled: false,
  children: "Secondary Button",
  className: "secondary-button",
};

export const mockedButtonText: ButtonProps = {
  variant: "text",
  size: "medium",
  disabled: false,
  children: "Text Button",
  className: "text-button",
};

export const mockedButtonDisabled: ButtonProps = {
  variant: "primary",
  size: "medium",
  disabled: true,
  children: "Disabled Button",
  className: "disabled-button",
};

export const mockedButtonLarge: ButtonProps = {
  variant: "primary",
  size: "large",
  disabled: false,
  children: "Large Button",
  className: "large-button",
};

export const mockedButtonSmall: ButtonProps = {
  variant: "primary",
  size: "small",
  disabled: false,
  children: "Small Button",
  className: "small-button",
};
