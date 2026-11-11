import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "./Badge";
import { mockedBadgeNeutral, mockedBadgeStatus, mockedBadgeSuccess } from "./badgeMock";

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

export const WithDot: Story = {
  args: mockedBadgeStatus,
  play: async ({ canvasElement }) => {
    const badge = within(canvasElement).getByText("Open now");

    // The dot is drawn but hidden from screen readers, so the badge reads as its text only.
    await expect(badge.querySelector('[aria-hidden="true"]')).not.toBeNull();
  },
};

export const Closed: Story = {
  args: { ...mockedBadgeStatus, variant: "neutral", children: "Closed" },
};
