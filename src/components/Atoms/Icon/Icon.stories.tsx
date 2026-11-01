import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Icon } from "./Icon";
import { mockedIcon, smallSecondaryIcon, largePrimaryIcon, largeBlackIcon } from "./iconMock";
import { IconsMap } from "./iconsMap";

const iconNames = Object.keys(IconsMap) as (keyof typeof IconsMap)[];

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: {
        type: "select",
        options: iconNames,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedIcon,
};

export const SmallSecondary: Story = {
  args: smallSecondaryIcon,
};

export const LargePrimary: Story = {
  args: largePrimaryIcon,
};
export const LargeBlack: Story = {
  args: largeBlackIcon,
};

export const InheritsTextColor: Story = {
  render: () => (
    <Button>
      <Icon name="Package" size="small" />
      Add product
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Add product" });
    const icon = button.querySelector("svg");
    if (!icon) throw new Error("The button needs an icon");

    // By default the icon takes the label's color, here the text on the primary fill, in both themes.
    await expect(getComputedStyle(icon).color).toBe(getComputedStyle(button).color);
  },
};

export const Labelled: Story = {
  args: { name: "ShoppingCart", ariaLabel: "Shopping cart" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Shopping cart" })).toBeVisible();
  },
};

export const AllIcons: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-4">
      {iconNames.map((name) => (
        <li key={name} className="flex items-center gap-2">
          <Icon name={name} />
          <span className="text-sm">{name}</span>
        </li>
      ))}
    </ul>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Decorative by default: hidden from the accessibility tree, so no icon is an `img`
    await expect(canvas.queryByRole("img")).toBeNull();
    const svgs = canvasElement.querySelectorAll("svg");
    await expect(svgs).toHaveLength(iconNames.length);
    for (const svg of svgs) {
      await expect(svg).toHaveAttribute("aria-hidden", "true");
      await expect(svg.childElementCount).toBeGreaterThan(0);
    }
  },
};
