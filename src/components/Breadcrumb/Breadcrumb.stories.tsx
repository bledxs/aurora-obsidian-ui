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
      description: 'Custom separator (e.g. "/", ">", "|" or JSX icon)',
    },
    items: {
      control: 'object',
      description: 'Item list to generate breadcrumbs automatically',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Declarative automatic usage with item array
export const SimpleWithItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/productos' },
      { label: 'Audio', href: '/productos/audio' },
      { label: 'Obsidian Pro Headphones' }, // No href = current page
    ],
  },
};

// 2. Uso con items y separador personalizado
export const SimpleWithCustomSeparator: Story = {
  args: {
    separator: <Slash className="h-3.5 w-3.5" />,
    items: [
      { label: 'Home', href: '/' },
      { label: 'Tienda', href: '/tienda' },
      { label: 'Shopping Cart' },
    ],
  },
};

// 3. Uso componible con JSX (para casos donof necesitas dropdowns, elipsis o enlaces especiales)
export const ComposableWithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ropa/calzado">Footwear</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Urban Footwear Black</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
