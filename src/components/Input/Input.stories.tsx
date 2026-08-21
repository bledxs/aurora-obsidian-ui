import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Name completo',
    placeholder: 'Ej. Juan Pérez',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Debe contener al menos 8 caracteres.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Correo electrónico',
    defaultValue: 'usuario@correo',
    error: 'Por favor, ingresa un correo válido.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Código of descuento',
    disabled: true,
    defaultValue: 'PROMO2026',
    helperText: 'Este código ya no es válido',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Address of envío',
    fullWidth: true,
    placeholder: 'Calle 123, City...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
