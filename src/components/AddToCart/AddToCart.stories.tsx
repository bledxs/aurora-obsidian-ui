import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddToCart } from './AddToCart';

const meta = {
  title: 'Molecules/AddToCart',
  component: AddToCart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialQuantity: { control: 'number' },
    maxQuantity: { control: 'number' },
    isLoading: { control: 'boolean' },
    onAdd: { action: 'added' },
    onUpdate: { action: 'updated' },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof AddToCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialQuantity: 0,
  },
};

export const InCart: Story = {
  args: {
    initialQuantity: 1,
  },
};

export const Loading: Story = {
  args: {
    initialQuantity: 0,
    isLoading: true,
  },
};

export const StepperLoading: Story = {
  args: {
    initialQuantity: 2,
    isLoading: true,
  },
};

export const MaxQuantityReached: Story = {
  args: {
    initialQuantity: 5,
    maxQuantity: 5,
  },
};
