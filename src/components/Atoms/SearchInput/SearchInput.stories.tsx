import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
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
  args: mockedSearchInputDefault,
};

export const Small: Story = {
  args: mockedSearchInputSmall,
};

export const Large: Story = {
  args: mockedSearchInputLarge,
};

export const WithValue: Story = {
  args: mockedSearchInputWithValue,
};
export const Invalid: Story = {
  args: mockedSearchInputInvalid,
};
