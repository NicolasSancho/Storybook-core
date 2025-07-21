import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CartIcon } from "./CartIcon";
import {
  mockedCartIconEmpty,
  mockedCartIconSingleItem,
  mockedCartIconMultipleItems,
  mockedCartIconVeryHighCount,
  mockedCartIconPrimary,
} from "./cartIconMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/CartIcon",
  component: CartIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `action` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: action("cart-clicked") },
} satisfies Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
};

export const VeryHighCount: Story = {
  args: mockedCartIconVeryHighCount,
};
