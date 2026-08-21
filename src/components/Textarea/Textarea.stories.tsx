import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Rating } from '../Rating';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Estado ofshabilitado',
    },
    isError: {
      control: 'boolean',
      description: 'Estado of error of validación',
    },
    showCount: {
      control: 'boolean',
      description: 'Show contador of caracteres',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-height adjustment while typing',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Delivery Instructions for Courier (Checkout)
export const DeliveryInstructions: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Delivery instructions"
        placeholder="e.g., Leave package at front ofsk or ring bell 4B..."
        helperText="Information visible only to the courier."
        showCount
        maxLength={200}
        rows={3}
      />
    </div>
  ),
};

// 2. Product Review with Auto-Resize and Rating
export const ProductReview: Story = {
  render: () => {
    const [rating, setRating] = useState(5);

    return (
      <div className="w-[420px] rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-5 font-sans space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-aurora-text-primary">
            Write a review for this product
          </h4>
          <div className="flex items-center gap-2">
            <Rating value={rating} onChange={setRating} />
            <span className="text-xs font-semibold text-aurora-text-secondary">
              {rating === 5 ? 'Excellent!' : `${rating} out of 5 stars`}
            </span>
          </div>
        </div>

        <Textarea
          label="Your experience"
          placeholder="How was the quality, fabric, and sizing of the item?"
          helperText="Minimum 20 characters to submit review."
          autoResize
          showCount
          maxLength={500}
          rows={3}
        />
      </div>
    );
  },
};

// 3. Error of Validación
export const WithValidationError: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Return reason"
        defaultValue="No me gusta"
        errorMessage="Please describe your return reason in greater detail (min. 20 chars)."
        showCount
        maxLength={300}
        rows={3}
      />
    </div>
  ),
};

// 4. Disabled
export const Disabled: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Order Notes (Closed)"
        defaultValue="Delivered successfully at reception on 08/21/2026."
        disabled
        rows={2}
      />
    </div>
  ),
};
