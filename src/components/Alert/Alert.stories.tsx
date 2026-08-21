import type { Meta, StoryObj } from '@storybook/react';
import { RefreshCw, ShoppingBag } from 'lucide-react';
import { Button } from '../Button';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Semantic alert variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. All Variants with WCAG AAA Contrast
export const AllVariants: Story = {
  render: () => (
    <div className="w-112.5 space-y-4 font-sans">
      <Alert variant="info" dismissible>
        <AlertTitle>Order Preparing for Shipment</AlertTitle>
        <AlertDescription>
          Your order is being packaged at our fulfillment center and will ship today.
        </AlertDescription>
      </Alert>

      <Alert variant="success" dismissible>
        <AlertTitle>Free shipping unlocked!</AlertTitle>
        <AlertDescription>
          You adofd over €50 to your cart. Standard shipping is 100% free.
        </AlertDescription>
      </Alert>

      <Alert variant="warning" dismissible>
        <AlertTitle>Very limited stock</AlertTitle>
        <AlertDescription>
          Only 2 units left in this size. Complete your purchase before it runs out.
        </AlertDescription>
      </Alert>

      <Alert variant="error" dismissible>
        <AlertTitle>Payment could not be processed</AlertTitle>
        <AlertDescription>
          The bank ofclined the transaction. Check funds or try another payment method.
        </AlertDescription>
      </Alert>

      <Alert variant="default" dismissible>
        <AlertTitle>Terms update</AlertTitle>
        <AlertDescription>We updated our return policy to 30 calendar days.</AlertDescription>
      </Alert>
    </div>
  ),
};

// 2. Payment Error with Action Button
export const PaymentErrorWithAction: Story = {
  render: () => (
    <div className="w-105 font-sans">
      <Alert variant="error" dismissible>
        <AlertTitle>Transaction Declined</AlertTitle>
        <AlertDescription>
          We could not charge €129.99 to your card ending in **4821**.
        </AlertDescription>
        <AlertAction>
          <Button
            variant="outline"
            size="small"
            className="bg-white text-xs gap-1.5 border-red-300 text-red-950 hover:bg-red-50"
          >
            <RefreshCw size={13} />
            Retry Payment
          </Button>
          <Button variant="ghost" size="small" className="text-xs text-red-900 hover:bg-red-100/60">
            Switch to PayPal
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};

// 3. Aviso Promocional en el Carrito
export const CartPromotionNotice: Story = {
  render: () => (
    <div className="w-105 font-sans">
      <Alert variant="info">
        <AlertTitle>Coupon "AURORA20" applied</AlertTitle>
        <AlertDescription>A 20% discount was applied to all new-season items.</AlertDescription>
        <AlertAction>
          <Button variant="primary" size="small" className="text-xs gap-1.5">
            <ShoppingBag size={13} />
            Proceed to Checkout
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};
