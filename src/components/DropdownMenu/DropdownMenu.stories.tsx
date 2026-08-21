import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowDownAZ,
  Copy,
  CreditCard,
  Download,
  Eye,
  Filter,
  LogOut,
  MoreHorizontal,
  Package,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Menú de Acciones de Fila (E-Commerce Table Action Menu)
export const TableActionMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="small" aria-label="Abrir opciones de fila">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Acciones de Pedido</DropdownMenuLabel>
        <DropdownMenuItem>
          <Eye size={14} className="text-aurora-text-secondary" />
          Ver detalles
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download size={14} className="text-aurora-text-secondary" />
          Descargar factura
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy size={14} className="text-aurora-text-secondary" />
          Repetir pedido
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <Trash2 size={14} />
          Cancelar pedido
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// 2. Ordenación de Catálogo con Radio Items
export const SortCatalogMenu: Story = {
  render: () => {
    const [sort, setSort] = useState('relevance');

    const sortLabels: Record<string, string> = {
      relevance: 'Más relevantes',
      price_asc: 'Precio: Menor a Mayor',
      price_desc: 'Precio: Mayor a Menor',
      rating: 'Mejor valorados',
      newest: 'Novedades',
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 text-xs">
            <ArrowDownAZ size={15} />
            Ordenar por: <strong className="text-aurora-primary">{sortLabels[sort]}</strong>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Ordenar catálogo</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="relevance">Más relevantes</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price_asc">Precio: Menor a Mayor</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price_desc">Precio: Mayor a Menor</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Mejor valorados</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">Novedades</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// 3. Filtros Rápidos con Checkbox Items
export const FilterCheckboxMenu: Story = {
  render: () => {
    const [inStock, setInStock] = useState(true);
    const [onSale, setOnSale] = useState(false);
    const [freeShipping, setFreeShipping] = useState(true);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 text-xs">
            <Filter size={15} />
            Filtros rápidos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Disponibilidad</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={inStock} onCheckedChange={setInStock}>
            Solo en stock
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={onSale} onCheckedChange={setOnSale}>
            En oferta
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={freeShipping} onCheckedChange={setFreeShipping}>
            Envío gratuito
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// 4. Menú de Usuario con Atajos de Teclado
export const UserAccountMenu: Story = {
  render: () => (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menú de usuario"
          className="rounded-full ring-2 ring-transparent hover:ring-aurora-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus transition-all"
        >
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Sara Connor"
            size="md"
            status="online"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuItem>
          <User size={14} className="text-aurora-text-secondary" />
          Mi perfil
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Package size={14} className="text-aurora-text-secondary" />
          Mis pedidos
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard size={14} className="text-aurora-text-secondary" />
          Métodos de pago
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings size={14} className="text-aurora-text-secondary" />
          Configuración
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <LogOut size={14} />
          Cerrar sesión
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
