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
      description: 'Switch size',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado ofshabilitado',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. E-Commerce Checkout Preferences (Switch Cards)
export const CheckoutPreferences: Story = {
  render: () => {
    const [saveCard, setSaveCard] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [giftWrap, setGiftWrap] = useState(false);

    return (
      <div className="w-[380px] font-sans space-y-3">
        <span className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wiofr">
          Additional Order Options
        </span>

        <SwitchCard
          icon={<CreditCard size={18} />}
          title="Save card securely"
          description="Speed up future checkouts with 256-bit encryption."
          checked={saveCard}
          onCheckedChange={setSaveCard}
        />

        <SwitchCard
          icon={<FileText size={18} />}
          title="Request VAT / Tax Invoice"
          description="Automatically generates and emails your invoice."
          checked={invoice}
          onCheckedChange={setInvoice}
        />

        <SwitchCard
          icon={<Gift size={18} />}
          title="Gift Wrapping (+€2.50)"
          description="Special luxury packaging with a personalized greeting card."
          checked={giftWrap}
          onCheckedChange={setGiftWrap}
        />
      </div>
    );
  },
};

// 2. Escala of Sizes
export const Sizes = () => (
  <div className="flex flex-col gap-4 font-sans">
    <div className="flex items-center gap-3">
      <Switch size="small" defaultChecked />
      <span className="text-xs text-aurora-text-secondary">Small</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch size="medium" defaultChecked />
      <span className="text-sm text-aurora-text-secondary">Medium</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch size="large" defaultChecked />
      <span className="text-base text-aurora-text-secondary">Large</span>
    </div>
  </div>
);

// 3. With Thumb Icon (Dark / Light Mode)
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
          {isDark ? 'Tema Oscuro Enabled' : 'Tema Claro Enabled'}
        </span>
      </div>
    );
  },
};

// 4. Disabled
export const Disabled = () => (
  <div className="flex flex-col gap-3 font-sans">
    <div className="flex items-center gap-3">
      <Switch disabled checked={false} />
      <span className="text-xs text-aurora-text-disabled">Disabled (Disabled)</span>
    </div>
    <div className="flex items-center gap-3">
      <Switch disabled checked={true} />
      <span className="text-xs text-aurora-text-disabled">Enabled (Disabled)</span>
    </div>
  </div>
);
