import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ProductGrid } from "./ProductGrid";
import { mockedProductDefault } from "../../Molecules/ProductCard/productCardMock";
import {
  mockedProductGridDefault,
  mockedProductGridFourColumns,
  mockedProductGridLargeGap,
} from "./productGridMock";

const meta = {
  title: "Organisms/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const createLinkSpy = () =>
  fn(({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ));
const createImageSpy = () =>
  fn((props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />);

const gridLinkSpy = createLinkSpy();
const ownLinkSpy = createLinkSpy();
const gridImageSpy = createImageSpy();

export const Default: Story = {
  args: mockedProductGridDefault,
};

export const FourColumns: Story = {
  args: mockedProductGridFourColumns,
};

export const LargeGap: Story = {
  args: mockedProductGridLargeGap,
};

// The grid-level components reach every card, and a product can override them.
export const CustomComponents: Story = {
  args: {
    columns: 3,
    LinkComponent: gridLinkSpy,
    ImageComponent: gridImageSpy,
    products: [
      {
        ...mockedProductDefault,
        id: "a",
        title: "Product A",
        href: "/products/a",
        imageUrl: `${mockedProductDefault.imageUrl}#a`,
      },
      {
        ...mockedProductDefault,
        id: "b",
        title: "Product B",
        href: "/products/b",
        imageUrl: `${mockedProductDefault.imageUrl}#b`,
      },
      {
        ...mockedProductDefault,
        id: "c",
        title: "Product C",
        href: "/products/c",
        imageUrl: `${mockedProductDefault.imageUrl}#c`,
        LinkComponent: ownLinkSpy,
      },
    ],
  },
  beforeEach: () => {
    gridLinkSpy.mockClear();
    ownLinkSpy.mockClear();
    gridImageSpy.mockClear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const gridHrefs = gridLinkSpy.mock.calls.map(([{ href }]) => href);
    const ownHrefs = ownLinkSpy.mock.calls.map(([{ href }]) => href);

    await expect(gridHrefs).toContain("/products/a");
    await expect(gridHrefs).toContain("/products/b");
    await expect(ownHrefs).toContain("/products/c");

    // The product that brings its own LinkComponent does not go through the grid's.
    await expect(gridHrefs).not.toContain("/products/c");
    await expect(canvas.getAllByRole("link")).toHaveLength(3);

    // Every card gets the grid-level ImageComponent, with its own product's image.
    const imageSources = gridImageSpy.mock.calls.map(([{ src }]) => src);
    for (const key of ["a", "b", "c"]) {
      await expect(imageSources).toContain(`${mockedProductDefault.imageUrl}#${key}`);
    }
  },
};

const ownClick = fn();
const gridClick = fn();
const getOnProductClick = fn(() => gridClick);

// A product's own `onProductClick` wins; `getOnProductClick` is the fallback for the rest.
export const ProductClickHandlers: Story = {
  args: {
    columns: 3,
    getOnProductClick,
    products: [
      { ...mockedProductDefault, id: "own", title: "Own handler", onProductClick: ownClick },
      { ...mockedProductDefault, id: "grid", title: "Grid handler" },
    ],
  },
  beforeEach: () => {
    ownClick.mockClear();
    gridClick.mockClear();
    getOnProductClick.mockClear();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Own handler" }));
    await expect(ownClick).toHaveBeenCalledTimes(1);
    await expect(gridClick).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Grid handler" }));
    await expect(gridClick).toHaveBeenCalledTimes(1);
    await expect(ownClick).toHaveBeenCalledTimes(1);
  },
};

// Without any handler the title stays plain text.
export const NoClickHandlers: Story = {
  args: { columns: 3, products: [{ ...mockedProductDefault, id: "plain", title: "Plain title" }] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { level: 3, name: "Plain title" })
    ).toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Plain title" })).not.toBeInTheDocument();
  },
};
