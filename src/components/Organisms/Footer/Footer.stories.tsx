import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Footer } from "./Footer";
import { mockedFooterColumnsOnly, mockedFooterDefault, mockedFooterMinimal } from "./footerMock";

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

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

// No LinkComponent here: the links render as plain anchors, so no setup is needed.
export const Default: Story = {
  args: mockedFooterDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // A page-level <footer> is the contentinfo landmark.
    await expect(canvas.getByRole("contentinfo")).toBeInTheDocument();

    // One navigation landmark holds every column, each under its own heading.
    const nav = canvas.getByRole("navigation", { name: "Footer" });
    await expect(
      within(nav)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual(["Shop", "Help", "About"]);
    await expect(within(nav).getByRole("link", { name: "Ceramics" })).toHaveAttribute(
      "href",
      "/products?category=ceramics"
    );
    await expect(within(nav).getAllByRole("link")).toHaveLength(7);

    await expect(canvas.getByText("© 2026 ACME. All rights reserved.")).toBeInTheDocument();
  },
};

export const CustomNavLabel: Story = {
  args: { ...mockedFooterDefault, navLabel: "Store information" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The label replaces the default name, so two navigations on a page can be told apart.
    await expect(canvas.getByRole("navigation", { name: "Store information" })).toBeInTheDocument();
    await expect(canvas.queryByRole("navigation", { name: "Footer" })).not.toBeInTheDocument();
  },
};

export const Minimal: Story = {
  args: mockedFooterMinimal,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Without columns there is nothing to navigate, so no empty landmark is rendered.
    await expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();
    await expect(canvas.getByText("© 2026 ACME. All rights reserved.")).toBeInTheDocument();
  },
};

export const ColumnsOnly: Story = {
  args: mockedFooterColumnsOnly,
};

export const CustomLink: Story = {
  args: { ...mockedFooterDefault, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const received = linkSpy.mock.calls.map(([props]) => props);

    // Every link goes through the injected component with its href, a class and its label.
    await expect(received).toHaveLength(7);
    await expect(received).toContainEqual(
      expect.objectContaining({ href: "/help/returns", children: "Returns" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    // The result is what the user gets: a real link.
    await expect(canvas.getByRole("link", { name: "Returns" })).toHaveAttribute(
      "href",
      "/help/returns"
    );
  },
};
