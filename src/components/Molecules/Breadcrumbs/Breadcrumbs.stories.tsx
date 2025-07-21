import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { mockedBreadcrumbsDefault, mockedBreadcrumbsLong, mockedBreadcrumbsShort, mockedBreadcrumbsSingle } from './breadcrumbsMock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedBreadcrumbsDefault,
};

export const Long: Story = {
  args: mockedBreadcrumbsLong,
};

export const Short: Story = {
  args: mockedBreadcrumbsShort,
};

export const Single: Story = {
  args: mockedBreadcrumbsSingle,
};