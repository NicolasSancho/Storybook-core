import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect, fn, userEvent, within } from "storybook/test";
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
  args: { ...mockedButtonPrimary, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Primary Button" });

    // Buttons default to type="button", so one inside a form never submits it by accident.
    await expect(button).toHaveAttribute("type", "button");

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: mockedButtonSecondary,
};

export const Text: Story = {
  args: mockedButtonText,
};

export const Disabled: Story = {
  args: { ...mockedButtonDisabled, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Disabled Button" });

    await expect(button).toBeDisabled();

    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Large: Story = {
  args: mockedButtonLarge,
};

export const Small: Story = {
  args: mockedButtonSmall,
};
