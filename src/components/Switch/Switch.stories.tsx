import type { Meta, StoryObj } from '@storybook/react';
import { CreditCard, FileText, Gift, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Switch, SwitchCard } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Preferencias en el Checkout de E-Commerce (Tarjetas con Switch)
export const CheckoutPreferences: Story = {
  render: () => {
    const [saveCard, setSaveCard] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [giftWrap, setGiftWrap] = useState(false);

    return (
      <div className="w-[380px] font-sans space-y-3">
        <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wider">
          Opciones adicionales del pedido
        </span>

        <SwitchCard
          icon={<CreditCard size={18} />}
          title="Guardar tarjeta de forma segura"
          description="Acelera tus próximas compras con cifrado bancario de 256 bits."
          checked={saveCard}
          onCheckedChange={setSaveCard}
        />

        <SwitchCard
          icon={<FileText size={18} />}
          title="Solicitar factura con NIF / CIF"
          description="Genera y envía automáticamente la factura a tu correo electrónico."
          checked={invoice}
          onCheckedChange={setInvoice}
        />

        <SwitchCard
          icon={<Gift size={18} />}
          title="Envoltorio para regalo (+2,50 €)"
          description="Empaquetado especial de lujo con tarjeta de felicitación personalizada."
          checked={giftWrap}
          onCheckedChange={setGiftWrap}
        />
      </div>
    );
  },
};

// 2. Escala de Tamaños
export const Sizes = () => (
  <div className="flex flex-col gap-4 font-sans">
    <div className="flex items-center gap-3">
      <Switch size="small" defaultChecked />
      <span className="text-xs text-aurora-text-secondary">Pequeño (small)</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch size="medium" defaultChecked />
      <span className="text-sm text-aurora-text-secondary">Mediano (medium)</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch size="large" defaultChecked />
      <span className="text-base text-aurora-text-secondary">Grande (large)</span>
    </div>
  </div>
);

// 3. Con Icono en el Pulgar (Modo Oscuro / Claro)
export const WithThumbIcon: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);

    return (
      <div className="flex items-center gap-3 font-sans">
        <Switch
          size="medium"
          checked={isDark}
          onCheckedChange={setIsDark}
          thumbIcon={
            isDark ? (
              <Moon size={11} className="text-aurora-primary" />
            ) : (
              <Sun size={11} className="text-amber-500" />
            )
          }
        />
        <span className="text-sm font-medium text-aurora-text-primary">
          {isDark ? 'Tema Oscuro Activado' : 'Tema Claro Activado'}
        </span>
      </div>
    );
  },
};

// 4. Deshabilitado
export const Disabled = () => (
  <div className="flex flex-col gap-3 font-sans">
    <div className="flex items-center gap-3">
      <Switch disabled checked={false} />
      <span className="text-xs text-aurora-text-disabled">Desactivado (Disabled)</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch disabled checked={true} />
      <span className="text-xs text-aurora-text-disabled">Activado (Disabled)</span>
    </div>
  </div>
);
