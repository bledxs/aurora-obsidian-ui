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
      description: 'Estilo visual de las pestañas',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Pestañas de Ficha de Producto (PDP - Underline)
export const ProductTabs: Story = {
  render: () => (
    <Tabs defaultValue="desc" variant="underline" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="desc">Descripción</TabsTrigger>
        <TabsTrigger value="specs">Especificaciones</TabsTrigger>
        <TabsTrigger value="reviews">Opiniones (42)</TabsTrigger>
      </TabsList>

      <TabsContent
        value="desc"
        className="space-y-2 text-sm text-aurora-text-secondary leading-relaxed"
      >
        <p>
          Las zapatillas Runner Nitro Pro han sido diseñadas para corredores que buscan
          amortiguación y retorno de energía sin sacrificar ligereza.
        </p>
        <p>
          La suela de goma con agarre multidireccional garantiza tracción óptima tanto en asfalto
          como en pista mojada.
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
            <span className="text-aurora-text-secondary">Tipo de pisada</span>
            <span className="font-medium text-aurora-text-primary">Neutra</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg bg-aurora-neutral-bg p-4">
          <div>
            <div className="text-3xl font-bold text-aurora-text-primary">4.8</div>
            <div className="text-xs text-aurora-text-secondary">de 5 estrellas</div>
          </div>
          <Rating value={4.8} size="large" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-semibold text-aurora-text-primary">
            Carlos M. - Hace 2 días
          </div>
          <p className="text-xs text-aurora-text-secondary">
            Excelente compra. Super cómodas desde la primera salida a correr. La talla calza
            perfecta.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// 2. Variante Pills (Para categorías o filtros)
export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="all" variant="pills" className="w-[450px]">
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="men">Hombre</TabsTrigger>
        <TabsTrigger value="women">Mujer</TabsTrigger>
        <TabsTrigger value="kids">Niños</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="text-sm text-aurora-text-secondary">
        Mostrando todos los productos del catálogo (1,240 artículos disponibles).
      </TabsContent>
      <TabsContent value="men" className="text-sm text-aurora-text-secondary">
        Sección de moda y calzado para hombre (480 artículos).
      </TabsContent>
      <TabsContent value="women" className="text-sm text-aurora-text-secondary">
        Sección de moda y calzado para mujer (620 artículos).
      </TabsContent>
      <TabsContent value="kids" className="text-sm text-aurora-text-secondary">
        Sección infantil y juvenil (140 artículos).
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
          label: 'Envíos',
          content: 'Envíos en 24/48h a toda la península. Gratis a partir de 50€.',
        },
        {
          value: 'returns',
          label: 'Devoluciones',
          content: 'Dispones de 30 días para realizar devoluciones gratuitas.',
        },
        {
          value: 'warranty',
          label: 'Garantía',
          content: '3 años de garantía oficial del fabricante.',
        },
      ]}
    />
  ),
};
