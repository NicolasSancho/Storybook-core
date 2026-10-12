import type { Meta, StoryObj } from "@storybook/react-vite";
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
