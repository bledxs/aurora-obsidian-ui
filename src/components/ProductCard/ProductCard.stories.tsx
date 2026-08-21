import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'prod-1',
    title: 'Auriculares Inalámbricos Obsidian Pro',
    description:
      'Cancelación de ruido activa, batería de 30 horas y sonido de alta fidelidad. Perfectos para el día a día.',
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
    badge: 'Oferta -23%',
    badgeColor: 'error',
  },
};

export const NewArrival: Story = {
  args: {
    ...Default.args,
    badge: 'Nuevo',
    badgeColor: 'primary',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600&h=600',
    title: 'Smartwatch Titan Series',
    description: 'Rastreo deportivo avanzado, monitor de oxígeno y diseño premium.',
  },
};

export const AlreadyInCart: Story = {
  args: {
    ...Default.args,
    cartQuantity: 2,
  },
};
