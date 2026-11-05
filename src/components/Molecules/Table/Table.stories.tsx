import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Badge } from "../../Atoms/Badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableProps,
  TableRow,
} from "./Table";
import { mockedTableProducts } from "./tableMock";

const meta = {
  title: "Molecules/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    label: "Products table",
    caption: "Products, newest first. Name and Price sort.",
    children: null,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProductRows = () => (
  <TableBody>
    {mockedTableProducts.map((product) => (
      <TableRow key={product.id}>
        <TableCell>
          <a
            href={`#${product.id}`}
            className="font-medium underline decoration-neutral-400 underline-offset-2 hover:decoration-neutral-900"
          >
            {product.name}
          </a>
        </TableCell>
        <TableCell>
          <Badge variant={product.status === "Active" ? "success" : "neutral"}>
            {product.status}
          </Badge>
        </TableCell>
        <TableCell align="right">{product.variants}</TableCell>
        <TableCell align="right">{product.price}</TableCell>
      </TableRow>
    ))}
  </TableBody>
);

const linkSpy = fn();

const SpyLink = (props: { href: string; children: React.ReactNode; className?: string }) => {
  linkSpy(props);
  return <a {...props} />;
};

const ProductTable = ({
  sort,
  LinkComponent,
  ...args
}: TableProps & {
  sort?: "ascending" | "descending";
  LinkComponent?: typeof SpyLink;
}) => (
  <Table {...args}>
    <TableHead>
      <TableRow>
        <TableHeaderCell href="?sort=name,asc" sort={sort} LinkComponent={LinkComponent}>
          Name
        </TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell align="right">Variants</TableHeaderCell>
        <TableHeaderCell href="?sort=basePriceCents,asc" align="right">
          Price
        </TableHeaderCell>
      </TableRow>
    </TableHead>
    <ProductRows />
  </Table>
);

export const Default: Story = {
  render: (args) => <ProductTable {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("region", { name: "Products table" })).toHaveAttribute(
      "tabindex",
      "0"
    );
    await expect(canvas.getByRole("table")).toHaveAccessibleName(/newest first/);
    await expect(canvasElement.querySelector("[aria-sort]")).toBeNull();
    await expect(canvas.getByRole("link", { name: "Price" })).toHaveAttribute(
      "href",
      "?sort=basePriceCents,asc"
    );
    await expect(canvas.queryByRole("link", { name: "Status" })).toBeNull();
  },
};

export const Sorted: Story = {
  render: (args) => <ProductTable {...args} sort="ascending" />,
  play: async ({ canvasElement }) => {
    const sorted = canvasElement.querySelectorAll("[aria-sort]");

    await expect(sorted).toHaveLength(1);
    await expect(sorted[0]).toHaveAttribute("aria-sort", "ascending");
    await expect(sorted[0]).toHaveTextContent("Name");
  },
};

export const KeyboardFocus: Story = {
  render: (args) => <ProductTable {...args} />,
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Products table" });

    await userEvent.tab();

    await expect(region).toHaveFocus();
    await expect(getComputedStyle(region).outlineStyle).toBe("solid");
    await expect(getComputedStyle(region).outlineWidth).toBe("2px");
  },
};

export const SortedDescending: Story = {
  render: (args) => <ProductTable {...args} sort="descending" />,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[aria-sort]")).toHaveAttribute(
      "aria-sort",
      "descending"
    );
  },
};

export const SortedWithoutLink: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell sort="ascending">Name</TableHeaderCell>
        </TableRow>
      </TableHead>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const header = within(canvasElement).getByRole("columnheader", { name: "Name" });

    await expect(header).toHaveAttribute("aria-sort", "ascending");
    await expect(header.querySelector("svg")).not.toBeNull();
  },
};

export const WithLinkComponent: Story = {
  render: (args) => <ProductTable {...args} LinkComponent={SpyLink} />,
  play: async ({ canvasElement }) => {
    await expect(linkSpy.mock.calls.at(-1)?.[0].href).toBe("?sort=name,asc");
    await expect(within(canvasElement).getByRole("link", { name: "Name" })).toBeInTheDocument();
  },
};

export const ScrollsWhenNarrow: Story = {
  args: { className: "min-w-[40rem]" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: (args) => <ProductTable {...args} />,
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Products table" });

    await expect(region.scrollWidth).toBeGreaterThan(region.clientWidth);
  },
};
