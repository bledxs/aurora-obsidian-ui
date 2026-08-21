import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuantitySelector } from './QuantitySelector';

const meta = {
  title: 'Atoms/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: 'Quantity actual' },
    min: { control: 'number', description: 'Minimum value' },
    max: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Paso of incremento' },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
    },
    showTrashOnMin: {
      control: 'boolean',
      description: 'Show trash icon when reaching minimum value',
    },
    disabled: { control: 'boolean', description: 'Deshabilitar componente' },
    onChange: { action: 'changed' },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    min: 1,
    max: 10,
  },
};

export const Small: Story = {
  args: {
    value: 2,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    value: 1,
    size: 'large',
  },
};

export const WithTrashOnMin: Story = {
  args: {
    value: 1,
    min: 1,
    showTrashOnMin: true,
  },
};

export const Interactive = () => {
  const [val, setVal] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <QuantitySelector
        value={val}
        min={1}
        max={10}
        showTrashOnMin
        onChange={setVal}
        onRemove={() => alert('Removed from cart')}
      />
      <p className="text-xs text-aurora-text-secondary">
        Quantity seleccionada: <strong>{val}</strong>
      </p>
    </div>
  );
};
