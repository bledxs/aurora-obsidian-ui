import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Texto o contenido del botón',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del botón',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Añadir al carrito',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Ver detalles',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancelar',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Comprar ahora',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Eliminar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Agotado',
  },
};
