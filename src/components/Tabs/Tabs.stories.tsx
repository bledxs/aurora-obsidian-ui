import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../Rating';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underline', 'pills'],
      description: 'Visual style of tabs',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Product Detail Page Tabs (PDP - Underline)
export const ProductTabs: Story = {
  render: () => (
    <Tabs defaultValue="desc" variant="underline" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="desc">Description</TabsTrigger>
        <TabsTrigger value="specs">Especificaciones</TabsTrigger>
        <TabsTrigger value="reviews">Opiniones (42)</TabsTrigger>
      </TabsList>

      <TabsContent
        value="desc"
        className="space-y-2 text-sm text-aurora-text-secondary leading-relaxed"
      >
        <p>
          The Runner Nitro Pro running shoes are engineered for runners seeking maximum cushioning
          and energy return without sacrificing lightweight agility.
        </p>
        <p>
          The multidirectional rubber outsole provides optimal grip on both asphalt and wet tracks.
        </p>
      </TabsContent>

      <TabsContent value="specs" className="text-sm">
        <div className="divide-y divide-aurora-border">
          <div className="flex justify-between py-2">
            <span className="text-aurora-text-secondary">Peso</span>
            <span className="font-medium text-aurora-text-primary">245 gramos</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-aurora-text-secondary">Drop</span>
            <span className="font-medium text-aurora-text-primary">8 mm</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-aurora-text-secondary">Tipo of pisada</span>
            <span className="font-medium text-aurora-text-primary">Neutra</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg bg-aurora-neutral-bg p-4">
          <div>
            <div className="text-3xl font-bold text-aurora-text-primary">4.8</div>
            <div className="text-xs text-aurora-text-secondary">out of 5 stars</div>
          </div>
          <Rating value={4.8} size="large" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-semibold text-aurora-text-primary">
            Carlos M. - Hace 2 días
          </div>
          <p className="text-xs text-aurora-text-secondary">
            Excellent purchase. Super comfortable from the first run. Fits true to size. perfecta.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// 2. Pills Variant (For categories or catalog filters)
export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="all" variant="pills" className="w-[450px]">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="men">Hombre</TabsTrigger>
        <TabsTrigger value="women">Mujer</TabsTrigger>
        <TabsTrigger value="kids">Niños</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="text-sm text-aurora-text-secondary">
        Showing all catalog items (1,240 products available).
      </TabsContent>
      <TabsContent value="men" className="text-sm text-aurora-text-secondary">
        Men's fashion and footwear collection (480 products).
      </TabsContent>
      <TabsContent value="women" className="text-sm text-aurora-text-secondary">
        Women's fashion and footwear collection (620 products).
      </TabsContent>
      <TabsContent value="kids" className="text-sm text-aurora-text-secondary">
        Kids & Teens clothing collection (140 products).
      </TabsContent>
    </Tabs>
  ),
};

// 3. Modo Declarativo Rápido (items)
export const DeclarativeItems: Story = {
  render: () => (
    <Tabs
      variant="underline"
      className="w-[420px]"
      items={[
        {
          value: 'shipping',
          label: 'Shippings',
          content: 'Standard delivery in 24-48 hours. Free shipping on orders over $50.',
        },
        {
          value: 'returns',
          label: 'Returns',
          content: 'Dispones of 30 días para realizar devoluciones gratuitas.',
        },
        {
          value: 'warranty',
          label: 'Garantía',
          content: '3 años of garantía oficial of fabricante.',
        },
      ]}
    />
  ),
};
