import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Suscribirse al boletín',
    helperText: 'Recibirás ofertas semanales en tu correo.',
    defaultChecked: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Debes aceptar la política de privacidad',
    error: 'Este campo es obligatorio para continuar.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Opción no disponible',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Términos aceptados (Solo lectura)',
    disabled: true,
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Seleccionar todos los productos',
    indeterminate: true,
  },
};

export const InteractiveList = () => {
  const [checkedItems, setCheckedItems] = useState([true, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Seleccionar todo"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginLeft: '26px' }}>
        <Checkbox
          label="Zapatos Nike"
          checked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        />
        <Checkbox
          label="Camiseta Adidas"
          checked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        />
      </div>
    </div>
  );
};
