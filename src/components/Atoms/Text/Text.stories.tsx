import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import { mockedText, boldText, underlinedText } from "./textMock";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedText,
};

export const Bold: Story = {
  args: boldText,
};

export const Underlined: Story = {
  args: underlinedText,
};
