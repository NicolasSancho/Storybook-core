import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";
import {
  mockedSpinnerDefault,
  mockedSpinnerSmall,
  mockedSpinnerLarge,
  mockedSpinnerSecondary,
  mockedSpinnerBlack,
} from "./spinnerMock";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

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
