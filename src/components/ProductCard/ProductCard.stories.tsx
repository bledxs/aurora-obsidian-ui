import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Product name' },
    description: { control: 'text', description: 'Description corta' },
    price: { control: 'number', description: 'Current price' },
    originalPrice: { control: 'number', description: 'Price original' },
    badge: { control: 'text', description: 'Badge label text' },
    badgeColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'neutral'],
      description: 'Badge color',
    },
    rating: { control: 'number', description: 'Rating (1 - 5)' },
    reviewsCount: { control: 'number', description: 'Total reviews count' },
    cartQuantity: {
      control: 'number',
      description: 'Current cart quantity',
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'prod-1',
    title: 'Obsidian Pro Wireless Headphones',
    description:
      'Active noise cancellation, 30-hour battery life, and high-fidelity acoustics. Built for everyday luxury.',
    price: 129.99,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600&h=600',
    rating: 4.8,
    reviewsCount: 124,
  },
};

export const WithDiscount: Story = {
  args: {
    ...Default.args,
    price: 99.99,
    originalPrice: 129.99,
    badge: 'Deerta -23%',
    badgeColor: 'error',
  },
};

export const NewArrival: Story = {
  args: {
    ...Default.args,
    badge: 'New',
    badgeColor: 'primary',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600&h=600',
    title: 'Smartwatch Titan Series',
    description: 'Advanced sports tracking, blood oxygen monitor, and premium titanium build.',
  },
};

export const AlreadyInCart: Story = {
  args: {
    ...Default.args,
    cartQuantity: 2,
  },
};
