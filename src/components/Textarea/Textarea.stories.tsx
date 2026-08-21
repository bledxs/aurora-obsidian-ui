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
      description: 'Estado deshabilitado',
    },
    isError: {
      control: 'boolean',
      description: 'Estado de error de validación',
    },
    showCount: {
      control: 'boolean',
      description: 'Mostrar contador de caracteres',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-ajuste de altura al escribir',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Instrucciones de Entrega para el Transportista (E-Commerce Checkout)
export const DeliveryInstructions: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Instrucciones para la entrega"
        placeholder="Ej. Dejar el paquete en conserjería o llamar al telefonillo 4º B..."
        helperText="Información visible únicamente para el transportista."
        showCount
        maxLength={200}
        rows={3}
      />
    </div>
  ),
};

// 2. Reseña de Producto con Auto-Resize y Valoración
export const ProductReview: Story = {
  render: () => {
    const [rating, setRating] = useState(5);

    return (
      <div className="w-[420px] rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-5 font-sans space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-aurora-text-primary">
            Escribe tu opinión sobre el producto
          </h4>
          <div className="flex items-center gap-2">
            <Rating value={rating} onChange={setRating} />
            <span className="text-xs font-semibold text-aurora-text-secondary">
              {rating === 5 ? '¡Excelente!' : `${rating} de 5 estrellas`}
            </span>
          </div>
        </div>

        <Textarea
          label="Tu experiencia"
          placeholder="¿Qué te ha parecido la calidad, el tejido y el tallaje del producto?"
          helperText="Mínimo 20 caracteres para publicar la reseña."
          autoResize
          showCount
          maxLength={500}
          rows={3}
        />
      </div>
    );
  },
};

// 3. Error de Validación
export const WithValidationError: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Motivo de la devolución"
        defaultValue="No me gusta"
        errorMessage="Por favor, describe con mayor detalle el motivo de la devolución (mínimo 20 caracteres)."
        showCount
        maxLength={300}
        rows={3}
      />
    </div>
  ),
};

// 4. Deshabilitado
export const Disabled: Story = {
  render: () => (
    <div className="w-[380px] font-sans">
      <Textarea
        label="Comentarios del pedido (Cerrado)"
        defaultValue="Entrega realizada con éxito en portería el 21/08/2026."
        disabled
        rows={2}
      />
    </div>
  ),
};
