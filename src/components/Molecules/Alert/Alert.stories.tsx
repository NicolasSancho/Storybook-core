import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../../Atoms/Button/Button";
import { Alert } from "./Alert";
import { mockedAlertError, mockedAlertTitleOnly } from "./alertMock";

const meta = {
  title: "Molecules/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedAlertError,
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole("alert");

    await expect(alert).toHaveTextContent("Sign in failed");
    await expect(alert).toHaveTextContent("Check your email and password and try again.");
  },
};

export const TitleOnly: Story = {
  args: mockedAlertTitleOnly,
};

const retry = fn();

export const WithAction: Story = {
  args: {
    ...mockedAlertTitleOnly,
    children: "Check your connection and try again.",
    action: (
      <Button variant="outline" size="small" onClick={retry}>
        Retry
      </Button>
    ),
  },
  beforeEach: () => {
    retry.mockClear();
  },
  play: async ({ canvasElement }) => {
    const button = within(within(canvasElement).getByRole("alert")).getByRole("button", {
      name: "Retry",
    });

    await userEvent.click(button);
    await expect(retry).toHaveBeenCalledTimes(1);
  },
};
