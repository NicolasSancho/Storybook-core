import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
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

// Spies are passed here because the mock's handlers are no-ops.
export const Clickable: Story = {
  args: { ...mockedProductCardClickable, onClick: fn(), onProductClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The title is the accessible name of the stretched button that opens the product.
    await userEvent.click(canvas.getByRole("button", { name: "Basic T-Shirt" }));
    await expect(args.onProductClick).toHaveBeenCalledTimes(1);
    await expect(args.onClick).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Add to Cart" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(args.onProductClick).toHaveBeenCalledTimes(1);
  },
};

export const NoButton: Story = {
  args: mockedProductCardNoButton,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Without handlers the title is plain heading text and no button is rendered.
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Display Only Product" })
    ).toBeInTheDocument();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
  },
};
