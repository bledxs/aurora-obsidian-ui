import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Price } from '../Price';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'flat', 'interactive'],
      description: 'Estilo visual of the tarjeta',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Relleno interno cuando no se usan subcomponentes',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Standard Card
export const Default: Story = {
  render: () => (
    <Card className="w-90">
      <CardHeader>
        <CardTitle>Satisfaction Guarantee</CardTitle>
        <CardDescription>30-day money-back guarantee</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-aurora-text-secondary">
          If you are not completely satisfied with your purchase, we will refund 100% of your money.
          forma inmediata.
        </p>
      </CardContent>
      <CardFooter className="justify-between border-t border-aurora-border/60">
        <span className="text-xs text-aurora-text-secondary">Shipping asegurado</span>
        <Button variant="outline" size="small">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  ),
};

// 2. Card of Resumen of Pedido (E-commerce Order Summary)
export const OrderSummary: Story = {
  render: () => (
    <Card className="w-95">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Summary of Order</CardTitle>
          <Badge variant="success">3 items</Badge>
        </div>
        <CardDescription>Check totals before paying</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Subtotal</span>
          <Price value={249.97} size="small" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Standard shipping</span>
          <span className="font-semibold text-aurora-success text-sm">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Welcome discount</span>
          <span className="font-semibold text-aurora-error text-sm">-25.00 €</span>
        </div>
        <div className="my-2 border-t border-aurora-border" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-aurora-text-primary text-base">Total</span>
          <Price value={224.97} size="large" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3 border-t border-aurora-border/60">
        <Button variant="primary" className="w-full gap-2">
          <CreditCard size={16} /> Proceed to Payment
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-aurora-text-secondary">
          <ShieldCheck size={14} className="text-aurora-success" />
          <span>100% secure and encrypted payment</span>
        </div>
      </CardFooter>
    </Card>
  ),
};

// 3. Card Interactiva / Clickable
export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-90 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-aurora-primary-bg p-3 text-aurora-primary">
          <Truck size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-aurora-text-primary">Express Shipping in 24h</h4>
          <p className="mt-1 text-xs text-aurora-text-secondary">
            Get your order tomorrow by selecting priority shipping.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-aurora-primary">
            <span>Set delivery address</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Card>
  ),
};
