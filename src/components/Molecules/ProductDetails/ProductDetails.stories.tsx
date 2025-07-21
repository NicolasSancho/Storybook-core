import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetails } from "./ProductDetails";
import {
  mockedProductDetailsDefault,
  mockedProductDetailsDetailed,
  mockedProductDetailsMinimal,
  mockedProductDetailsWithNumbers,
  mockedProductDetailsLongValues,
} from "./productDetailsMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/ProductDetails",
  component: ProductDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof ProductDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedProductDetailsDefault,
};

export const Detailed: Story = {
  args: mockedProductDetailsDetailed,
};

export const Minimal: Story = {
  args: mockedProductDetailsMinimal,
};

export const WithNumbers: Story = {
  args: mockedProductDetailsWithNumbers,
};

export const LongValues: Story = {
  args: mockedProductDetailsLongValues,
};
