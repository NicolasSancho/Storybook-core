import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect, fn, userEvent, within } from "storybook/test";
import { SearchInput } from "./SearchInput";
import {
  mockedSearchInputDefault,
  mockedSearchInputSmall,
  mockedSearchInputLarge,
  mockedSearchInputWithValue,
  mockedSearchInputInvalid,
} from "./searchInputMock";

const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: action("search-changed") },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...mockedSearchInputDefault, onChange: fn() },
  play: async ({ args, canvasElement }) => {
    // No label was given, so the input falls back to a generic accessible name.
    const input = within(canvasElement).getByRole("searchbox", { name: "Search" });

    await expect(input).not.toHaveAttribute("aria-invalid");

    // `value` is fixed by the args, so the input stays empty: count the change events instead.
    await userEvent.type(input, "shirt");
    await expect(args.onChange).toHaveBeenCalledTimes(5);
  },
};

export const CustomLabel: Story = {
  args: { ...mockedSearchInputDefault, "aria-label": "Find a product" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The consumer's aria-label reaches the input and replaces the "Search" fallback.
    await expect(canvas.getByRole("searchbox", { name: "Find a product" })).toBeInTheDocument();
    await expect(canvas.queryByRole("searchbox", { name: "Search" })).not.toBeInTheDocument();
  },
};

export const Small: Story = {
  args: mockedSearchInputSmall,
};

export const Large: Story = {
  args: mockedSearchInputLarge,
};

export const WithValue: Story = {
  args: mockedSearchInputWithValue,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("searchbox")).toHaveValue("T-shirt");
  },
};

export const Invalid: Story = {
  args: mockedSearchInputInvalid,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("searchbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  },
};
