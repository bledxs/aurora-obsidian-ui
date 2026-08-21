import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../Button';
import { Price } from '../Price';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

const meta = {
  title: 'Molecules/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Ejemplo principal: Carrito de compras lateral (Cart Drawer)
export const CartDrawer: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Ver Carrito (2)
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Tu Carrito de Compras</SheetTitle>
          <SheetDescription>
            Revisa los artículos añadidos antes de proceder al pago.
          </SheetDescription>
        </SheetHeader>

        {/* Lista de productos en el carrito */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
          <div className="flex items-center justify-between border-b border-aurora-border pb-3">
            <div>
              <p className="font-semibold text-aurora-text-primary">Auriculares Obsidian Pro</p>
              <p className="text-xs text-aurora-text-secondary">Cantidad: 1</p>
            </div>
            <Price value={129.99} size="small" />
          </div>

          <div className="flex items-center justify-between border-b border-aurora-border pb-3">
            <div>
              <p className="font-semibold text-aurora-text-primary">Smartwatch Titan Series</p>
              <p className="text-xs text-aurora-text-secondary">Cantidad: 1</p>
            </div>
            <Price value={99.99} size="small" />
          </div>
        </div>

        {/* Resumen y Checkout */}
        <SheetFooter className="mt-auto flex flex-col gap-3 border-t border-aurora-border pt-4">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-aurora-text-primary">Total:</span>
            <Price value={229.98} size="medium" />
          </div>
          <Button variant="primary" className="w-full">
            Proceder al Pago
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Continuar Comprando
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// 2. Ejemplo menú lateral de navegación (Left Side)
export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir Menú</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Categorías</SheetTitle>
          <SheetDescription>Navega por nuestra tienda</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-2 py-4">
          <a
            href="#electronica"
            className="rounded-sm p-2 font-medium hover:bg-aurora-surface-hover"
          >
            Electrónica & Audio
          </a>
          <a href="#relojes" className="rounded-sm p-2 font-medium hover:bg-aurora-surface-hover">
            Relojes Inteligentes
          </a>
          <a href="#calzado" className="rounded-sm p-2 font-medium hover:bg-aurora-surface-hover">
            Calzado Deportivo
          </a>
          <a
            href="#ofertas"
            className="rounded-sm p-2 font-medium text-aurora-error hover:bg-aurora-surface-hover"
          >
            Ofertas Flash
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

// 3. Ejemplo Bottom Sheet (Mobile)
export const BottomSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Filtros de Búsqueda</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filtrar Productos</SheetTitle>
          <SheetDescription>Ajusta el rango de precio y marcas</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-aurora-text-secondary">
            Aquí van los selectores de filtros y sliders de precio.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="primary">Aplicar Filtros</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
