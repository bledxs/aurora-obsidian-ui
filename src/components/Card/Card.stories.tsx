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
      description: 'Estilo visual de la tarjeta',
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

// 1. Tarjeta Estándar
export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Garantía de Satisfacción</CardTitle>
        <CardDescription>30 días de devolución sin preguntas</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-aurora-text-secondary">
          Si no estás completamente enamorado de tu compra, te devolvemos el 100% de tu dinero de
          forma inmediata.
        </p>
      </CardContent>
      <CardFooter className="justify-between border-t border-aurora-border/60">
        <span className="text-xs text-aurora-text-secondary">Envío asegurado</span>
        <Button variant="outline" size="small">
          Más detalles
        </Button>
      </CardFooter>
    </Card>
  ),
};

// 2. Tarjeta de Resumen de Pedido (E-commerce Order Summary)
export const OrderSummary: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resumen del Pedido</CardTitle>
          <Badge variant="success">3 artículos</Badge>
        </div>
        <CardDescription>Revisa los totales antes de pagar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Subtotal</span>
          <Price value={249.97} size="small" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Envío estándar</span>
          <span className="font-semibold text-aurora-success text-sm">Gratis</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-aurora-text-secondary">Descuento de bienvenida</span>
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
          <CreditCard size={16} /> Proceder al Pago
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-aurora-text-secondary">
          <ShieldCheck size={14} className="text-aurora-success" />
          <span>Pago 100% seguro y encriptado</span>
        </div>
      </CardFooter>
    </Card>
  ),
};

// 3. Tarjeta Interactiva / Clickable
export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-[360px] p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-aurora-primary-bg p-3 text-aurora-primary">
          <Truck size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-aurora-text-primary">Envío Express en 24h</h4>
          <p className="mt-1 text-xs text-aurora-text-secondary">
            Recibe tu pedido mañana mismo seleccionando entrega prioritaria.
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-aurora-primary">
            <span>Configurar dirección</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Card>
  ),
};
