import type { Meta, StoryObj } from '@storybook/react';
import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description:
        'Separador personalizado (escribe caracteres como "/", ">", "|" o pasa iconos JSX en código)',
    },
    items: {
      control: 'object',
      description: 'Lista de elementos para generar el breadcrumb automáticamente',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Uso declarativo y automático con un array de items (¡Cero boilerplate!)
export const SimpleWithItems: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Audio', href: '/productos/audio' },
      { label: 'Auriculares Obsidian Pro' }, // Sin href = página actual
    ],
  },
};

// 2. Uso con items y separador personalizado
export const SimpleWithCustomSeparator: Story = {
  args: {
    separator: <Slash className="h-3.5 w-3.5" />,
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Tienda', href: '/tienda' },
      { label: 'Carrito de Compras' },
    ],
  },
};

// 3. Uso componible con JSX (para casos donde necesitas dropdowns, elipsis o enlaces especiales)
export const ComposableWithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ropa/calzado">Calzado</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Zapatillas Urban Black</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
