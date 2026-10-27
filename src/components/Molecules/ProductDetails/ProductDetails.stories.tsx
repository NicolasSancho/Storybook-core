import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const terms = canvas.getAllByRole("term");
    expect(terms).toHaveLength(mockedProductDetailsDefault.details.length);
    mockedProductDetailsDefault.details.forEach(({ label, value }, index) => {
      expect(terms[index]).toHaveTextContent(label);
      expect(terms[index].nextElementSibling).toHaveTextContent(String(value));
    });
  },
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
