import { InputProps } from "./Input";

export const mockedInputDefault: InputProps = {
  label: "Email",
  name: "email",
  type: "email",
  autoComplete: "email",
  placeholder: "you@example.com",
};

export const mockedInputWithDescription: InputProps = {
  ...mockedInputDefault,
  description: "We never share your email.",
};

export const mockedInputWithError: InputProps = {
  ...mockedInputDefault,
  defaultValue: "not-an-email",
  description: "We never share your email.",
  error: "Enter an email address like name@example.com.",
};

export const mockedInputPassword: InputProps = {
  label: "Password",
  name: "password",
  type: "password",
  autoComplete: "current-password",
};

export const mockedInputHiddenLabel: InputProps = {
  label: "Search products",
  name: "q",
  type: "search",
  hideLabel: true,
  placeholder: "Search by name or SKU",
};

export const mockedInputDisabled: InputProps = {
  ...mockedInputDefault,
  disabled: true,
  defaultValue: "locked@example.com",
};
