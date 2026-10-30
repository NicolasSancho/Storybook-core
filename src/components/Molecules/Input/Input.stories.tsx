import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../../Atoms/Button/Button";
import { Input } from "./Input";
import {
  mockedInputDefault,
  mockedInputWithDescription,
  mockedInputWithError,
  mockedInputPassword,
  mockedInputHiddenLabel,
  mockedInputDisabled,
} from "./inputMock";

const meta = {
  title: "Molecules/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedInputDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Email" });

    // Clicking the label text focuses the field: the label is a real <label for>.
    await userEvent.click(canvas.getByText("Email"));
    await expect(input).toHaveFocus();

    await userEvent.type(input, "ana@example.com");
    await expect(input).toHaveValue("ana@example.com");
    await expect(input).not.toHaveAttribute("aria-invalid");
  },
};

export const WithDescription: Story = {
  args: mockedInputWithDescription,
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("textbox", { name: "Email" })
    ).toHaveAccessibleDescription("We never share your email.");
  },
};

export const WithError: Story = {
  args: mockedInputWithError,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Email" });

    // Not `toBeInvalid()`: an email field with a bad value is natively invalid, so that would pass anyway.
    await expect(input).toHaveAttribute("aria-invalid", "true");
    // The description comes first, then the error: both are read when the field is focused.
    await expect(input).toHaveAccessibleDescription(
      "We never share your email. Enter an email address like name@example.com."
    );
  },
};

export const Password: Story = {
  args: mockedInputPassword,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  },
};

export const HiddenLabel: Story = {
  args: mockedInputHiddenLabel,
  play: async ({ canvasElement }) => {
    // The label is not visible but still names the field.
    await expect(
      within(canvasElement).getByRole("searchbox", { name: "Search products" })
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: mockedInputDisabled,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox", { name: "Email" })).toBeDisabled();
  },
};

// Spy standing in for a Server Action: records the value the native form submits.
const submitSpy = fn();

export const InForm: Story = {
  args: { ...mockedInputDefault, defaultValue: "ana@example.com" },
  beforeEach: () => {
    submitSpy.mockClear();
  },
  render: (args) => (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        submitSpy(new FormData(event.currentTarget).get("email"));
      }}
    >
      <Input {...args} />
      <Button type="submit">Send</Button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    // The input has no onChange: a native form still submits its value.
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Send" }));
    await expect(submitSpy).toHaveBeenCalledWith("ana@example.com");
  },
};
