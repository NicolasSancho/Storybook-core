import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select } from "./Select";
import { mockedSelect } from "./selectMock";

const meta = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...mockedSelect, defaultValue: "DRAFT" },
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText("Status");

    await expect(select).toHaveValue("DRAFT");
    await expect(select).toHaveAttribute("name", "status");
  },
};

export const HiddenLabel: Story = {
  args: { ...mockedSelect, hideLabel: true },
  play: async ({ canvasElement }) => {
    // The label still names the select, but takes no visible space.
    const select = within(canvasElement).getByRole<HTMLSelectElement>("combobox", {
      name: "Status",
    });
    const label = select.labels[0];
    if (!label) throw new Error("The select needs a label");
    const box = label.getBoundingClientRect();
    await expect(box.width).toBeLessThanOrEqual(1);
    await expect(box.height).toBeLessThanOrEqual(1);
  },
};

export const Controlled: Story = {
  args: mockedSelect,
  render: (args) => {
    const [value, setValue] = useState("ACTIVE");
    return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText("Status");

    await userEvent.selectOptions(select, "ARCHIVED");
    await expect(select).toHaveValue("ARCHIVED");
  },
};
