import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Icon } from "../../Atoms/Icon/Icon";
import { Text } from "../../Atoms/Text/Text";
import { Popover } from "../Popover/Popover";
import { SidebarNav, type SidebarNavProps } from "./SidebarNav";
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

// The navigation in a responsive app layout: a side column from the `md` breakpoint (940px) up, and
// a drawer opened from the top bar below it. The layout is the app's; only the parts are library
// components. `w-screen` lets it fill the frame inside the narrow wrapper of this file's stories.
const AppLayout = (args: SidebarNavProps) => (
  <div className="min-h-dvh w-screen md:grid md:grid-cols-[15rem_1fr]">
    <div className="hidden border-r border-neutral-200 px-2 py-4 md:block">
      <SidebarNav {...args} header={Tenant} />
    </div>
    <div className="flex min-w-0 flex-col">
      <header className="flex h-14 items-center border-b border-neutral-200 px-4">
        <div className="md:hidden">
          <Popover
            placement="drawer"
            trigger={
              <>
                <Icon name="Menu" size="small" />
                Menu
              </>
            }
          >
            <div className="px-2 pb-4">
              <SidebarNav {...args} header={Tenant} />
            </div>
          </Popover>
        </div>
      </header>
      <main className="p-4">
        <Text color="darker" weight="semibold">
          Page content
        </Text>
      </main>
    </div>
  </div>
);

const appLayoutParameters = {
  layout: "fullscreen",
  docs: { story: { inline: false, iframeHeight: 420 } },
};

export const InAppLayout: Story = {
  args: mockedSidebarNavDefault,
  parameters: {
    ...appLayoutParameters,
    docs: {
      ...appLayoutParameters.docs,
      description: {
        story:
          "`SidebarNav` has no layout of its own, so the app places it: here in a side column from " +
          "the `md` breakpoint (940px) up, and in a `Popover` drawer below it. The narrow layout is the " +
          "**In App Layout Narrow** story, which opens at a phone width (it is not on this page, " +
          "because a docs frame is as wide as the page). " +
          "The same navigation is rendered in both places, and only one is displayed at a time, so " +
          "assistive technology finds a single navigation. Rendering it once would need a JavaScript " +
          "screen-width check, which makes the layout jump on first load, or a panel that is both a " +
          "popover and part of the page.",
      },
    },
  },
  render: (args) => <AppLayout {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Menu", hidden: true })).not.toBeVisible();
  },
};

export const InAppLayoutNarrow: Story = {
  args: mockedSidebarNavDefault,
  // Below the md breakpoint. The canvas and the test run apply this viewport, but a docs frame takes
  // the width of the page and would show the wide layout, so the story stays off the docs page.
  globals: { viewport: { value: "mobile2" } },
  tags: ["!autodocs"],
  parameters: appLayoutParameters,
  render: (args) => <AppLayout {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Menu" });

    // The side column is hidden, so no navigation is displayed until the drawer opens.
    await expect(canvas.queryByRole("navigation", { name: "Main" })).toBeNull();

    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
    const nav = canvas.getByRole("navigation", { name: "Main" });
    await expect(within(nav).getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    await userEvent.click(within(nav).getByRole("link", { name: "Settings" }));
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};
