import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect, within } from "storybook/test";
import { CartIcon } from "./CartIcon";
import {
  mockedCartIconEmpty,
  mockedCartIconSingleItem,
  mockedCartIconMultipleItems,
  mockedCartIconVeryHighCount,
  mockedCartIconPrimary,
  mockedCartIconLarge,
} from "./cartIconMock";

const meta = {
  title: "Molecules/CartIcon",
  component: CartIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: action("cart-clicked") },
} satisfies Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: mockedCartIconEmpty,
};

export const SingleItem: Story = {
  args: mockedCartIconSingleItem,
};

export const PrimaryColor: Story = {
  args: mockedCartIconPrimary,
};

export const MultipleItems: Story = {
  args: mockedCartIconMultipleItems,
  play: async ({ args, canvasElement }) => {
    // The badge shows the count whenever the cart has items.
    await expect(within(canvasElement).getByText(String(args.count))).toBeInTheDocument();
  },
};

export const VeryHighCount: Story = {
  args: mockedCartIconVeryHighCount,
};

export const Large: Story = {
  args: mockedCartIconLarge,
};
