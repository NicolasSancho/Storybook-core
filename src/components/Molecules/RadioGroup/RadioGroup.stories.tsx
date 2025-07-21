import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { RadioGroup } from "./RadioGroup";
import {
  mockedRadioGroupDefault,
  mockedRadioGroupTwoColumns,
  mockedRadioGroupThreeColumns,
  mockedRadioGroupLargeGap,
  mockedRadioGroupFourColumns,
} from "./radioGroupMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `action` to spy on the onChange arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: action("radio-group-changed") },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedRadioGroupDefault,
};

export const TwoColumns: Story = {
  args: mockedRadioGroupTwoColumns,
};

export const ThreeColumns: Story = {
  args: mockedRadioGroupThreeColumns,
};

export const LargeGap: Story = {
  args: mockedRadioGroupLargeGap,
};

export const FourColumns: Story = {
  args: mockedRadioGroupFourColumns,
};
