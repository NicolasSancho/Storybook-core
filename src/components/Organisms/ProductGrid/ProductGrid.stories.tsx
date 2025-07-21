import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProductGrid } from './ProductGrid';
import { mockedProductGridDefault, mockedProductGridFourColumns, mockedProductGridLargeGap } from './productGridMock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: mockedProductGridDefault
};

export const FourColumns: Story = {
  args: mockedProductGridFourColumns
};

export const LargeGap: Story = {
  args: mockedProductGridLargeGap
};
