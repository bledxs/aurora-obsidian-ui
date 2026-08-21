import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button text or content',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button visual variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Add to Cart',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'View Details',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancel',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Action',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Item',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Buy Now',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Remove',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Out of Stock',
  },
};
