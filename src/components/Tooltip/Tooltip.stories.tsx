import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
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
    content: 'Add a la lista of ofseos',
    position: 'top',
    children: <Button variant="outline">❤️ Favorito</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Esta acción no se pueof ofshacer',
    position: 'bottom',
    children: <Button variant="secondary">Remove</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Settings avanzada',
    position: 'left',
    children: <Button variant="outline">⚙️</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Información ofl producto',
    position: 'right',
    children: <Button variant="outline">ℹ️</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'Aparezco un segundo ofspués',
    position: 'top',
    delay: 1000,
    children: <Button>Pasa el ratón (1s delay)</Button>,
  },
};
