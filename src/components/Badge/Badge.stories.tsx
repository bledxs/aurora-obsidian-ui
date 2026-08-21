import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'solid',
        'subtle',
        'outline',
      ],
      description: 'Visual or semantic variant of the badge',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'neutral'],
      description: 'Color theme used with solid/subtle/outline variants',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Badge size scale',
    },
    children: {
      control: 'text',
      description: 'Badge label text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const DirectSuccess: Story = {
  args: {
    variant: 'success',
    children: 'In Stock',
  },
};

export const DirectWarning: Story = {
  args: {
    variant: 'warning',
    children: 'Low Stock (2 Left)',
  },
};

export const DirectError: Story = {
  args: {
    variant: 'error',
    children: 'Out of Stock',
  },
};

export const SubtleSuccess: Story = {
  args: {
    variant: 'subtle',
    color: 'success',
    children: 'Free Shipping',
  },
};

export const OutlinePrimary: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: 'Bestseller',
  },
};

export const SmallNew: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'NEW',
  },
};
