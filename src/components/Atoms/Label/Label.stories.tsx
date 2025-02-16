import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { mockedLabel, primaryLabel, secondaryLabel } from './labelMock';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
  args: mockedLabel,
};

export const Primary: Story = {
  args: primaryLabel,
};

export const Secondary: Story = {
  args: secondaryLabel,
};