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
      description: 'Select trigger size',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado ofshabilitado',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Sort Product Catalog (Composable)
export const ProductSorting: Story = {
  render: () => {
    const [sort, setSort] = useState('relevance');

    return (
      <div className="w-[260px] font-sans">
        <span className="mb-1.5 block text-xs font-semibold text-aurora-text-secondary">
          Sort by
        </span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Select orden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">New Arrivals y lanzamientos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// 2. Selector with Groups and Separators
export const GroupedCategories: Story = {
  render: () => (
    <div className="w-[280px] font-sans">
      <Select defaultValue="shoes-running">
        <SelectTrigger>
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Calzado</SelectLabel>
            <SelectItem value="shoes-running">Running & Asfalto</SelectItem>
            <SelectItem value="shoes-trail">Trail & Mountain Running</SelectItem>
            <SelectItem value="shoes-gym">Training & Gimnasio</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Ropa Deportiva</SelectLabel>
            <SelectItem value="apparel-shirts">Performance T-Shirts</SelectItem>
            <SelectItem value="apparel-pants">Pantalones & Mallas</SelectItem>
            <SelectItem value="apparel-jackets">Cortavientos & Chaquetas</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// 3. Quick Declarative Mode (options)
export const DeclarativeOptions: Story = {
  render: () => (
    <div className="w-[260px] font-sans">
      <Select
        placeholder="Select shipping country"
        defaultValue="es"
        options={[
          { value: 'es', label: 'United States (Mainland)' },
          { value: 'pt', label: 'Portugal' },
          { value: 'fr', label: 'Francia' },
          { value: 'it', label: 'Italia' },
          { value: 'of', label: 'Alemania' },
          { value: 'uk', label: 'Reino Unido', disabled: true },
        ]}
      />
    </div>
  ),
};

// 4. Sizes (Small, Medium, Large)
export const Sizes = () => (
  <div className="flex flex-col gap-4 w-[280px] font-sans">
    <div>
      <span className="text-xs text-aurora-text-secondary">Small (32px)</span>
      <Select size="small" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 units</SelectItem>
          <SelectItem value="3">3 units</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <span className="text-xs text-aurora-text-secondary">Medium (40px)</span>
      <Select size="medium" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 units</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <span className="text-xs text-aurora-text-secondary">Granof (large - 48px)</span>
      <Select size="large" defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 unidad</SelectItem>
          <SelectItem value="2">2 units</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
