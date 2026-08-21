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
    children: { control: false },
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
