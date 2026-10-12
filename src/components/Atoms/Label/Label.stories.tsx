import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";
import { mockedLabel, primaryLabel, secondaryLabel } from "./labelMock";
const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // `color` comes from `Pick<TextProps, "color">`, which docgen cannot resolve: it records a type
  // without a name, and the `color` name matcher then warns. Declaring the enum fixes both.
  argTypes: {
    color: {
      type: { name: "enum", value: ["base", "dark", "darker", "primary", "secondary"] },
      control: "select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedLabel,
};

export const Primary: Story = {
  args: primaryLabel,
};

export const Secondary: Story = {
  args: secondaryLabel,
};
