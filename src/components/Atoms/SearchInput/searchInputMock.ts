import { SearchInputProps } from "./SearchInput";

export const mockedSearchInputDefault: SearchInputProps = {
  value: "",
  onChange: () => {},
  placeholder: "Search products...",
  variantSize: "medium",
};

export const mockedSearchInputSmall: SearchInputProps = {
  value: "",
  onChange: () => {},
  placeholder: "Search...",
  variantSize: "small",
};

export const mockedSearchInputLarge: SearchInputProps = {
  value: "",
  onChange: () => {},
  placeholder: "Search for anything",
  variantSize: "large",
};

export const mockedSearchInputWithValue: SearchInputProps = {
  value: "T-shirt",
  onChange: () => {},
  placeholder: "Search products...",
  variantSize: "medium",
};

export const mockedSearchInputInvalid: SearchInputProps = {
  value: "",
  onChange: () => {},
  placeholder: "Search products...",
  variantSize: "medium",
  isInvalid: true,
};
