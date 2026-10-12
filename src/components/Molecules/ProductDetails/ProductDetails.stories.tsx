import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductDetails } from "./ProductDetails";
import {
  mockedProductDetailsDefault,
  mockedProductDetailsDetailed,
  mockedProductDetailsMinimal,
  mockedProductDetailsWithNumbers,
  mockedProductDetailsLongValues,
} from "./productDetailsMock";

const meta = {
  title: "Molecules/ProductDetails",
  component: ProductDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

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
