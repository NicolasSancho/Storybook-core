import React from "react";
import { Header } from "./Header";
import { Image } from "../../Atoms/Image/Image";

// Standalone mock components
// Self-contained placeholder mark (inline SVG), so the mock needs no image file.
const logoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="#00548a"/>
    <path d="M9 22l7-13 7 13h-4l-3-6-3 6H9Z" fill="#ffffff"/>
  </svg>`
)}`;

const Logo: React.FC = () => <Image src={logoSrc} alt="Acme logo" className="h-8 w-auto" />;

const Brand: React.FC = () => (
  <span className="whitespace-nowrap text-xl font-bold text-neutral-900">ACME</span>
);

const CartButton: React.FC = () => (
  <button className="flex items-center gap-2 whitespace-nowrap px-2 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900">
    Cart (0)
  </button>
);

const UserButton: React.FC = () => (
  <button className="whitespace-nowrap px-2 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900">
    Sign In
  </button>
);

export const mockedHeaderDefault: React.JSX.Element = (
  <Header>
    <Header.Left>
      <Logo />
    </Header.Left>
    <Header.Center>
      <Brand />
    </Header.Center>
    <Header.Right>
      <UserButton />
      <CartButton />
    </Header.Right>
  </Header>
);

export const mockedHeaderSimple: React.JSX.Element = (
  <Header>
    <Header.Left>
      <Logo />
      <Brand />
    </Header.Left>
    <Header.Right>
      <UserButton />
    </Header.Right>
  </Header>
);

export const mockedHeaderLogoOnly: React.JSX.Element = (
  <Header>
    <Header.Center>
      <Logo />
      <Brand />
    </Header.Center>
  </Header>
);
