import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Chip } from "./Chip";
import {
  mockedChipDefault,
  mockedChipDisabled,
  mockedChipSelected,
  mockedChipSubmit,
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

// A submit chip with a name and value is a native form control: the choice reaches the form
// data with no handler, as it does when rendered from a Server Component.
export const InForm: Story = {
  args: mockedChipSubmit,
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        const data = new FormData(event.currentTarget, submitter);
        event.currentTarget.dataset.submitted = String(data.get("category"));
      }}
    >
      <Chip {...args} />
    </form>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Shirts" }));
    await expect(canvasElement.querySelector("form")).toHaveAttribute("data-submitted", "shirts");
  },
};
