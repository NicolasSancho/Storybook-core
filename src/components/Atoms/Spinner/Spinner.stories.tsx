import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import {
  mockedSpinnerDefault,
  mockedSpinnerSmall,
  mockedSpinnerLarge,
  mockedSpinnerSecondary,
  mockedSpinnerBlack,
} from "./spinnerMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedSpinnerDefault,
};

export const Small: Story = {
  args: mockedSpinnerSmall,
};

export const Large: Story = {
  args: mockedSpinnerLarge,
};

export const Secondary: Story = {
  args: mockedSpinnerSecondary,
};

export const Black: Story = {
  args: mockedSpinnerBlack,
};
