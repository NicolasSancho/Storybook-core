import { ButtonLinkProps } from "./ButtonLink";

export const mockedButtonLinkPrimary: ButtonLinkProps = {
  variant: "primary",
  size: "medium",
  href: "/products",
  children: "Shop the collection",
  className: "primary-button-link",
};

export const mockedButtonLinkSecondary: ButtonLinkProps = {
  ...mockedButtonLinkPrimary,
  variant: "secondary",
  className: "secondary-button-link",
};

export const mockedButtonLinkText: ButtonLinkProps = {
  ...mockedButtonLinkPrimary,
  variant: "text",
  className: "button-link-text",
};

export const mockedButtonLinkLarge: ButtonLinkProps = {
  ...mockedButtonLinkPrimary,
  size: "large",
  className: "large-button-link",
};

export const mockedButtonLinkSmall: ButtonLinkProps = {
  ...mockedButtonLinkPrimary,
  size: "small",
  className: "small-button-link",
};
