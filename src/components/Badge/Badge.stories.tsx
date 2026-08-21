import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    children: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Etiqueta',
  },
};

export const SubtleSuccess: Story = {
  args: {
    children: 'En stock',
    color: 'success',
    variant: 'subtle',
  },
};

export const SolidWarning: Story = {
  args: {
    children: 'Pocas unidades',
    color: 'warning',
    variant: 'solid',
  },
};

export const OutlineError: Story = {
  args: {
    children: 'Agotado',
    color: 'error',
    variant: 'outline',
  },
};

export const SmallNew: Story = {
  args: {
    children: 'NUEVO',
    color: 'primary',
    variant: 'solid',
    size: 'small',
  },
};
