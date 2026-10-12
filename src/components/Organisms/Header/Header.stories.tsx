import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Header } from "./Header";
import { mockedHeaderDefault, mockedHeaderSimple, mockedHeaderLogoOnly } from "./headerMock";

const meta = {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: mockedHeaderDefault.props.children,
  },
  play: async ({ canvasElement }) => {
    // The page-level <header> is the banner landmark, and the slotted controls render inside it.
    const banner = within(canvasElement).getByRole("banner");

    await expect(within(banner).getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    await expect(within(banner).getByRole("button", { name: "Cart (0)" })).toBeInTheDocument();
  },
};

export const Simple: Story = {
  args: {
    children: mockedHeaderSimple.props.children,
  },
};

export const LogoOnly: Story = {
  args: {
    children: mockedHeaderLogoOnly.props.children,
  },
};
