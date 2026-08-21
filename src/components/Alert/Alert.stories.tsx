import type { Meta, StoryObj } from '@storybook/react';
import { RefreshCw, ShoppingBag } from 'lucide-react';
import { Button } from '../Button';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Variante semántica del aviso',
    },
    dismissible: {
      control: 'boolean',
      description: 'Mostrar botón de cierre',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Galería de Todas las Variantes con Contraste WCAG AAA
export const AllVariants: Story = {
  render: () => (
    <div className="w-[450px] space-y-4 font-sans">
      <Alert variant="info" dismissible>
        <AlertTitle>Envío en preparación</AlertTitle>
        <AlertDescription>
          Tu pedido está siendo empaquetado en el centro logístico y saldrá hoy.
        </AlertDescription>
      </Alert>

      <Alert variant="success" dismissible>
        <AlertTitle>¡Envío gratuito desbloqueado!</AlertTitle>
        <AlertDescription>
          Has añadido más de 50 € al carrito. El envío estándar es 100% gratuito.
        </AlertDescription>
      </Alert>

      <Alert variant="warning" dismissible>
        <AlertTitle>Stock muy limitado</AlertTitle>
        <AlertDescription>
          Solo quedan 2 unidades disponibles en esta talla. Completa tu compra antes de que se
          agote.
        </AlertDescription>
      </Alert>

      <Alert variant="error" dismissible>
        <AlertTitle>No se pudo procesar el pago</AlertTitle>
        <AlertDescription>
          La entidad bancaria rechazó la transacción. Verifica los fondos o prueba otra tarjeta.
        </AlertDescription>
      </Alert>

      <Alert variant="default" dismissible>
        <AlertTitle>Actualización de términos</AlertTitle>
        <AlertDescription>
          Hemos actualizado nuestras políticas de devolución a 30 días naturales.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// 2. Error de Pago con Botón de Acción
export const PaymentErrorWithAction: Story = {
  render: () => (
    <div className="w-[420px] font-sans">
      <Alert variant="error" dismissible>
        <AlertTitle>Transacción Denegada</AlertTitle>
        <AlertDescription>
          No pudimos cobrar los 129,99 € en tu tarjeta terminada en **4821**.
        </AlertDescription>
        <AlertAction>
          <Button
            variant="outline"
            size="small"
            className="bg-white text-xs gap-1.5 border-red-300 text-red-950 hover:bg-red-50"
          >
            <RefreshCw size={13} />
            Reintentar pago
          </Button>
          <Button variant="ghost" size="small" className="text-xs text-red-900 hover:bg-red-100/60">
            Cambiar a PayPal
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};

// 3. Aviso Promocional en el Carrito
export const CartPromotionNotice: Story = {
  render: () => (
    <div className="w-[420px] font-sans">
      <Alert variant="info">
        <AlertTitle>Cupón "AURORA20" aplicado</AlertTitle>
        <AlertDescription>
          Se ha descontado un 20% en todos los artículos de nueva temporada.
        </AlertDescription>
        <AlertAction>
          <Button variant="primary" size="small" className="text-xs gap-1.5">
            <ShoppingBag size={13} />
            Ir a pagar
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};
