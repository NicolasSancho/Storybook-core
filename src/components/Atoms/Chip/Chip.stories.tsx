import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Chip } from "./Chip";
import {
  mockedChipDefault,
  mockedChipDisabled,
  mockedChipLink,
  mockedChipSelected,
} from "./chipMock";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

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
    "aria-current"?: "true";
  }) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  )
);

export const Default: Story = {
  args: { ...mockedChipDefault, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const chip = within(canvasElement).getByRole("button", { name: "All" });

    // A chip is a toggle button: pressed state is exposed, and it never submits by accident.
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await expect(chip).toHaveAttribute("type", "button");

    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Selected: Story = {
  args: mockedChipSelected,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  },
};

export const Disabled: Story = {
  args: mockedChipDisabled,
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByRole("button", { name: "Sold out" });

    // A disabled chip is skipped by the keyboard.
    await expect(chip).toBeDisabled();
    await userEvent.tab();
    await expect(chip).not.toHaveFocus();
  },
};

export const Keyboard: Story = {
  args: { ...mockedChipDefault, onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const chip = within(canvasElement).getByRole("button", { name: "All" });

    await userEvent.tab();
    await expect(chip).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

// No LinkComponent here: the chip renders a plain anchor, so no setup is needed.
export const AsLink: Story = {
  args: mockedChipLink,
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shirts" });

    await expect(link).toHaveAttribute("href", "/products?category=shirts");
    // Not selected: no current state, and it is a link, not a toggle button.
    await expect(link).not.toHaveAttribute("aria-current");
    await expect(within(canvasElement).queryByRole("button")).not.toBeInTheDocument();
  },
};

export const SelectedLink: Story = {
  args: { ...mockedChipLink, selected: true },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shirts" });

    await expect(link).toHaveAttribute("aria-current", "true");
    // A link marks the current choice with aria-current, never aria-pressed.
    await expect(link).not.toHaveAttribute("aria-pressed");
  },
};

export const CustomLink: Story = {
  args: { ...mockedChipLink, selected: true, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const received = linkSpy.mock.calls.map(([props]) => props);

    // The injected component gets the href, a class, the label and the current state.
    await expect(received).toContainEqual(
      expect.objectContaining({
        href: "/products?category=shirts",
        children: "Shirts",
        "aria-current": "true",
      })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    // The result is what the user gets: a real link with the same state.
    await expect(within(canvasElement).getByRole("link", { name: "Shirts" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  },
};

// A submit chip with a name and value is a native form control: the choice reaches the form
// data with no handler, as it does when rendered from a Server Component.
export const InForm: Story = {
  args: { children: "Shirts", type: "submit", name: "category", value: "shirts" },
  render: (args) => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(
            event.currentTarget,
            (event.nativeEvent as SubmitEvent).submitter
          );
          event.currentTarget.dataset.submitted = String(data.get("category"));
        }}
      >
        <Chip {...args} />
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Shirts" }));
    await expect(canvasElement.querySelector("form")).toHaveAttribute("data-submitted", "shirts");
  },
};

// Category filters as links: exactly one is the current choice.
export const FilterList: Story = {
  args: { children: "All" },
  render: () => (
    <nav aria-label="Categories">
      <ul className="flex flex-wrap gap-2">
        {[
          { label: "All", href: "/products", selected: true },
          { label: "Shirts", href: "/products?category=shirts" },
          { label: "Jackets", href: "/products?category=jackets" },
          { label: "Shoes", href: "/products?category=shoes" },
        ].map(({ label, href, selected }) => (
          <li key={label}>
            <Chip href={href} selected={selected}>
              {label}
            </Chip>
          </li>
        ))}
      </ul>
    </nav>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Categories" });

    const links = within(nav).getAllByRole("link");
    await expect(links).toHaveLength(4);

    // Exactly one link is the current choice.
    const current = links.filter((link) => link.getAttribute("aria-current") === "true");
    await expect(current).toHaveLength(1);
    await expect(current[0]).toHaveAccessibleName("All");
  },
};
