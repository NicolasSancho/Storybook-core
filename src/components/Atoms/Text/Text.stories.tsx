import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Text } from "./Text";
import { mockedText, boldText, underlinedText, headingText, displayText } from "./textMock";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedText,
};

export const Bold: Story = {
  args: boldText,
};

export const Underlined: Story = {
  args: underlinedText,
};

export const Heading: Story = {
  args: { ...headingText, id: "heading-text", ref: fn() },
  play: async ({ args, canvasElement }) => {
    const heading = within(canvasElement).getByRole("heading", { name: "Heading Text" });

    // Attributes and the ref reach the element, so a heading can name a section.
    await expect(heading).toHaveAttribute("id", "heading-text");
    await expect(args.ref).toHaveBeenCalledWith(heading);
  },
};

export const Display: Story = {
  args: displayText,
};
