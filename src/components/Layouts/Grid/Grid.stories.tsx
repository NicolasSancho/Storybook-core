import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { mockedGrid, twoColumnGrid, fourColumnGrid } from "./GridMock";

const meta: Meta<typeof Grid> = {
  title: "Layouts/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedGrid,
};

export const TwoColumn: Story = {
  args: twoColumnGrid,
};

export const FourColumn: Story = {
  args: fourColumnGrid,
};
