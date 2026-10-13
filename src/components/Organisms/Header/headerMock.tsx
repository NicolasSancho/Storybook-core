import React from "react";
import { HeaderProps } from "./Header";
import { Button } from "../../Atoms/Button/Button";
import { SearchInput } from "../../Atoms/SearchInput/SearchInput";
import { CartIcon } from "../../Molecules/CartIcon/CartIcon";

const Brand: React.FC = () => (
  <a href="/" className="whitespace-nowrap text-xl font-bold text-neutral-900">
    ACME
  </a>
);

// A native search form: it needs no handler, so it also renders from a Server Component.
const Search: React.FC = () => (
  <form
    role="search"
    action="/products"
    onSubmit={(event) => event.preventDefault()}
    className="flex items-center gap-2"
  >
    <SearchInput name="q" aria-label="Search products" variantSize="small" />
    <Button type="submit" size="small">
      Search
    </Button>
  </form>
);

const Cart: React.FC = () => (
  <a href="/cart" className="inline-flex rounded-sm p-1">
    <CartIcon count={2} />
  </a>
);

const mockedNavItems: HeaderProps["navItems"] = [
  { label: "All products", href: "/products" },
  { label: "Ceramics", href: "/products?category=ceramics" },
  { label: "Glassware", href: "/products?category=glassware" },
  { label: "Lighting", href: "/products?category=lighting" },
];

export const mockedHeaderDefault: HeaderProps = {
  brand: <Brand />,
  actions: (
    <>
      <Search />
      <Cart />
    </>
  ),
  navItems: mockedNavItems,
};

// No navigation items, so no navigation landmark is rendered.
export const mockedHeaderNoNav: HeaderProps = {
  brand: <Brand />,
  actions: (
    <>
      <Search />
      <Cart />
    </>
  ),
};

export const mockedHeaderBrandOnly: HeaderProps = {
  brand: <Brand />,
};
