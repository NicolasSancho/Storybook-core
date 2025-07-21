import { RadioButtonProps } from "./RadioButton";

export const mockedRadioButtonDefault: RadioButtonProps = {
  label: "Option 1",
  value: "option1",
  checked: false,
  onChange: () => {},
  name: "example-group",
};

export const mockedRadioButtonChecked: RadioButtonProps = {
  label: "Selected Option",
  value: "selected",
  checked: true,
  onChange: () => {},
  name: "example-group",
};

export const mockedRadioButtonColor: RadioButtonProps = {
  label: "Blue",
  value: "blue",
  checked: true,
  onChange: () => {},
  name: "color-group",
};

export const mockedRadioButtonLongLabel: RadioButtonProps = {
  label: "This is a longer radio button label to test text wrapping",
  value: "long-text",
  checked: false,
  onChange: () => {},
  name: "example-group",
};

