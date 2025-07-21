import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { mockedIcon, smallSecondaryIcon, largePrimaryIcon, largeBlackIcon } from "./iconMock";
import { IconsMap } from "./iconsMap";

const iconNames = Object.keys(IconsMap) as (keyof typeof IconsMap)[];

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: {
        type: "select",
        options: iconNames,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedIcon,
};

export const SmallSecondary: Story = {
  args: smallSecondaryIcon,
};

export const LargePrimary: Story = {
  args: largePrimaryIcon,
};
export const LargeBlack: Story = {
  args: largeBlackIcon,
};
