import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Container } from "./Container";
import { mockedContainer, mockedContainerMain } from "./containerMock";

const meta = {
  title: "Layouts/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedContainer,
};

export const AsMain: Story = {
  args: mockedContainerMain,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // `as` changes the element, so the container can be the page's main landmark.
    const main = canvas.getByRole("main");
    await expect(within(main).getByText("Main page content")).toBeInTheDocument();
  },
};

// A wide parent: the container stops growing at its maximum width and sits in the middle. The
// layout is measured, because a synthetic click or a class check cannot prove it.
export const WideParent: Story = {
  args: mockedContainer,
  render: (args) => (
    <div style={{ width: 2000 }}>
      <Container {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const content = within(canvasElement).getByText(/Page content stays inside/);
    const container = content.parentElement as HTMLElement;
    const parent = container.parentElement as HTMLElement;

    const box = container.getBoundingClientRect();
    const space = parent.getBoundingClientRect();

    await expect(box.width).toBeLessThanOrEqual(1152);
    await expect(box.width).toBeLessThan(space.width);
    // Centered: the same space on the left and on the right.
    await expect(Math.abs(box.left - space.left - (space.right - box.right))).toBeLessThan(1);
  },
};
