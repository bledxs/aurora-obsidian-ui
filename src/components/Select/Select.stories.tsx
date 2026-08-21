import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del disparador del selector',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Ordenar Catálogo de Productos (Composable)
export const ProductSorting: Story = {
  render: () => {
    const [sort, setSort] = useState('relevance');

    return (
      <div className="w-[260px] font-sans">
        <span className="mb-1.5 block text-xs font-semibold text-aurora-text-secondary">
          Ordenar por
        </span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Más relevantes</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
            <SelectItem value="rating">Mejor valorados</SelectItem>
            <SelectItem value="newest">Novedades y lanzamientos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// 2. Selector con Grupos y Separadores
export const GroupedCategories: Story = {
  render: () => (
    <div className="w-[280px] font-sans">
      <Select defaultValue="shoes-running">
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Calzado</SelectLabel>
            <SelectItem value="shoes-running">Running & Asfalto</SelectItem>
            <SelectItem value="shoes-trail">Trail & Montaña</SelectItem>
            <SelectItem value="shoes-gym">Training & Gimnasio</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Ropa Deportiva</SelectLabel>
            <SelectItem value="apparel-shirts">Camisetas Técnicas</SelectItem>
            <SelectItem value="apparel-pants">Pantalones & Mallas</SelectItem>
            <SelectItem value="apparel-jackets">Cortavientos & Chaquetas</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// 3. Modo Declarativo Rápido (options)
export const DeclarativeOptions: Story = {
  render: () => (
    <div className="w-[260px] font-sans">
      <Select
        placeholder="Seleccionar país de envío"
        defaultValue="es"
        options={[
          { value: 'es', label: 'España (Península)' },
          { value: 'pt', label: 'Portugal' },
          { value: 'fr', label: 'Francia' },
          { value: 'it', label: 'Italia' },
          { value: 'de', label: 'Alemania' },
          { value: 'uk', label: 'Reino Unido', disabled: true },
        ]}
      />
    </div>
  ),
};

// 4. Tamaños (Small, Medium, Large)
export const Sizes = () => (
  <div className="flex flex-col gap-4 w-[280px] font-sans">
    <div>
      <span className="text-xs text-aurora-text-secondary">Pequeño (small - 32px)</span>
      <Select size="small" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 unidades</SelectItem>
          <SelectItem value="3">3 unidades</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <span className="text-xs text-aurora-text-secondary">Mediano (medium - 40px)</span>
      <Select size="medium" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 unidades</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <span className="text-xs text-aurora-text-secondary">Grande (large - 48px)</span>
      <Select size="large" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 unidades</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
