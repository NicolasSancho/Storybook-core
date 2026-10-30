import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ButtonLink } from "./ButtonLink";
import {
  mockedButtonLinkPrimary,
  mockedButtonLinkSecondary,
  mockedButtonLinkText,
  mockedButtonLinkOutline,
  mockedButtonLinkLarge,
  mockedButtonLinkSmall,
} from "./buttonLinkMock";

const meta = {
  title: "Atoms/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonLink>;

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

export const Primary: Story = {
  args: mockedButtonLinkPrimary,
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shop the collection" });

    await expect(link).toHaveAttribute("href", "/products");
  },
};

export const Secondary: Story = {
  args: mockedButtonLinkSecondary,
};

export const Text: Story = {
  args: mockedButtonLinkText,
};

export const Outline: Story = {
  args: mockedButtonLinkOutline,
};

export const Large: Story = {
  args: mockedButtonLinkLarge,
};

export const Small: Story = {
  args: mockedButtonLinkSmall,
};

export const Keyboard: Story = {
  args: mockedButtonLinkPrimary,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(
      within(canvasElement).getByRole("link", { name: "Shop the collection" })
    ).toHaveFocus();
  },
};

export const CustomLink: Story = {
  args: { ...mockedButtonLinkPrimary, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const received = linkSpy.mock.calls.map(([props]) => props);

    await expect(received).toContainEqual(
      expect.objectContaining({ href: "/products", children: "Shop the collection" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    await expect(
      within(canvasElement).getByRole("link", { name: "Shop the collection" })
    ).toHaveAttribute("href", "/products");
  },
};
