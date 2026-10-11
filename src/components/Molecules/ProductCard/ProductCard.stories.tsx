import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ProductCard } from "./ProductCard";
import {
  mockedProductDefault,
  mockedProductWithTag,
  mockedProductOnSale,
  mockedProductCardClickable,
  mockedProductCardLink,
  mockedProductCardNoButton,
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
  ({
    href,
    onClick,
    children,
    className,
  }: {
    href: string;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
  }) => (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
    >
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
  },
};

export const WithTag: Story = {
  args: mockedProductWithTag,
};

export const OnSale: Story = {
  args: mockedProductOnSale,
};

// Spies are passed here because the mock's handlers are no-ops.
export const Clickable: Story = {
  args: { ...mockedProductCardClickable, onClick: fn(), onProductClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The title is the accessible name of the stretched button that opens the product.
    await userEvent.click(canvas.getByRole("button", { name: "Basic T-Shirt" }));
    await expect(args.onProductClick).toHaveBeenCalledTimes(1);
    await expect(args.onClick).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Add to Cart" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(args.onProductClick).toHaveBeenCalledTimes(1);
  },
};

// The title is a real link stretched over the card; Add to Cart stays a separate button.
export const WithLink: Story = {
  args: mockedProductCardLink,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // With an href the title is a real link (default <a>), not a button.
    await expect(canvas.getByRole("link", { name: "Basic T-Shirt" })).toHaveAttribute(
      "href",
      args.href
    );
    await expect(canvas.queryByRole("button", { name: "Basic T-Shirt" })).not.toBeInTheDocument();
    // Add to Cart stays a separate button, outside the link.
    await expect(canvas.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
  },
};

// Elements are hit-tested at their center, as a real pointer would, because a synthetic
// click would reach the element directly and prove nothing about the stretched link.
const elementAtCenter = (element: Element) => {
  const { x, y, width, height } = element.getBoundingClientRect();
  return element.ownerDocument.elementFromPoint(x + width / 2, y + height / 2);
};

// The title link covers the whole card, except Add to Cart, which stays on top of it.
export const StretchedLink: Story = {
  args: mockedProductCardLink,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Basic T-Shirt" });

    // Pressing the image or the price hits the link, so the whole card opens the product.
    await expect(elementAtCenter(canvas.getByRole("presentation"))).toBe(link);
    await expect(elementAtCenter(canvas.getByText("$19.99"))).toBe(link);

    // The button keeps its own click target.
    const button = canvas.getByRole("button", { name: "Add to Cart" });
    await expect(elementAtCenter(button)).toBe(button);

    // Keyboard order: the link first, then the button.
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

export const CustomLink: Story = {
  args: { ...mockedProductCardLink, LinkComponent: linkSpy, onProductClick: fn() },
  beforeEach: () => {
    linkSpy.mockClear();
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const received = linkSpy.mock.calls.map(([props]) => props);

    // The injected component gets the href, a class and the handler as `onClick`.
    await expect(received).toContainEqual(expect.objectContaining({ href: args.href }));
    await expect(received.every(({ className }) => Boolean(className))).toBe(true);
    await expect(received.every(({ onClick }) => typeof onClick === "function")).toBe(true);

    // The link wins over the stretched button, and still runs the handler.
    await expect(canvas.queryByRole("button", { name: "Basic T-Shirt" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("link", { name: "Basic T-Shirt" }));
    await expect(args.onProductClick).toHaveBeenCalledTimes(1);
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

export const NoButton: Story = {
  args: mockedProductCardNoButton,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Without handlers the title is plain heading text and no button is rendered.
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Display Only Product" })
    ).toBeInTheDocument();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
  },
};
