import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import type { LinkComponentProps } from "../../types/linkComponent";
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

// Spy that renders every prop it receives, so forwarded attributes reach the rendered link.
const forwardingSpy = fn(({ children, ...props }: LinkComponentProps) => (
  <a {...props}>{children}</a>
));

export const Attributes: Story = {
  args: {
    ...mockedTextLink,
    LinkComponent: forwardingSpy,
    rel: "external",
    hrefLang: "pt",
    lang: "pt",
    ref: fn(),
  },
  // `data-*` attributes are valid JSX but not part of the props type, so they go in the render.
  render: (args) => <TextLink {...args} data-analytics="cta" />,
  beforeEach: () => {
    forwardingSpy.mockClear();
  },
  play: async ({ args, canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Trail Runner 2" });

    // The link component receives every attribute, and they reach the rendered link with the ref.
    await expect(forwardingSpy.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({
        href: "/products/trail-runner-2",
        rel: "external",
        hrefLang: "pt",
        lang: "pt",
        "data-analytics": "cta",
      })
    );
    await expect(link).toHaveAttribute("rel", "external");
    await expect(link).toHaveAttribute("hreflang", "pt");
    await expect(link).toHaveAttribute("lang", "pt");
    await expect(link).toHaveAttribute("data-analytics", "cta");
    await expect(args.ref).toHaveBeenCalledWith(link);
  },
};
