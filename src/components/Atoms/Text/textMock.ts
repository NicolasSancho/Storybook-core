import { TextProps } from "./Text";

export const mockedText: TextProps = {
  children: "Default Text",
  color: "base",
  size: "medium",
  weight: "normal",
  underline: false,
};

export const boldText: TextProps = {
  children: "Bold Text",
  color: "base",
  size: "medium",
  weight: "bold",
  underline: false,
};

export const underlinedText: TextProps = {
  children: "Underlined Text",
  color: "base",
  size: "medium",
  weight: "normal",
  underline: true,
};

export const headingText: TextProps = {
  children: "Heading Text",
  as: "h2",
  color: "darker",
  size: "heading",
  weight: "bold",
  underline: false,
};

export const displayText: TextProps = {
  children: "Display Text",
  as: "h1",
  color: "darker",
  size: "display",
  weight: "bold",
  underline: false,
};
