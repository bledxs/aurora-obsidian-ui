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
      description: 'Group orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire group',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Checkout Payment Methods (Interactive Cards)
export const PaymentMethods: Story = {
  render: () => {
    const [selectedPayment, setSelectedPayment] = useState('card');

    return (
      <div className="w-[360px] font-sans space-y-3">
        <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
          Select a payment method
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
              Fast and secure checkout with your PayPal account
            </p>
          </RadioGroupCard>

          <RadioGroupCard value="apple_pay">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              <span className="text-sm font-bold text-aurora-text-primary">
                Apple Pay / Google Pay
              </span>
            </div>
            <p className="text-xs text-aurora-text-secondary">Instant biometric authorization</p>
          </RadioGroupCard>
        </RadioGroup>
      </div>
    );
  },
};

// 2. E-Commerce Shipping Options
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
                  Standard Shipping
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase">Free</span>
            </div>
            <p className="text-xs text-aurora-text-secondary">
              Estimated delivery in 3 to 5 business days
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
              Receive tomorrow before 2:00 PM guaranteed
            </p>
          </RadioGroupCard>

          <RadioGroupCard value="sameday" disabled>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-aurora-text-disabled" />
                <span className="text-sm font-bold text-aurora-text-disabled">
                  Same-Day Delivery (Unavailable in your area)
                </span>
              </div>
              <Price value={9.99} size="small" />
            </div>
            <p className="text-xs text-aurora-text-disabled">
              Available in select metropolitan regions only
            </p>
          </RadioGroupCard>
        </RadioGroup>
      </div>
    );
  },
};

// 3. Simple Form with Labels
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
        Size of prenda
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
