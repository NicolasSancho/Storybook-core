import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { TextLink } from "./TextLink";
import { mockedTextLink } from "./textLinkMock";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spy standing in for a framework link (e.g. next/link): records the props it receives.
const linkSpy = fn(
  ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
);

export const Default: Story = {
  args: mockedTextLink,
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("link", { name: "Trail Runner 2" })
    ).toHaveAttribute("href", "/products/trail-runner-2");
  },
};

export const CustomLink: Story = {
  args: { ...mockedTextLink, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const received = linkSpy.mock.calls.map(([props]) => props);

    await expect(received).toContainEqual(
      expect.objectContaining({ href: "/products/trail-runner-2", children: "Trail Runner 2" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    await expect(
      within(canvasElement).getByRole("link", { name: "Trail Runner 2" })
    ).toHaveAttribute("href", "/products/trail-runner-2");
  },
};
