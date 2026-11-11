import type { ComponentPropsWithRef, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import type { LinkComponentProps, LinkComponentType } from "../../types/linkComponent";
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

// Spy that renders every prop it receives, so forwarded attributes reach the rendered link.
const forwardingSpy = fn(({ children, ...props }: LinkComponentProps) => (
  <a {...props}>{children}</a>
));

export const Attributes: Story = {
  args: {
    ...mockedButtonLinkPrimary,
    LinkComponent: forwardingSpy,
    rel: "external",
    hrefLang: "pt",
    lang: "pt",
    ref: fn(),
  },
  // `data-*` attributes are valid JSX but not part of the props type, so they go in the render.
  render: (args) => <ButtonLink {...args} data-analytics="cta" />,
  beforeEach: () => {
    forwardingSpy.mockClear();
  },
  play: async ({ args, canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shop the collection" });

    // The link component receives every attribute, and they reach the rendered link with the ref.
    await expect(forwardingSpy.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({
        href: "/products",
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

// Type checks, run by `tsc`: a link component that takes the `<a>` attributes is accepted (next/link
// has this shape, with a wider `href`), and an element that is not a link is rejected.
const NextLinkShaped = ({
  href,
  ...props
}: Omit<ComponentPropsWithRef<"a">, "href"> & { href: string | { pathname: string } }) => (
  <a href={typeof href === "string" ? href : href.pathname} {...props} />
);
void (["a", NextLinkShaped] satisfies LinkComponentType[]);
// @ts-expect-error a button is not a link
void ("button" satisfies LinkComponentType);
