import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ProductCard } from "./ProductCard";
import { Button } from "../../Atoms/Button/Button";
import {
  mockedProductDefault,
  mockedProductWithTag,
  mockedProductOnSale,
  mockedProductCardLink,
} from "./productCardMock";

const meta = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spy standing in for a framework link (e.g. next/link): records the props it receives.
// It cancels the navigation so clicking it does not leave the story.
const linkSpy = fn(
  ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className} onClick={(event) => event.preventDefault()}>
      {children}
    </a>
  )
);

// Spy standing in for a framework image (e.g. next/image): records the props it receives.
const imageSpy = fn((props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />);

export const Default: Story = {
  args: mockedProductDefault,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The image is decorative (the title names the card): it is hidden from screen readers.
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
    await expect(canvas.getByRole("presentation")).toHaveAttribute("src", args.imageUrl);

    // Without an href the card is display-only: the title is plain text, with nothing to press.
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Basic T-Shirt" })
    ).toBeInTheDocument();
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
  },
};

export const WithTag: Story = {
  args: mockedProductWithTag,
};

export const OnSale: Story = {
  args: mockedProductOnSale,
};

// The title is a real link stretched over the card.
export const WithLink: Story = {
  args: mockedProductCardLink,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // With an href the title is a real link (default <a>), named by the title.
    await expect(canvas.getByRole("link", { name: "Basic T-Shirt" })).toHaveAttribute(
      "href",
      args.href
    );
    // No controls were passed, so there is nothing else to press.
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
  },
};

// Elements are hit-tested at their center, as a real pointer would, because a synthetic
// click would reach the element directly and prove nothing about the stretched link.
const elementAtCenter = (element: Element) => {
  const { x, y, width, height } = element.getBoundingClientRect();
  return element.ownerDocument.elementFromPoint(x + width / 2, y + height / 2);
};

// A submit handler for the add-to-cart form in the actions slot. It cancels the submit so the
// story never reloads.
const submitSpy = fn((event: React.FormEvent) => event.preventDefault());

// The title link covers the whole card, except the controls in `actions`, which stay on top of it.
export const StretchedLink: Story = {
  args: {
    ...mockedProductCardLink,
    actions: (
      <form onSubmit={submitSpy}>
        <Button type="submit">Add to cart</Button>
      </form>
    ),
  },
  beforeEach: () => {
    submitSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Basic T-Shirt" });

    // Pressing the image or the price hits the link, so the whole card opens the product.
    await expect(elementAtCenter(canvas.getByRole("presentation"))).toBe(link);
    await expect(elementAtCenter(canvas.getByText("$19.99"))).toBe(link);

    // The button keeps its own click target, and pressing it only submits its form.
    const button = canvas.getByRole("button", { name: "Add to cart" });
    await expect(elementAtCenter(button)).toBe(button);
    await userEvent.click(button);
    await expect(submitSpy).toHaveBeenCalledTimes(1);

    // Keyboard order: the link first, then the button.
    link.focus();
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const CustomLink: Story = {
  args: { ...mockedProductCardLink, LinkComponent: linkSpy },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ args, canvasElement }) => {
    const received = linkSpy.mock.calls.map(([props]) => props);

    // The injected component gets the href, a class and the title as its children.
    await expect(received).toContainEqual(
      expect.objectContaining({ href: args.href, children: "Basic T-Shirt" })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    // The result is what the user gets: a real link.
    await expect(
      within(canvasElement).getByRole("link", { name: "Basic T-Shirt" })
    ).toHaveAttribute("href", args.href);
  },
};

export const CustomImage: Story = {
  args: {
    ...mockedProductDefault,
    ImageComponent: imageSpy,
    imageProps: { width: 300, height: 400, sizes: "25vw", loading: "lazy" },
  },
  beforeEach: () => {
    imageSpy.mockClear();
  },
  play: async ({ args }) => {
    const received = imageSpy.mock.calls.map(([props]) => props);

    // The injected component gets the source, an empty alt, a class and the extra attributes.
    await expect(received).toContainEqual(
      expect.objectContaining({
        src: args.imageUrl,
        alt: "",
        width: 300,
        height: 400,
        sizes: "25vw",
        loading: "lazy",
      })
    );
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
  },
};
