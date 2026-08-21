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
    title: { control: 'text', description: 'Product title' },
    price: { control: 'number', description: 'Unit price' },
    originalPrice: { control: 'number', description: 'Previous unit price' },
    quantity: { control: 'number', description: 'Selected quantity' },
    variantTitle: { control: 'text', description: 'Variant label / title' },
    isLoading: { control: 'boolean', description: 'Interaction lock' },
    onQuantityChange: { action: 'quantityChanged' },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Wireless Headphones Obsidian Pro',
    price: 129.99,
    quantity: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300',
    variantTitle: 'Color: Obsidian Black',
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
    variantTitle: 'Strap: Silicone • 44mm',
  },
};

export const Interactive = () => {
  const [qty, setQty] = useState(1);
  const [removed, setRemoved] = useState(false);

  if (removed) {
    return (
      <div className="text-center p-4">
        <p className="text-sm text-aurora-text-secondary">Product removed from cart.</p>
        <button
          type="button"
          onClick={() => setRemoved(false)}
          className="mt-2 text-xs font-semibold text-aurora-border-focus underline"
        >
          Undo
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '380px' }}>
      <CartItem
        id="3"
        title="Urban Runner Pro Sneakers"
        price={85.0}
        quantity={qty}
        imageSrc="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300"
        variantTitle="Size: 42 • Color: Crimson Red"
        onQuantityChange={setQty}
        onRemove={() => setRemoved(true)}
      />
    </div>
  );
};
