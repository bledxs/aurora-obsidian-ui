import type { Meta, StoryObj } from '@storybook/react';
import { LogOut, Package, Settings, SlidersHorizontal, Truck } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Slider } from '../Slider';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './Popover';

const meta = {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Filtro Rápido de Catálogo de E-Commerce
export const CatalogFilterPopover: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([20, 150]);
    const [inStockOnly, setInStockOnly] = useState(true);

    return (
      <Popover placement="bottom-start">
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal size={16} />
            Filtros rápidos
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" showCloseButton>
          <PopoverHeader>
            <PopoverTitle>Filtrar Productos</PopoverTitle>
            <PopoverDescription>
              Ajusta el rango de precio y disponibilidad del catálogo.
            </PopoverDescription>
          </PopoverHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-aurora-text-secondary">Precio máximo</span>
                <span className="font-bold text-aurora-text-primary">
                  {priceRange[0]} € - {priceRange[1]} €
                </span>
              </div>
              <Slider
                min={0}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-aurora-border/40">
              <Checkbox
                id="stock-filter"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label
                htmlFor="stock-filter"
                className="text-xs font-medium text-aurora-text-primary cursor-pointer select-none"
              >
                Solo productos en stock
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-aurora-border/50">
            <PopoverClose className="bg-aurora-neutral-bg text-aurora-text-secondary hover:bg-aurora-surface-hover">
              Cancelar
            </PopoverClose>
            <PopoverClose className="bg-aurora-primary text-white hover:bg-aurora-primary-hover">
              Aplicar
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// 2. Calculadora de Envío en Ficha de Producto
export const ShippingCalculatorPopover: Story = {
  render: () => (
    <Popover placement="bottom">
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 text-xs">
          <Truck size={15} />
          Calcular costes de envío
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" showCloseButton>
        <PopoverHeader>
          <PopoverTitle>Estimar Envío</PopoverTitle>
          <PopoverDescription>
            Introduce tu código postal para ver plazos de entrega.
          </PopoverDescription>
        </PopoverHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-1">
            <label
              htmlFor="shipping-zip"
              className="text-xs font-medium text-aurora-text-secondary"
            >
              Código Postal
            </label>
            <Input id="shipping-zip" placeholder="28001" />
          </div>

          <div className="rounded-xs bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-900">
            <p className="font-semibold">Envío estándar gratis</p>
            <p className="text-[11px] text-emerald-800">Entrega estimada en 24-48 horas.</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <PopoverClose className="w-full bg-aurora-primary text-white hover:bg-aurora-primary-hover">
            Aceptar
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// 3. Menú Rápido de Perfil de Usuario
export const UserQuickProfilePopover: Story = {
  render: () => (
    <Popover placement="bottom-end">
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menú de usuario"
          className="rounded-full ring-2 ring-transparent hover:ring-aurora-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus transition-all"
        >
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Sara Connor"
            status="online"
            size="md"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" showCloseButton>
        <div className="flex items-center gap-3 p-2 border-b border-aurora-border/50">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Sara Connor"
            size="sm"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-aurora-text-primary">Sara Connor</span>
            <span className="text-[11px] text-aurora-text-secondary">sara.connor@aurora.ui</span>
          </div>
        </div>

        <div className="flex flex-col py-1 text-xs">
          <PopoverClose className="w-full justify-start gap-2.5 px-2.5 py-2 text-aurora-text-secondary hover:bg-aurora-surface-hover hover:text-aurora-text-primary font-normal">
            <Package size={14} />
            Mis pedidos
          </PopoverClose>
          <PopoverClose className="w-full justify-start gap-2.5 px-2.5 py-2 text-aurora-text-secondary hover:bg-aurora-surface-hover hover:text-aurora-text-primary font-normal">
            <Settings size={14} />
            Configuración de cuenta
          </PopoverClose>
          <div className="my-1 border-t border-aurora-border/40" />
          <PopoverClose className="w-full justify-start gap-2.5 px-2.5 py-2 text-rose-600 hover:bg-rose-50 font-normal">
            <LogOut size={14} />
            Cerrar sesión
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
