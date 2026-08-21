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

// 1. Menú of Acciones of Fila (E-Commerce Table Action Menu)
export const TableActionMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="small" aria-label="Open row options">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Eye size={14} className="text-aurora-text-secondary" />
          View Details
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download size={14} className="text-aurora-text-secondary" />
          Download Invoice
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy size={14} className="text-aurora-text-secondary" />
          Reorder
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <Trash2 size={14} />
          Cancel pedido
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// 2. Ordenación of Catálogo con Radio Items
export const SortCatalogMenu: Story = {
  render: () => {
    const [sort, setSort] = useState('relevance');

    const sortLabels: Record<string, string> = {
      relevance: 'Most Relevant',
      price_asc: 'Price: Low to High',
      price_desc: 'Price: High to Low',
      rating: 'Highest Rated',
      newest: 'New Arrivals',
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 text-xs">
            <ArrowDownAZ size={15} />
            Sort by: <strong className="text-aurora-primary">{sortLabels[sort]}</strong>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort Catalog</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="relevance">Most Relevant</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price_asc">Price: Low to High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price_desc">Price: High to Low</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">New Arrivals</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// 3. Filters Rápidos con Checkbox Items
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
            Filters rápidos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Availability</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={inStock} onCheckedChange={setInStock}>
            In Stock Only
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={onSale} onCheckedChange={setOnSale}>
            On Sale
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={freeShipping} onCheckedChange={setFreeShipping}>
            Shipping gratuito
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// 4. Menú of Usuario con Atajos of Teclado
export const UserAccountMenu: Story = {
  render: () => (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <User size={14} className="text-aurora-text-secondary" />
          My Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Package size={14} className="text-aurora-text-secondary" />
          My Orders
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard size={14} className="text-aurora-text-secondary" />
          Payment Methods
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings size={14} className="text-aurora-text-secondary" />
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <LogOut size={14} />
          Close sesión
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
