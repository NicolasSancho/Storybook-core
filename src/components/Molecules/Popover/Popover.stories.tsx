import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../../Atoms/Button/Button";
import { Popover } from "./Popover";
import { mockedPopoverDrawer, mockedPopoverMenu, mockedPopoverStart } from "./popoverMock";

const meta = {
  title: "Molecules/Popover",
  component: Popover,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-72 items-start justify-end p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// The popover panel that holds an element: the box to measure.
const panelOf = (element: HTMLElement): HTMLElement => {
  const panel = element.closest<HTMLElement>("[popover]");
  if (!panel) throw new Error("The element is not inside a popover");
  return panel;
};

const MenuContent = () => (
  <ul className="flex flex-col gap-1 text-sm">
    <li>
      <a href="/products" className="block rounded-sm px-2 py-1.5 hover:bg-neutral-100">
        Products
      </a>
    </li>
    <li>
      <a href="/settings" className="block rounded-sm px-2 py-1.5 hover:bg-neutral-100">
        Settings
      </a>
    </li>
  </ul>
);

export const Menu: Story = {
  args: { ...mockedPopoverMenu, children: <MenuContent /> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Ana Ruiz" });

    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
    const link = canvas.getByRole("link", { name: "Products" });
    await expect(link).toBeVisible();

    // The dropdown sits under the trigger and ends at its right edge.
    const panel = panelOf(link);
    const panelBox = panel.getBoundingClientRect();
    const triggerBox = trigger.getBoundingClientRect();
    await expect(triggerBox.height).toBeLessThan(60);
    await expect(Math.round(panelBox.top)).toBe(Math.round(triggerBox.bottom + 4));
    await expect(Math.round(panelBox.right)).toBe(Math.round(triggerBox.right));

    // A dropdown does not dim the page behind it.
    await expect(getComputedStyle(panel, "::backdrop").backgroundColor).toBe("rgba(0, 0, 0, 0)");

    // A dropdown has no close button: it closes on an outside click, Esc or a link.
    await expect(canvas.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();

    // Choosing a link closes the panel.
    await userEvent.click(link);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    await expect(link).not.toBeVisible();
  },
};

export const AlignedToStart: Story = {
  args: { ...mockedPopoverStart, children: <MenuContent /> },
  decorators: [
    (Story) => (
      <div className="flex min-h-72 items-start justify-start p-4">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Filters" });

    await userEvent.click(trigger);
    const panel = panelOf(canvas.getByRole("link", { name: "Products" }));
    await expect(Math.round(panel.getBoundingClientRect().left)).toBe(
      Math.round(trigger.getBoundingClientRect().left)
    );
  },
};

const submitSpy = fn();

export const FormInside: Story = {
  args: {
    ...mockedPopoverMenu,
    children: (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSpy();
        }}
      >
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    ),
  },
  beforeEach: () => {
    submitSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Ana Ruiz" });

    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Sign out" }));

    // The form submitted and the panel closed.
    await expect(submitSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
  },
};

export const Drawer: Story = {
  // A drawer is placed against the viewport, so the docs page shows it in its own small frame.
  parameters: { docs: { story: { inline: false, iframeHeight: 360 } } },
  args: {
    ...mockedPopoverDrawer,
    children: (
      <div className="p-4">
        <MenuContent />
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-72 items-start justify-start p-4">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Menu" });

    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));

    // A full-height panel against the left edge of the screen.
    const panel = panelOf(canvas.getByRole("link", { name: "Products" }));
    const box = panel.getBoundingClientRect();
    await expect(Math.round(box.left)).toBe(0);
    await expect(Math.round(box.height)).toBe(window.innerHeight);

    // The drawer dims the page behind it.
    await expect(getComputedStyle(panel, "::backdrop").backgroundColor).not.toBe(
      "rgba(0, 0, 0, 0)"
    );

    // The trigger keeps its own height: the wrapper must not stretch it.
    await expect(trigger.getBoundingClientRect().height).toBeLessThan(60);

    // The close button closes the drawer.
    await userEvent.click(canvas.getByRole("button", { name: "Close menu" }));
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    await expect(panel).not.toBeVisible();
  },
};
