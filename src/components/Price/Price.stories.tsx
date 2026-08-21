import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

const meta = {
  title: 'Atoms/Price',
  component: Price,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 129.99,
  },
};

export const WithDiscount: Story = {
  args: {
    value: 99.99,
    originalValue: 129.99,
  },
};

export const WithDiscountBadge: Story = {
  args: {
    value: 79.99,
    originalValue: 159.99,
    showDiscountBadge: true,
  },
};

export const Large: Story = {
  args: {
    value: 499.0,
    originalValue: 599.0,
    showDiscountBadge: true,
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    value: 12.5,
    originalValue: 15.0,
    showDiscountBadge: true,
    size: 'small',
  },
};

export const USD: Story = {
  args: {
    value: 99.99,
    currency: 'USD',
    locale: 'en-US',
  },
};
