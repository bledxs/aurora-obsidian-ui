import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Rating } from './Rating';

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 0.1 }, description: 'Rating score' },
    max: { control: 'number', description: 'Maximum star count' },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Star icon size',
    },
    showValue: { control: 'boolean', description: 'Show numeric score' },
    reviewCount: { control: 'number', description: 'Review count' },
    interactive: { control: 'boolean', description: 'Habilitar modo interactivo' },
    disabled: { control: 'boolean', description: 'Deshabilitar componente' },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Standard
export const Default: Story = {
  args: {
    value: 4.5,
  },
};

// 2. With Numeric Score and Review Count (for PDP & Product Cards)
export const ProductScore: Story = {
  args: {
    value: 4.8,
    showValue: true,
    reviewCount: 247,
  },
};

// 3. Sizes
export const Small: Story = {
  args: {
    value: 4,
    size: 'small',
    showValue: true,
    reviewCount: 42,
  },
};

export const Large: Story = {
  args: {
    value: 5,
    size: 'large',
    showValue: true,
    reviewCount: 1024,
  },
};

// 4. Interactive Mode (for customer review forms)
export const InteractiveForm = () => {
  const [score, setScore] = useState(4);

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-aurora-border bg-aurora-surface p-6 font-sans">
      <h4 className="font-semibold text-aurora-text-primary">How would you rate this product?</h4>
      <Rating value={score} size="large" interactive onChange={setScore} />
      <p className="text-xs text-aurora-text-secondary">
        Your rating: <strong className="text-aurora-text-primary">{score} out of 5 stars</strong>
      </p>
    </div>
  );
};
