import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Breadcrumbs } from "./Breadcrumbs";
import {
  mockedBreadcrumbsDefault,
  mockedBreadcrumbsLong,
  mockedBreadcrumbsShort,
  mockedBreadcrumbsSingle,
} from "./breadcrumbsMock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedBreadcrumbsDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();

    // The home icon is decorative: the link gets its name from the sr-only label.
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");

    // The last item is the current page: plain text, not a link.
    await expect(canvas.queryByRole("link", { name: "Clothing" })).not.toBeInTheDocument();
    await expect(canvas.getByText("Clothing")).toHaveAttribute("aria-current", "page");
  },
};

export const Long: Story = {
  args: mockedBreadcrumbsLong,
};

export const Short: Story = {
  args: mockedBreadcrumbsShort,
};

export const Single: Story = {
  args: mockedBreadcrumbsSingle,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The only item is both the first and the last one: it is the current page, not a link.
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    await expect(canvas.getByText("Home").parentElement).toHaveAttribute("aria-current", "page");
  },
};
