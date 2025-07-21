import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SearchInput } from "./SearchInput";
import {
  mockedSearchInputDefault,
  mockedSearchInputSmall,
  mockedSearchInputLarge,
  mockedSearchInputWithValue,
  mockedSearchInputInvalid,
} from "./searchInputMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `action` to spy on the onChange arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: action("search-changed") },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
