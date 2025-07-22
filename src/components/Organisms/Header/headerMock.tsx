import React from "react";
import { Header } from "./Header";
import { Image } from "../../Atoms/Image/Image";

// Standalone mock components
const Logo: React.FC = () => (
  <Image src="/src/components/assets/logo.png" alt="Logo" className="h-8 w-auto" />
);

const Brand: React.FC = () => <span className="text-xl font-bold text-gray-900">ZARA</span>;

const CartButton: React.FC = () => (
  <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
    Cart (0)
  </button>
);

const UserButton: React.FC = () => (
  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
    Sign In
  </button>
);

export const mockedHeaderDefault: JSX.Element = (
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

export const mockedHeaderSimple: JSX.Element = (
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

export const mockedHeaderLogoOnly: JSX.Element = (
  <Header>
    <Header.Center>
      <Logo />
      <Brand />
    </Header.Center>
  </Header>
);
