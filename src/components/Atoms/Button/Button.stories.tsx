import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect, fn, userEvent, within } from "storybook/test";
import { Icon } from "../Icon/Icon";
import { Button } from "./Button";
import {
  mockedButtonPrimary,
  mockedButtonSecondary,
  mockedButtonText,
  mockedButtonOutline,
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

    // Tailwind v4 leaves buttons with the default arrow: an enabled one must show the pointer.
    await expect(getComputedStyle(button).cursor).toBe("pointer");

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

export const Outline: Story = {
  args: mockedButtonOutline,
};

export const Disabled: Story = {
  args: { ...mockedButtonDisabled, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Disabled Button" });

    await expect(button).toBeDisabled();
    await expect(getComputedStyle(button).cursor).toBe("not-allowed");

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

export const WithIcon: Story = {
  args: {
    ...mockedButtonOutline,
    children: (
      <>
        <Icon name="Package" size="small" />
        Add product
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Add product" });
    const icon = button.querySelector("svg");
    const label = [...button.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (!icon || !label) throw new Error("The button needs an icon and a text label");

    // The label starts 8px after the icon (gap-2 at the medium size), instead of touching it.
    const range = document.createRange();
    range.selectNodeContents(label);
    const space = range.getBoundingClientRect().left - icon.getBoundingClientRect().right;
    await expect(Math.round(space)).toBe(8);
  },
};
