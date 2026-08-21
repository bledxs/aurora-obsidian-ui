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
      description: 'Posición de las notificaciones',
    },
    closeButton: {
      control: 'boolean',
      description: 'Muestra botón de cierre manual',
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
          toast('Notificación estándar', {
            description: 'Este es un mensaje informativo del sistema.',
          })
        }
      >
        Default
      </Button>

      <Button
        variant="primary"
        onClick={() =>
          toast.success('Producto añadido al carrito', {
            description: 'Camiseta Running Obsidian - Talla M',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="danger"
        onClick={() =>
          toast.error('Error al procesar el pedido', {
            description: 'No se pudo verificar el método de pago seleccionado.',
          })
        }
      >
        Error
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.warning('Stock limitado', {
            description: 'Solo quedan 2 unidades disponibles en este momento.',
          })
        }
      >
        Warning
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          toast.info('Cupón aplicado con éxito', {
            description: 'Has obtenido un 15% de descuento en tu compra.',
          })
        }
      >
        Info
      </Button>
    </div>
  ),
};

// 2. Con Botón de Acción (E-Commerce)
export const WithAction: Story = {
  render: () => (
    <div className="font-sans">
      <Toaster position="bottom-right" />
      <Button
        variant="primary"
        onClick={() =>
          toast.success('Añadido al carrito', {
            description: 'Zapatillas Aurora Speed Pro (42 EU)',
            action: {
              label: 'Ver Carrito',
              onClick: () => alert('Navegando al carrito...'),
            },
            cancel: {
              label: 'Deshacer',
              onClick: () => toast('Acción deshecha'),
            },
          })
        }
      >
        Añadir al Carrito (con Acción)
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
            reject(new Error('Fallo de pasarela bancaria'));
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
          Simular Proceso de Compra (Promise)
        </Button>
      </div>
    );
  },
};
