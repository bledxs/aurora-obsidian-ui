import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../Button';
import { CartItem } from '../CartItem';
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

// 1. Main Example: Shopping Cart Drawer
export const CartDrawer: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          View Cart (2)
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Tu Shopping Cart</SheetTitle>
          <SheetDescription>Review added items before proceeding to checkout.</SheetDescription>
        </SheetHeader>

        {/* Cart item list */}
        <div className="flex flex-1 flex-col overflow-y-auto py-2">
          <CartItem
            id="1"
            title="Obsidian Pro Headphones"
            price={129.99}
            quantity={1}
            imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300"
            variantDescription="Color: Obsidian Black"
          />

          <CartItem
            id="2"
            title="Smartwatch Titan Series"
            price={99.99}
            originalPrice={129.99}
            quantity={1}
            imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300&h=300"
            variantDescription="Correa: Silicona • 44mm"
          />
        </div>

        {/* Resumen y Checkout */}
        <SheetFooter className="mt-auto flex flex-col gap-3 border-t border-aurora-border pt-4">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-aurora-text-primary">Total:</span>
            <Price value={229.98} size="medium" />
          </div>
          <Button variant="primary" className="w-full">
            Proceed to Checkout
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

// 2. Navigation Side Drawer (Left)
export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
          <SheetDescription>Browse our product collections</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-2 py-4">
          <a
            href="#electronica"
            className="rounded-sm p-2 font-medium hover:bg-aurora-surface-hover"
          >
            Electronics & Audio
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
            Deertas Flash
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

// 3. Bottom Sheet Mobile Example
export const BottomSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Filters of Search</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>Refine price range, sizing, and brands</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-aurora-text-secondary">
            Filter selectors and price sliders go here.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="primary">Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
