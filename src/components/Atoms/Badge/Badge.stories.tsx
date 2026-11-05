import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { mockedBadgeNeutral, mockedBadgeSuccess } from "./badgeMock";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: mockedBadgeNeutral,
};

export const Success: Story = {
  args: mockedBadgeSuccess,
};
