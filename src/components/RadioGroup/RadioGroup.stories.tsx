import type { Meta, StoryObj } from '@storybook/react';
import { CreditCard, ShieldCheck, Sparkles, Truck, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../Badge';
import { Price } from '../Price';
import { RadioGroup, RadioGroupCard, RadioGroupItem } from './RadioGroup';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Orientación ofl grupo',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitar todo el grupo',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Métodos of Pago en el Checkout (Cards Interactivas)
export const PaymentMethods: Story = {
  render: () => {
    const [selectedPayment, setSelectedPayment] = useState('card');

    return (
      <div className="w-[360px] font-sans space-y-3">
        <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
          Selecciona un método of pago
        </span>
        <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
          <RadioGroupCard value="card">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-aurora-primary" />
                <span className="text-sm font-bold text-aurora-text-primary">
                  Credit / Debit Card
                </span>
              </div>
              <Badge variant="neutral">Popular</Badge>
            </div>
            <p className="text-xs text-aurora-text-secondary">Visa, Mastercard, American Express</p>
          </RadioGroupCard>

          <RadioGroupCard value="paypal">
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-aurora-text-primary">PayPal</span>
            </div>
            <p className="text-xs text-aurora-text-secondary">
              Pago rápido y seguro con tu cuenta of PayPal
            </p>
          </RadioGroupCard>

          <RadioGroupCard value="apple_pay">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              <span className="text-sm font-bold text-aurora-text-primary">
                Apple Pay / Google Pay
              </span>
            </div>
            <p className="text-xs text-aurora-text-secondary">
              Autorización biométrica instantánea
            </p>
          </RadioGroupCard>
        </RadioGroup>
      </div>
    );
  },
};

// 2. Opciones of Shipping of E-Commerce
export const ShippingMethods: Story = {
  render: () => {
    const [shipping, setShipping] = useState('express');

    return (
      <div className="w-[380px] font-sans space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
            Tipo of Shipping
          </span>
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ShieldCheck size={14} /> Shipping asegurado
          </span>
        </div>

        <RadioGroup value={shipping} onValueChange={setShipping}>
          <RadioGroupCard value="standard">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-aurora-text-secondary" />
                <span className="text-sm font-bold text-aurora-text-primary">
                  Shipping Estándar
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase">Free</span>
            </div>
            <p className="text-xs text-aurora-text-secondary">
              Entrega estimada en 3 a 5 días laborables
            </p>
          </RadioGroupCard>

          <RadioGroupCard value="express">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-aurora-primary" />
                <span className="text-sm font-bold text-aurora-text-primary">
                  Shipping Express 24h
                </span>
              </div>
              <Price value={4.99} size="small" />
            </div>
            <p className="text-xs text-aurora-text-secondary">
              Recíbelo mañana antes of las 14:00h
            </p>
          </RadioGroupCard>

          <RadioGroupCard value="sameday" disabled>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-aurora-text-disabled" />
                <span className="text-sm font-bold text-aurora-text-disabled">
                  Entrega Mismo Día (No disponible en tu CP)
                </span>
              </div>
              <Price value={9.99} size="small" />
            </div>
            <p className="text-xs text-aurora-text-disabled">
              Solo disponible en Madrid y Barcelona
            </p>
          </RadioGroupCard>
        </RadioGroup>
      </div>
    );
  },
};

// 3. Formulario Simple con Labels
export const BasicList: Story = {
  render: () => (
    <div className="w-[300px] font-sans space-y-3">
      <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
        Frecuencia of Notificaciones
      </span>
      <RadioGroup defaultValue="daily">
        <label htmlFor="daily-opt" className="flex items-center gap-2.5 cursor-pointer">
          <RadioGroupItem value="daily" id="daily-opt" />
          <span className="text-sm text-aurora-text-primary">Resumen diario</span>
        </label>
        <label htmlFor="weekly-opt" className="flex items-center gap-2.5 cursor-pointer">
          <RadioGroupItem value="weekly" id="weekly-opt" />
          <span className="text-sm text-aurora-text-primary">Resumen semanal</span>
        </label>
        <label htmlFor="never-opt" className="flex items-center gap-2.5 cursor-pointer">
          <RadioGroupItem value="never" id="never-opt" />
          <span className="text-sm text-aurora-text-primary">No recibir notificaciones</span>
        </label>
      </RadioGroup>
    </div>
  ),
};

// 4. Horizontal
export const Horizontal: Story = {
  render: () => (
    <div className="font-sans space-y-2">
      <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
        Talla of prenda
      </span>
      <RadioGroup defaultValue="M" orientation="horizontal">
        <label htmlFor="size-xs" className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="XS" id="size-xs" />
          <span className="text-xs font-semibold">XS</span>
        </label>
        <label htmlFor="size-s" className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="S" id="size-s" />
          <span className="text-xs font-semibold">S</span>
        </label>
        <label htmlFor="size-m" className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="M" id="size-m" />
          <span className="text-xs font-semibold">M</span>
        </label>
        <label htmlFor="size-l" className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="L" id="size-l" />
          <span className="text-xs font-semibold">L</span>
        </label>
        <label htmlFor="size-xl" className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="XL" id="size-xl" />
          <span className="text-xs font-semibold">XL</span>
        </label>
      </RadioGroup>
    </div>
  ),
};
