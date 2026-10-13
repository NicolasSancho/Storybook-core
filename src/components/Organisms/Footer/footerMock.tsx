import React from "react";
import { FooterProps } from "./Footer";

const mockedColumns: FooterProps["columns"] = [
  {
    title: "Shop",
    links: [
      { label: "Ceramics", href: "/products?category=ceramics" },
      { label: "Glassware", href: "/products?category=glassware" },
      { label: "Lighting", href: "/products?category=lighting" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our materials", href: "/about/materials" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];

const mockedBrand = (
  <>
    <p className="text-xl font-bold text-neutral-900">ACME</p>
    <p className="mt-2 text-sm text-neutral-600">Quiet objects for rooms you live in.</p>
  </>
);

export const mockedFooterDefault: FooterProps = {
  brand: mockedBrand,
  columns: mockedColumns,
  legal: "© 2026 ACME. All rights reserved.",
};

// Only the legal line: no brand and no columns, so no navigation landmark is rendered.
export const mockedFooterMinimal: FooterProps = {
  legal: "© 2026 ACME. All rights reserved.",
};

// Columns without a brand block.
export const mockedFooterColumnsOnly: FooterProps = {
  columns: mockedColumns,
};
