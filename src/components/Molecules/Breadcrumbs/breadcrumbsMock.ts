import React from "react";
import { BreadcrumbsProps } from "./Breadcrumbs";

// Mock LinkComponent for Storybook stories
const MockLinkComponent = ({to, children}: {to: string;children: React.ReactNode;}) =>
  React.createElement(
    'a',
    {
      href: to,
      className: 'text-primary hover:text-primary-600',
    },
    children
  );

const mockedItems: BreadcrumbsProps['items'] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Clothing", href: "/products/clothing" },
];

export const mockedBreadcrumbsDefault: BreadcrumbsProps = {
  items: mockedItems,
  LinkComponent: MockLinkComponent,
};

export const mockedBreadcrumbsLong: BreadcrumbsProps = {
  items: [
    ...mockedItems,
    { label: "Men's Wear", href: "/products/clothing/mens" },
    { label: "T-Shirts", href: "/products/clothing/mens/t-shirts" },
    { label: "Basic T-Shirt", href: "/products/clothing/mens/t-shirts/basic" },
  ],
  LinkComponent: MockLinkComponent,
};

export const mockedBreadcrumbsShort: BreadcrumbsProps = {
  items: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ],
  LinkComponent: MockLinkComponent,
};

export const mockedBreadcrumbsSingle: BreadcrumbsProps = {
  items: [
    { label: "Home", href: "/" },
  ],
  LinkComponent: MockLinkComponent,
};

