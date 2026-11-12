import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { TableSkeleton } from "./TableSkeleton";
import { mockedTableSkeleton } from "./tableSkeletonMock";

const meta = {
  title: "Atoms/TableSkeleton",
  component: TableSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof TableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedTableSkeleton,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent("Loading products");
  },
};
