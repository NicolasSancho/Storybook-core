import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, within } from "storybook/test";
import { Pagination } from "./Pagination";
import {
  mockedPaginationFirst,
  mockedPaginationLast,
  mockedPaginationMiddle,
  mockedPaginationSinglePage,
} from "./paginationMock";

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: mockedPaginationFirst,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("1–20 of 84")).toBeInTheDocument();
    await expect(canvas.queryByRole("link", { name: "Previous page" })).toBeNull();
    await expect(canvas.getByRole("link", { name: "Next page" })).toHaveAttribute(
      "href",
      "?page=2"
    );
  },
};

export const MiddlePage: Story = {
  args: mockedPaginationMiddle,
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Pagination" });

    await expect(nav).toHaveTextContent("Page 3 of 5");
    await expect(within(nav).getAllByRole("link")).toHaveLength(2);
  },
};

export const LastPage: Story = {
  args: mockedPaginationLast,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("81–84 of 84")).toBeInTheDocument();
    await expect(canvas.queryByRole("link", { name: "Next page" })).toBeNull();
  },
};

export const SinglePage: Story = {
  args: mockedPaginationSinglePage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("1–3 of 3")).toBeInTheDocument();
    await expect(canvas.queryByRole("navigation")).toBeNull();
  },
};

const linkSpy = fn();

const SpyLink = (props: { href: string; children: React.ReactNode; className?: string }) => {
  linkSpy(props);
  return <a {...props} />;
};

export const WithLinkComponent: Story = {
  args: { ...mockedPaginationMiddle, LinkComponent: SpyLink },
  play: async ({ canvasElement }) => {
    const hrefs = linkSpy.mock.calls.map(([props]) => props.href);

    await expect(hrefs).toEqual(expect.arrayContaining(["?page=2", "?page=4"]));
    await expect(within(canvasElement).getAllByRole("link")).toHaveLength(2);
  },
};
