import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { Button } from "./Button";
import {
  mockedButtonPrimary,
  mockedButtonSecondary,
  mockedButtonText,
  mockedButtonDisabled,
  mockedButtonLarge,
  mockedButtonSmall,
} from "./buttonMock";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: action("clicked") },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockedButtonPrimary,
};

export const Secondary: Story = {
  args: mockedButtonSecondary,
};

export const Text: Story = {
  args: mockedButtonText,
};

export const Disabled: Story = {
  args: mockedButtonDisabled,
};

export const Large: Story = {
  args: mockedButtonLarge,
};

export const Small: Story = {
  args: mockedButtonSmall,
};
