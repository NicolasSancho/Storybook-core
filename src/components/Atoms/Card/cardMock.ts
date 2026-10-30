import { CardProps } from "./Card";

export const mockedCardDefault: CardProps = {
  children: "Card content",
  className: "p-6",
};

export const mockedCardSection: CardProps = {
  ...mockedCardDefault,
  as: "section",
  "aria-label": "Account details",
  children: "Section content",
};
