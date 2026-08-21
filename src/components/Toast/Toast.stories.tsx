import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Toaster } from './Toast';
import { toast } from './toast-store';

const meta = {
  title: 'Molecules/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Notification toast position',
    },
    closeButton: {
      control: 'boolean',
      description: 'Shows manual close button',
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Variantes Básicas
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 font-sans">
      <Toaster position="bottom-right" />

      <Button
        variant="outline"
        onClick={() =>
          toast('Standard Notification', {
            description: 'This is a system informational message.',
          })
        }
      >
        Default
      </Button>

      <Button
        variant="primary"
        onClick={() =>
          toast.success('Product added to cart', {
            description: 'Camiseta Running Obsidian - Size M',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="danger"
        onClick={() =>
          toast.error('Error processing order', {
            description: 'Could not verify selected payment method.',
          })
        }
      >
        Error
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Stock limitado', {
            description: 'Only 2 units remaining in stock right now.',
          })
        }
      >
        Warning
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          toast.info('Coupon applied successfully', {
            description: 'You received a 15% discount on your order.',
          })
        }
      >
        Info
      </Button>
    </div>
  ),
};

// 2. With Action Button (E-Commerce)
export const WithAction: Story = {
  render: () => (
    <div className="font-sans">
      <Toaster position="bottom-right" />
      <Button
        variant="primary"
        onClick={() =>
          toast.success('Added to cart', {
            description: 'Zapatillas Aurora Speed Pro (42 EU)',
            action: {
              label: 'View Cart',
              onClick: () => alert('Navigating to shopping cart...'),
            },
            cancel: {
              label: 'Deshacer',
              onClick: () => toast('Acción ofshecha'),
            },
          })
        }
      >
        Add to Cart (with Action)
      </Button>
    </div>
  ),
};

// 3. Notificación Asíncrona (toast.promise)
export const AsyncPromise: Story = {
  render: () => {
    const handleCheckout = () => {
      const simulatedApi = new Promise<{ orderId: string }>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) {
            resolve({ orderId: 'AUR-94812' });
          } else {
            reject(new Error('Fallo of pasarela bancaria'));
          }
        }, 2000);
      });

      toast.promise(simulatedApi, {
        loading: 'Procesando pago y generando pedido...',
        success: (data) => `¡Pedido #${data.orderId} confirmado con éxito!`,
        error: 'No se pudo completar la transacción.',
      });
    };

    return (
      <div className="font-sans">
        <Toaster position="bottom-right" />
        <Button variant="primary" onClick={handleCheckout}>
          Simular Proceso of Compra (Promise)
        </Button>
      </div>
    );
  },
};
