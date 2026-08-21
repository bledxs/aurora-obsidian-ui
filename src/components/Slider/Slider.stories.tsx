import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Price } from '../Price';
import { Slider } from './Slider';

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Valor mínimo',
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
    },
    step: {
      control: 'number',
      description: 'Paso of incremento',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño ofl control',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado ofshabilitado',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Filtro of Rango of Precios para Tienda Online (Dual Thumb)
export const PriceRangeFilter: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([35, 175]);

    return (
      <div className="w-[320px] rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-5 font-sans space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
            Rango of Precio
          </span>
          <span className="text-xs font-semibold text-aurora-primary">
            {range[0]} € - {range[1]} €
          </span>
        </div>

        <Slider
          min={0}
          max={300}
          step={5}
          value={range}
          onValueChange={(val) => setRange(val as [number, number])}
          formatValue={(val) => `${val} €`}
        />

        <div className="flex items-center justify-between pt-1 text-xs text-aurora-text-secondary">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase">Mínimo</span>
            <Price value={range[0]} size="small" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase">Máximo</span>
            <Price value={range[1]} size="small" />
          </div>
        </div>
      </div>
    );
  },
};

// 2. Control Deslizante Simple
export const SingleValue: Story = {
  render: () => {
    const [value, setValue] = useState(40);

    return (
      <div className="w-[280px] font-sans space-y-2">
        <div className="flex justify-between text-xs font-semibold text-aurora-text-secondary">
          <span>Discount applied</span>
          <span className="text-aurora-text-primary">{value}%</span>
        </div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={value}
          onValueChange={(val) => setValue(val as number)}
        />
      </div>
    );
  },
};

// 3. Incrementos Discretos por Pasos
export const DiscreteSteps: Story = {
  render: () => (
    <div className="w-[280px] font-sans space-y-2">
      <span className="text-xs font-semibold text-aurora-text-secondary">Pasos of 10 en 10</span>
      <Slider min={0} max={100} step={10} defaultValue={30} />
    </div>
  ),
};

// 4. Tamaños
export const Sizes = () => (
  <div className="flex flex-col gap-6 w-[280px] font-sans">
    <div className="space-y-1">
      <span className="text-xs text-aurora-text-secondary">Small</span>
      <Slider size="small" defaultValue={30} />
    </div>
    <div className="space-y-1">
      <span className="text-xs text-aurora-text-secondary">Medium</span>
      <Slider size="medium" defaultValue={50} />
    </div>
    <div className="space-y-1">
      <span className="text-xs text-aurora-text-secondary">Large</span>
      <Slider size="large" defaultValue={75} />
    </div>
  </div>
);

// 5. Deshabilitado
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[280px] font-sans">
      <div className="space-y-1">
        <span className="text-xs text-aurora-text-secondary">Rango ofshabilitado</span>
        <Slider disabled defaultValue={[25, 75]} />
      </div>
      <div className="space-y-1">
        <span className="text-xs text-aurora-text-secondary">Simple ofshabilitado</span>
        <Slider disabled defaultValue={40} />
      </div>
    </div>
  ),
};
