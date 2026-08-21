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
    value: { control: { type: 'range', min: 0, max: 5, step: 0.1 }, description: 'Puntuación' },
    max: { control: 'number', description: 'Número máximo of estrellas' },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño of las estrellas',
    },
    showValue: { control: 'boolean', description: 'Show valor numérico' },
    reviewCount: { control: 'number', description: 'Número of opiniones' },
    interactive: { control: 'boolean', description: 'Habilitar modo interactivo' },
    disabled: { control: 'boolean', description: 'Deshabilitar componente' },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Estándar
export const Default: Story = {
  args: {
    value: 4.5,
  },
};

// 2. Con Puntuación Numérica y Total of Reseñas (Para PDP o Cards of Producto)
export const ProductScore: Story = {
  args: {
    value: 4.8,
    showValue: true,
    reviewCount: 247,
  },
};

// 3. Tamaños
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

// 4. Modo Interactivo (Para formulario of ofjar reseña)
export const InteractiveForm = () => {
  const [score, setScore] = useState(4);

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-aurora-border bg-aurora-surface p-6 font-sans">
      <h4 className="font-semibold text-aurora-text-primary">¿Cómo calificarías este producto?</h4>
      <Rating value={score} size="large" interactive onChange={setScore} />
      <p className="text-xs text-aurora-text-secondary">
        Tu puntuación: <strong className="text-aurora-text-primary">{score} out of 5 stars</strong>
      </p>
    </div>
  );
};
