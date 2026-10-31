import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Icon } from "../../Atoms/Icon/Icon";
import { Text } from "../../Atoms/Text/Text";
import { Popover } from "../Popover/Popover";
import { SidebarNav } from "./SidebarNav";
import { mockedSidebarNavDefault, mockedSidebarNavNoCurrent } from "./sidebarNavMock";

const meta = {
  title: "Molecules/SidebarNav",
  component: SidebarNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spy standing in for a framework link (e.g. next/link): records the props it receives.
const linkSpy = fn(
  ({
    href,
    children,
    className,
    "aria-current": ariaCurrent,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
    "aria-current"?: "page";
  }) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  )
);

const Tenant = (
  <div className="flex items-center gap-2 px-3">
    <span
      aria-hidden="true"
      className="flex size-8 items-center justify-center rounded-sm bg-primary text-sm font-bold text-on-primary"
    >
      N
    </span>
    <Text color="darker" weight="semibold">
      Northwind Footwear
    </Text>
  </div>
);

export const Default: Story = {
  args: mockedSidebarNavDefault,
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Main" });
    const links = within(nav).getAllByRole("link");

    await expect(links.map((link) => link.textContent)).toEqual(["Products", "Settings", "Help"]);
    await expect(within(nav).getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(within(nav).getByRole("link", { name: "Settings" })).not.toHaveAttribute(
      "aria-current"
    );

    // Only "Products" has an icon, yet every label starts at the same place.
    const labelLeft = (name: string) =>
      Math.round(within(nav).getByText(name).getBoundingClientRect().left);
    await expect(labelLeft("Settings")).toBe(labelLeft("Products"));
    await expect(labelLeft("Help")).toBe(labelLeft("Products"));
  },
};

export const WithHeader: Story = {
  args: { ...mockedSidebarNavDefault, header: Tenant },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("Northwind Footwear")).toBeVisible();
  },
};

export const NoCurrentPage: Story = {
  args: mockedSidebarNavNoCurrent,
};

export const Keyboard: Story = {
  args: mockedSidebarNavDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Products" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Settings" })).toHaveFocus();
  },
};

export const CustomLink: Story = {
  args: { ...mockedSidebarNavDefault, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const received = linkSpy.mock.calls.map(([props]) => props);

    await expect(received).toContainEqual(
      expect.objectContaining({ href: "/products", "aria-current": "page" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    await expect(within(canvasElement).getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/settings"
    );
  },
};

export const InDrawer: Story = {
  args: mockedSidebarNavDefault,
  decorators: [
    (Story) => (
      <div className="flex min-h-72 w-screen items-start justify-start p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    // A drawer is placed against the viewport, so the docs page shows it in its own small frame.
    docs: { story: { inline: false, iframeHeight: 360 } },
  },
  render: (args) => (
    <Popover
      placement="drawer"
      variant="outline"
      size="small"
      triggerLabel="Open menu"
      trigger={<Icon name="Menu" size="small" />}
    >
      <div className="p-4">
        <SidebarNav {...args} header={Tenant} />
      </div>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open menu" });

    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
    await expect(canvas.getByRole("navigation", { name: "Main" })).toBeVisible();

    // Choosing a link closes the drawer.
    await userEvent.click(canvas.getByRole("link", { name: "Settings" }));
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};
