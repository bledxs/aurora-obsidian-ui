import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Price } from '../Price';
import { QuantitySelector } from '../QuantitySelector';
import { SkuSelector } from './SkuSelector';

const meta = {
  title: 'Molecules/SkuSelector',
  component: SkuSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del componente',
    },
    error: { control: 'text', description: 'Mensaje de error' },
  },
} satisfies Meta<typeof SkuSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Selector Simple de Tallas
export const SingleAttributePill: Story = {
  args: {
    label: 'Talla',
    variantType: 'pill',
    defaultValue: 'm',
    options: [
      { id: 'xs', label: 'XS', value: 'xs' },
      { id: 's', label: 'S', value: 's' },
      { id: 'm', label: 'M', value: 'm' },
      { id: 'l', label: 'L', value: 'l' },
      { id: 'xl', label: 'XL', value: 'xl', disabled: true },
    ],
  },
};

// 2. Selector Simple de Colores
export const SingleAttributeColor: Story = {
  args: {
    label: 'Color',
    variantType: 'color',
    defaultValue: 'obsidian',
    options: [
      { id: 'c1', label: 'Obsidian Black', value: 'obsidian', color: '#0f172a' },
      { id: 'c2', label: 'Pure White', value: 'white', color: '#ffffff' },
      { id: 'c3', label: 'Navy Blue', value: 'navy', color: '#1e3a8a' },
      { id: 'c4', label: 'Emerald Green', value: 'emerald', color: '#059669', disabled: true },
    ],
  },
};

// 3. MODO UNIFICADO TODO-EN-UNO: Cero Boilerplate, Matriz de Stock Automática
export const UnifiedProductCustomizer = () => {
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string | number;
    sku?: string;
    price?: number;
  } | null>({ id: '1', sku: 'RUNNER-OBS-S', price: 119.99 });
  const [isAvailable, setIsAvailable] = useState(true);
  const [qty, setQty] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  // 1. Atributos del producto
  const attributes = [
    {
      name: 'Color',
      type: 'color' as const,
      options: [
        { label: 'Negro Obsidiana', value: 'obsidian', color: '#0f172a' },
        { label: 'Blanco Nieve', value: 'white', color: '#ffffff' },
        { label: 'Azul Espacial', value: 'blue', color: '#1d4ed8' },
      ],
    },
    {
      name: 'Talla',
      type: 'pill' as const,
      options: [
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
        { label: 'XL', value: 'xl' },
      ],
    },
  ];

  // 2. Matriz de variantes y stock (directo de la base de datos o API)
  const variants = [
    // Negro
    {
      id: '1',
      sku: 'RUNNER-OBS-S',
      price: 119.99,
      attributes: { Color: 'obsidian', Talla: 's' },
      inStock: true,
    },
    {
      id: '2',
      sku: 'RUNNER-OBS-M',
      price: 119.99,
      attributes: { Color: 'obsidian', Talla: 'm' },
      inStock: false, // Agotado en Negro
    },
    {
      id: '3',
      sku: 'RUNNER-OBS-L',
      price: 119.99,
      attributes: { Color: 'obsidian', Talla: 'l' },
      inStock: true,
    },
    {
      id: '4',
      sku: 'RUNNER-OBS-XL',
      price: 119.99,
      attributes: { Color: 'obsidian', Talla: 'xl' },
      inStock: false, // Agotado en Negro
    },

    // Blanco
    {
      id: '5',
      sku: 'RUNNER-WHI-S',
      price: 119.99,
      attributes: { Color: 'white', Talla: 's' },
      inStock: false, // Agotado en Blanco
    },
    {
      id: '6',
      sku: 'RUNNER-WHI-M',
      price: 119.99,
      attributes: { Color: 'white', Talla: 'm' },
      inStock: true,
    },
    {
      id: '7',
      sku: 'RUNNER-WHI-L',
      price: 119.99,
      attributes: { Color: 'white', Talla: 'l' },
      inStock: false, // Agotado en Blanco
    },
    {
      id: '8',
      sku: 'RUNNER-WHI-XL',
      price: 119.99,
      attributes: { Color: 'white', Talla: 'xl' },
      inStock: true,
    },

    // Azul
    {
      id: '9',
      sku: 'RUNNER-BLU-S',
      price: 129.99,
      attributes: { Color: 'blue', Talla: 's' },
      inStock: true,
    },
    {
      id: '10',
      sku: 'RUNNER-BLU-M',
      price: 129.99,
      attributes: { Color: 'blue', Talla: 'm' },
      inStock: true,
    },
    {
      id: '11',
      sku: 'RUNNER-BLU-L',
      price: 129.99,
      attributes: { Color: 'blue', Talla: 'l' },
      inStock: true,
    },
    {
      id: '12',
      sku: 'RUNNER-BLU-XL',
      price: 129.99,
      attributes: { Color: 'blue', Talla: 'xl' },
      inStock: false,
    },
  ];

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;
    setNotification(
      `Añadido al carrito: SKU "${selectedVariant.sku}" (${qty} un.) por ${(
        (selectedVariant.price ?? 119.99) * qty
      ).toFixed(2)} €`,
    );
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="flex w-100 flex-col gap-6 rounded-lg border border-aurora-border bg-aurora-surface p-6 shadow-sm font-sans">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-xs bg-aurora-primary-bg px-2 py-0.5 text-[11px] font-bold text-aurora-primary">
            AUTOMÁTICO
          </span>
          {selectedVariant?.sku && (
            <span className="text-xs text-aurora-text-secondary font-mono">
              SKU: {selectedVariant.sku}
            </span>
          )}
        </div>
        <h3 className="mt-1 text-xl font-bold text-aurora-text-primary">
          Zapatillas Runner Nitro Pro
        </h3>
        <p className="text-xs text-aurora-text-secondary">
          Un solo componente gestiona todas las opciones y calcula el stock cruzado.
        </p>
        <div className="mt-2">
          <Price value={selectedVariant?.price ?? 119.99} size="medium" />
        </div>
      </div>

      {/* UN SOLO COMPONENTE PARA TODO */}
      <SkuSelector
        attributes={attributes}
        variants={variants}
        onSelectionChange={(res) => {
          setSelectedVariant(res.selectedVariant || null);
          setIsAvailable(res.isAvailable);
        }}
      />

      <div className="flex items-center gap-3 pt-2">
        <QuantitySelector
          value={qty}
          min={1}
          max={10}
          onChange={setQty}
          disabled={!isAvailable}
          size="medium"
        />
        <Button
          variant={!isAvailable ? 'outline' : 'primary'}
          disabled={!isAvailable}
          className="flex-1"
          onClick={handleAddToCart}
        >
          {!isAvailable ? 'Sin Existencias' : `Añadir al Carrito (${qty})`}
        </Button>
      </div>

      {notification && (
        <div className="rounded-md border border-aurora-success/30 bg-aurora-success-bg p-3 text-xs text-aurora-text-primary animate-fade-in">
          <p className="font-bold text-aurora-success">✅ ¡Añadido con éxito!</p>
          <p className="mt-0.5">{notification}</p>
        </div>
      )}
    </div>
  );
};
