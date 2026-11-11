import type { LinkComponentProps } from "../../types/linkComponent";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ChipLink } from "./ChipLink";
import { mockedChipLinkDefault, mockedChipLinkSelected } from "./chipLinkMock";

const meta = {
  title: "Atoms/ChipLink",
  component: ChipLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spy standing in for a framework link (e.g. next/link): records the props it receives.
const linkSpy = fn(
  ({ href, children, className, "aria-current": ariaCurrent }: LinkComponentProps) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  )
);

// No LinkComponent here: the chip renders a plain anchor, so no setup is needed.
export const Default: Story = {
  args: mockedChipLinkDefault,
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shirts" });

    await expect(link).toHaveAttribute("href", "/products?category=shirts");
    // Not selected: no current state.
    await expect(link).not.toHaveAttribute("aria-current");
  },
};

export const Selected: Story = {
  args: mockedChipLinkSelected,
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shirts" });

    await expect(link).toHaveAttribute("aria-current", "true");
    // A link marks the current choice with aria-current, never aria-pressed.
    await expect(link).not.toHaveAttribute("aria-pressed");
  },
};

export const Keyboard: Story = {
  args: mockedChipLinkDefault,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("link", { name: "Shirts" })).toHaveFocus();
  },
};

export const CustomLink: Story = {
  args: { ...mockedChipLinkSelected, LinkComponent: linkSpy },
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

// Category filters as links: exactly one is the current choice.
export const FilterList: Story = {
  args: mockedChipLinkDefault,
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
            <ChipLink href={href} selected={selected}>
              {label}
            </ChipLink>
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

// Spy that renders every prop it receives, so forwarded attributes reach the rendered link.
const forwardingSpy = fn(({ children, ...props }: LinkComponentProps) => (
  <a {...props}>{children}</a>
));

export const Attributes: Story = {
  args: {
    ...mockedChipLinkDefault,
    LinkComponent: forwardingSpy,
    rel: "external",
    hrefLang: "pt",
    lang: "pt",
    ref: fn(),
  },
  // `data-*` attributes are valid JSX but not part of the props type, so they go in the render.
  // `aria-current` is passed too: `selected` owns it, so an unselected chip must not be current.
  render: (args) => <ChipLink {...args} data-analytics="cta" aria-current="page" />,
  beforeEach: () => {
    forwardingSpy.mockClear();
  },
  play: async ({ args, canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Shirts" });

    // The link component receives every attribute, and they reach the rendered link with the ref.
    await expect(forwardingSpy.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({
        href: "/products?category=shirts",
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
    await expect(link).not.toHaveAttribute("aria-current");
  },
};
