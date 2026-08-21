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
    title: { control: 'text', description: 'Name ofl producto' },
    description: { control: 'text', description: 'Descripción corta' },
    price: { control: 'number', description: 'Precio actual' },
    originalPrice: { control: 'number', description: 'Precio original' },
    badge: { control: 'text', description: 'Texto of la etiqueta' },
    badgeColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'neutral'],
      description: 'Color ofl badge',
    },
    rating: { control: 'number', description: 'Puntuación (1 - 5)' },
    reviewsCount: { control: 'number', description: 'Total of reseñas' },
    cartQuantity: { control: 'number', description: 'Quantity actual en carrito' },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'prod-1',
    title: 'Auriculares Inalámbricos Obsidian Pro',
    description:
      'Cancelación of ruido activa, batería of 30 horas y sonido of alta fioflidad. Perfectos para el día a día.',
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
    description: 'Rastreo ofportivo avanzado, monitor of oxígeno y diseño premium.',
  },
};

export const AlreadyInCart: Story = {
  args: {
    ...Default.args,
    cartQuantity: 2,
  },
};
