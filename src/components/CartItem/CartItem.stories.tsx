import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CartItem } from './CartItem';

const meta = {
  title: 'Molecules/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Name ofl producto' },
    price: { control: 'number', description: 'Precio unitario' },
    originalPrice: { control: 'number', description: 'Precio original anterior' },
    quantity: { control: 'number', description: 'Quantity seleccionada' },
    variantDescription: { control: 'text', description: 'Detalle of variante' },
    isLoading: { control: 'boolean', description: 'Bloqueo of interacción' },
    onQuantityChange: { action: 'quantityChanged' },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Auriculares Inalámbricos Obsidian Pro',
    price: 129.99,
    quantity: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300',
    variantDescription: 'Color: Obsidian Black',
  },
};

export const WithDiscount: Story = {
  args: {
    id: '2',
    title: 'Smartwatch Titan Series',
    price: 99.99,
    originalPrice: 129.99,
    quantity: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300&h=300',
    variantDescription: 'Correa: Silicona • 44mm',
  },
};

export const Interactive = () => {
  const [qty, setQty] = useState(1);
  const [removed, setRemoved] = useState(false);

  if (removed) {
    return (
      <div className="text-center p-4">
        <p className="text-sm text-aurora-text-secondary">Producto eliminado ofl carrito.</p>
        <button
          type="button"
          onClick={() => setRemoved(false)}
          className="mt-2 text-xs font-semibold text-aurora-border-focus underline"
        >
          Deshacer
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '380px' }}>
      <CartItem
        id="3"
        title="Zapatillas Urban Runner Pro"
        price={85.0}
        quantity={qty}
        imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300"
        variantDescription="Talla: 42 • Color: Carmín"
        onQuantityChange={setQty}
        onRemove={() => setRemoved(true)}
      />
    </div>
  );
};
