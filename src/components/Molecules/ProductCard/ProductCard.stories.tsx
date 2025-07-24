import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import {
  mockedProductDefault,
  mockedProductWithTag,
  mockedProductOnSale,
  mockedProductCardClickable,
  mockedProductCardNoButton,
} from "./productCardMock";

const meta = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedProductDefault,
};

export const WithTag: Story = {
  args: mockedProductWithTag,
};

export const OnSale: Story = {
  args: mockedProductOnSale,
};

export const Clickable: Story = {
  args: mockedProductCardClickable,
};

export const NoButton: Story = {
  args: mockedProductCardNoButton,
};
