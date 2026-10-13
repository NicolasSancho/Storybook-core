import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Header } from "./Header";
import { mockedHeaderBrandOnly, mockedHeaderDefault, mockedHeaderNoNav } from "./headerMock";

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

// Spy standing in for a framework link (e.g. next/link): records the props it receives.
const linkSpy = fn(
  ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
);

// No LinkComponent here: the navigation renders plain anchors, so no setup is needed.
export const Default: Story = {
  args: mockedHeaderDefault,
  play: async ({ canvasElement }) => {
    // The page-level <header> is the banner landmark, and everything renders inside it.
    const banner = within(canvasElement).getByRole("banner");

    await expect(within(banner).getByRole("link", { name: "ACME" })).toHaveAttribute("href", "/");
    await expect(within(banner).getByRole("searchbox", { name: "Search products" })).toBeVisible();
    await expect(
      within(banner).getByRole("link", { name: "Shopping cart, 2 items" })
    ).toHaveAttribute("href", "/cart");

    // One labelled navigation holds the links, in order.
    const nav = within(banner).getByRole("navigation", { name: "Main" });
    await expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual([
      "/products",
      "/products?category=ceramics",
      "/products?category=glassware",
      "/products?category=lighting",
    ]);
  },
};

export const CustomNavLabel: Story = {
  args: { ...mockedHeaderDefault, navLabel: "Store sections" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The label replaces the default name, so two navigations on a page can be told apart.
    await expect(canvas.getByRole("navigation", { name: "Store sections" })).toBeInTheDocument();
    await expect(canvas.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
  },
};

export const NoNavigation: Story = {
  args: mockedHeaderNoNav,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Without items there is nothing to navigate, so no empty landmark is rendered.
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();
    await expect(canvas.getByRole("searchbox", { name: "Search products" })).toBeVisible();
  },
};

export const BrandOnly: Story = {
  args: mockedHeaderBrandOnly,
  play: async ({ canvasElement }) => {
    const banner = within(canvasElement).getByRole("banner");

    await expect(within(banner).getAllByRole("link")).toHaveLength(1);
    await expect(within(banner).queryByRole("searchbox")).not.toBeInTheDocument();
  },
};

export const CustomLink: Story = {
  args: { ...mockedHeaderDefault, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Main" });
    const received = linkSpy.mock.calls.map(([props]) => props);

    // Every navigation item goes through the injected component with its href, a class and label.
    await expect(received).toHaveLength(4);
    await expect(received).toContainEqual(
      expect.objectContaining({ href: "/products?category=lighting", children: "Lighting" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    // The result is what the user gets: a real link.
    await expect(within(nav).getByRole("link", { name: "Lighting" })).toHaveAttribute(
      "href",
      "/products?category=lighting"
    );
  },
};

// On a wide screen the bar stays full-width while its content sits in the container, so it lines
// up with page content. The layout is measured: a class check cannot prove it.
export const WideScreen: Story = {
  args: mockedHeaderDefault,
  render: (args) => (
    <div style={{ width: 2000 }}>
      <Header {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bar = canvas.getByRole("banner").getBoundingClientRect();
    const brand = canvas.getByRole("link", { name: "ACME" }).getBoundingClientRect();
    const cart = canvas.getByRole("link", { name: /Shopping cart/ }).getBoundingClientRect();

    // Full-bleed bar, inset content: at least the space left by a 1152px container.
    await expect(bar.width).toBe(2000);
    await expect(brand.left - bar.left).toBeGreaterThanOrEqual((2000 - 1152) / 2);
    await expect(bar.right - cart.right).toBeGreaterThanOrEqual((2000 - 1152) / 2);
  },
};
