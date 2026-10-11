import { BreadcrumbsProps } from "./Breadcrumbs";

const mockedItems: BreadcrumbsProps["items"] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Clothing", href: "/products/clothing" },
];

export const mockedBreadcrumbsDefault: BreadcrumbsProps = {
  items: mockedItems,
};

export const mockedBreadcrumbsLong: BreadcrumbsProps = {
  items: [
    ...mockedItems,
    { label: "Men's Wear", href: "/products/clothing/mens" },
    { label: "T-Shirts", href: "/products/clothing/mens/t-shirts" },
    { label: "Basic T-Shirt", href: "/products/clothing/mens/t-shirts/basic" },
  ],
};

export const mockedBreadcrumbsShort: BreadcrumbsProps = {
  items: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
};

export const mockedBreadcrumbsSingle: BreadcrumbsProps = {
  items: [{ label: "Home", href: "/" }],
};
