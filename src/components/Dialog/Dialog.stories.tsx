import type { Meta, StoryObj } from '@storybook/react';
import { Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';
import { Image } from '../Image';
import { Input } from '../Input';
import { Price } from '../Price';
import { QuantitySelector } from '../QuantitySelector';
import { SkuSelector } from '../SkuSelector';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const meta = {
  title: 'Molecules/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Modal de Confirmación Básico
export const ConfirmationModal: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger" className="gap-2">
          <Trash2 size={16} /> Vaciar Carrito
        </Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>¿Vaciar el carrito?</DialogTitle>
          <DialogDescription>
            Esta acción eliminará todos los artículos que tienes guardados en tu carrito de compras.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Sí, vaciar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// 2. Modal de Formulario / Newsletter
export const NewsletterModal: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Suscribirse al Newsletter</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Únete al Club Aurora</DialogTitle>
          <DialogDescription>
            Recibe un 15% de descuento en tu primera compra y acceso exclusivo a nuevos
            lanzamientos.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <Input label="Correo electrónico" placeholder="ejemplo@correo.com" type="email" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Más tarde</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary">Obtener Descuento</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// 3. VISTA RÁPIDA DE PRODUCTO (Quick View de E-commerce)
export const ProductQuickView = () => {
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string | number;
    sku?: string;
    price?: number;
  } | null>({ id: '1', sku: 'RUNNER-OBS-S', price: 119.99 });
  const [isAvailable, setIsAvailable] = useState(true);
  const [qty, setQty] = useState(1);

  const attributes = [
    {
      name: 'Color',
      type: 'color' as const,
      options: [
        { label: 'Negro Obsidiana', value: 'obsidian', color: '#0f172a' },
        { label: 'Blanco Nieve', value: 'white', color: '#ffffff' },
      ],
    },
    {
      name: 'Talla',
      type: 'pill' as const,
      options: [
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
      ],
    },
  ];

  const variants = [
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
      inStock: false,
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
      sku: 'RUNNER-WHI-S',
      price: 119.99,
      attributes: { Color: 'white', Talla: 's' },
      inStock: false,
    },
    {
      id: '5',
      sku: 'RUNNER-WHI-M',
      price: 119.99,
      attributes: { Color: 'white', Talla: 'm' },
      inStock: true,
    },
    {
      id: '6',
      sku: 'RUNNER-WHI-L',
      price: 119.99,
      attributes: { Color: 'white', Talla: 'l' },
      inStock: true,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Eye size={16} /> Vista Rápida
        </Button>
      </DialogTrigger>
      <DialogContent size="2xl" className="p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Imagen de producto */}
          <div className="relative bg-aurora-neutral-bg h-64 sm:h-auto sm:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&h=800"
              alt="Zapatillas Runner Nitro Pro"
              aspectRatio="1/1"
              objectFit="cover"
              className="h-full w-full"
            />
          </div>

          {/* Información y Selectores */}
          <div className="flex flex-col justify-between p-6 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
                Calzado Deportivo
              </span>
              <DialogTitle className="text-2xl mt-1">Zapatillas Runner Nitro Pro</DialogTitle>
              <div className="mt-2">
                <Price
                  value={selectedVariant?.price ?? 119.99}
                  originalValue={149.99}
                  showDiscountBadge
                  size="large"
                />
              </div>
              <DialogDescription className="mt-3">
                Amortiguación reactiva con espuma Nitro para máximo retorno de energía en cada
                zancada.
              </DialogDescription>
            </div>

            {/* Selector de variantes unificado */}
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
              <DialogClose asChild>
                <Button
                  variant={!isAvailable ? 'outline' : 'primary'}
                  disabled={!isAvailable}
                  className="flex-1"
                  onClick={() =>
                    alert(`¡Añadido al carrito! SKU: ${selectedVariant?.sku} (${qty} unidades)`)
                  }
                >
                  {!isAvailable ? 'Sin Existencias' : `Añadir al Carrito (${qty})`}
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
