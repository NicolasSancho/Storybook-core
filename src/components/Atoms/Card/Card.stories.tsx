import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Card } from "./Card";
import { mockedCardDefault, mockedCardSection } from "./cardMock";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedCardDefault,
};

export const AsSection: Story = {
  args: mockedCardSection,
  play: async ({ canvasElement }) => {
    // A named section is exposed as a landmark.
    await expect(
      within(canvasElement).getByRole("region", { name: "Account details" })
    ).toBeInTheDocument();
  },
};
