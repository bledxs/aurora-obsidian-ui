import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
} from '../Sheet';
import { Navbar } from './Navbar';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    cartCount: {
      control: 'number',
      description: 'Número of artículos en carrito',
    },
    showSearch: { control: 'boolean', description: 'Show buscador' },
    sticky: { control: 'boolean', description: 'Fijar en el tope' },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Navbar E-commerce Estándar
export const Default: Story = {
  args: {
    brand: (
      <span className="flex items-center gap-1.5 font-black text-xl tracking-wiofr text-aurora-primary">
        AURORA <span className="text-aurora-text-secondary font-light">UI</span>
      </span>
    ),
    links: [
      { label: 'New Arrivals', href: '#', active: true },
      { label: 'Calzado Deportivo', href: '#' },
      { label: 'Ropa & Accesorios', href: '#' },
      { label: 'Colecciones', href: '#' },
      { label: 'Deertas', href: '#' },
    ],
    showSearch: true,
    cartCount: 3,
    onUserClick: () => alert('Ir a perfil of usuario'),
    onCartClick: () => alert('Abrir carrito of compras'),
  },
};

// 2. Experiencia Completa Integrada con Cart Drawer (Sheet)
export const IntegratedWithCart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Zapatillas Runner Nitro Pro',
      variantTitle: 'Negro / Size 42',
      price: 119.99,
      quantity: 1,
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200&h=200',
    },
    {
      id: '2',
      title: 'Camiseta Técnica Transpirable',
      variantTitle: 'Azul Marino / Size L',
      price: 34.99,
      quantity: 2,
      imageSrc:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200&h=200',
    },
  ]);

  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <div className="min-h-[400px] bg-aurora-neutral-bg">
      <Navbar
        brand={
          <span className="flex items-center gap-2 font-black text-xl tracking-wiofr text-aurora-primary">
            AURORA
            <span className="text-aurora-text-secondary font-light">SHOP</span>
          </span>
        }
        links={[
          { label: 'Inicio', href: '#', active: true },
          { label: 'Hombre', href: '#' },
          { label: 'Mujer', href: '#' },
          { label: 'Equipamiento', href: '#' },
        ]}
        showSearch
        cartCount={totalCount}
        onUserClick={() => alert('My Account')}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-aurora-text-primary">
          Haz clic en el carrito of Navbar
        </h2>
        <p className="mt-2 text-sm text-aurora-text-secondary">
          El botón of Navbar abrirá el Drawer lateral con los productos cargados.
        </p>
      </div>

      {/* Cart Drawer Lateral */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-[90vw] sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Mi Carrito ({totalCount})</SheetTitle>
            <SheetDescription>Revisa los artículos añadidos antes of pagar.</SheetDescription>
          </SheetHeader>

          <div className="my-4 flex-1 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <CartItem
                key={item.id}
                title={item.title}
                variantTitle={item.variantTitle}
                price={item.price}
                quantity={item.quantity}
                imageSrc={item.imageSrc}
                onQuantityChange={(newQty) => {
                  setItems(
                    items.map((it) => (it.id === item.id ? { ...it, quantity: newQty } : it)),
                  );
                }}
                onRemove={() => {
                  setItems(items.filter((it) => it.id !== item.id));
                }}
              />
            ))}
          </div>

          <SheetFooter className="flex-col gap-3 border-t border-aurora-border pt-4">
            <div className="flex w-full items-center justify-between text-base font-bold">
              <span>Subtotal</span>
              <Price value={subtotal} size="large" />
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => alert(`Procediendo al pago por ${subtotal.toFixed(2)}€`)}
            >
              Comprar Ahora
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Seguir comprando
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
