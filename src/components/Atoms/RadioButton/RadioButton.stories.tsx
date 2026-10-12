import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
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
  args: mockedRadioButtonDefault,
};

export const Checked: Story = {
  args: mockedRadioButtonChecked,
};

export const Color: Story = {
  args: mockedRadioButtonColor,
};

export const LongLabel: Story = {
  args: mockedRadioButtonLongLabel,
};
