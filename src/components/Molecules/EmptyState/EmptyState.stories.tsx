import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonLink } from "../../Atoms/ButtonLink/ButtonLink";
import { EmptyState } from "./EmptyState";
import { mockedEmptyState, mockedEmptyStateTitleOnly } from "./emptyStateMock";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: mockedEmptyState,
};

export const TitleOnly: Story = {
  args: mockedEmptyStateTitleOnly,
};

export const WithAction: Story = {
  args: {
    ...mockedEmptyStateTitleOnly,
    action: (
      <ButtonLink href="/products" variant="outline" size="small">
        Clear filters
      </ButtonLink>
    ),
  },
};
