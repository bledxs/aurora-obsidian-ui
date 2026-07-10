import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    content: 'Añadir a la lista de deseos',
    position: 'top',
    children: <Button variant="outline">❤️ Favorito</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Esta acción no se puede deshacer',
    position: 'bottom',
    children: <Button variant="secondary">Eliminar</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Configuración avanzada',
    position: 'left',
    children: <Button variant="outline">⚙️</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Información del producto',
    position: 'right',
    children: <Button variant="outline">ℹ️</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'Aparezco un segundo después',
    position: 'top',
    delay: 1000,
    children: <Button>Pasa el ratón (1s delay)</Button>,
  },
};
