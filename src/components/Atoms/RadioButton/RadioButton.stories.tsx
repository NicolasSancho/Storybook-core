import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect, fn, userEvent, within } from "storybook/test";
import { RadioButton } from "./RadioButton";
import {
  mockedRadioButtonDefault,
  mockedRadioButtonChecked,
  mockedRadioButtonColor,
  mockedRadioButtonLongLabel,
} from "./radioButtonMock";

const meta = {
  title: "Atoms/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: action("radio-changed") },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...mockedRadioButtonDefault, onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const radio = within(canvasElement).getByRole("radio", { name: "Option 1" });

    await expect(radio).not.toBeChecked();

    // The handler receives the option's value, not the change event.
    await userEvent.click(radio);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith("option1");
  },
};

export const Checked: Story = {
  args: mockedRadioButtonChecked,
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("radio", { name: "Selected Option" })
    ).toBeChecked();
  },
};

export const Color: Story = {
  args: mockedRadioButtonColor,
};

export const LongLabel: Story = {
  args: mockedRadioButtonLongLabel,
};
