import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Check,
  CreditCard,
  Filter,
  Heart,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { CartItem } from '../CartItem';
import { Checkbox } from '../Checkbox';
import { Price } from '../Price';
import { Slider } from '../Slider';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

const meta = {
  title: 'Modals & Overlays/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Mobile Cart Drawer
export const MobileCartDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="primary">
          <ShoppingBag className="mr-2 h-4 w-4" /> View Cart (2 Items)
        </Button>
      </DrawerTrigger>
      <DrawerContent height="tall">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Your Shopping Cart</DrawerTitle>
            <Badge variant="subtle" color="success">
              Free Shipping Unlocked
            </Badge>
          </div>
          <DrawerDescription>
            Review items before proceeding to instant mobile checkout.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="divide-y divide-aurora-border">
          <CartItem
            id="1"
            title="Obsidian Pro Wireless Headphones"
            price={129.99}
            quantity={1}
            imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300"
            variantTitle="Color: Obsidian Black"
          />
          <CartItem
            id="2"
            title="Titan Series Smartwatch 44mm"
            price={199.99}
            originalPrice={249.99}
            quantity={1}
            imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300&h=300"
            variantTitle="Band: Space Gray Silicone"
          />
        </DrawerBody>

        <DrawerFooter>
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm text-aurora-text-secondary">Subtotal (2 items)</span>
            <Price value={329.98} size="large" />
          </div>
          <Button variant="primary" size="large" className="w-full">
            <CreditCard className="mr-2 h-5 w-5" /> Instant Mobile Checkout
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost" size="medium" className="w-full">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// 2. Mobile SKU / Variant Picker Sheet
export const MobileSkuPicker: Story = {
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState('m');
    const [selectedColor, setSelectedColor] = React.useState('obsidian');

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Sparkles className="mr-2 h-4 w-4" /> Select Size & Color
          </Button>
        </DrawerTrigger>
        <DrawerContent height="auto">
          <DrawerHeader>
            <DrawerTitle>Select Garment Options</DrawerTitle>
            <DrawerDescription>Oversized Obsidian Streetwear Hoodie • $89.00</DrawerDescription>
          </DrawerHeader>

          <DrawerBody className="space-y-6 py-4">
            {/* Color selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-aurora-text-secondary">
                Color: <span className="text-aurora-text-primary capitalize">{selectedColor}</span>
              </span>
              <div className="flex gap-3">
                {[
                  { id: 'obsidian', label: 'Obsidian Black', bg: '#0f172a' },
                  { id: 'white', label: 'Pure White', bg: '#ffffff' },
                  { id: 'slate', label: 'Slate Gray', bg: '#64748b' },
                ].map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={cn(
                      'relative h-9 w-9 rounded-full border-2 transition-all',
                      selectedColor === c.id
                        ? 'border-aurora-border-focus ring-2 ring-aurora-primary/20'
                        : 'border-aurora-border hover:border-aurora-border-hover',
                    )}
                    style={{ backgroundColor: c.bg }}
                    aria-label={c.label}
                  >
                    {selectedColor === c.id && (
                      <Check
                        size={14}
                        className={cn(
                          'absolute inset-0 m-auto',
                          c.id === 'white' ? 'text-black' : 'text-white',
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-aurora-text-secondary">
                  Size: <span className="text-aurora-text-primary uppercase">{selectedSize}</span>
                </span>
                <button type="button" className="text-xs font-medium text-aurora-primary underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['s', 'm', 'l', 'xl'].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      'flex h-11 items-center justify-center rounded-(--radius-aurora) border text-sm font-semibold uppercase transition-all',
                      selectedSize === s
                        ? 'border-aurora-border-focus bg-aurora-primary text-aurora-text-on-primary'
                        : 'border-aurora-border bg-aurora-surface hover:bg-aurora-surface-hover text-aurora-text-primary',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="primary" size="large" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart • $89.00
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

// 3. Mobile Catalog Filters Drawer
export const MobileFilterSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter Products (3)
        </Button>
      </DrawerTrigger>
      <DrawerContent height="tall">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Filters & Sorting</DrawerTitle>
            <button type="button" className="text-xs text-aurora-text-secondary hover:underline">
              Reset all
            </button>
          </div>
        </DrawerHeader>

        <DrawerBody className="space-y-6">
          {/* Price range */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-aurora-text-primary">
              Price Range ($20 - $350)
            </span>
            <Slider defaultValue={[20, 350]} min={0} max={500} step={10} />
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-aurora-text-primary">Availability</span>
            <div className="space-y-2">
              <Checkbox defaultChecked label="In Stock Only (142)" />
              <Checkbox label="On Sale / Discounted (38)" />
              <Checkbox label="Free Shipping Eligible (95)" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-aurora-text-primary">Category</span>
            <div className="space-y-2">
              <Checkbox defaultChecked label="Over-ear Headphones (24)" />
              <Checkbox label="True Wireless Earbuds (48)" />
              <Checkbox label="Audiophile DACs & Amps (16)" />
              <Checkbox label="Audio Cables & Adapters (32)" />
            </div>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="primary" size="large" className="w-full">
              Show 142 Products
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// 4. Mobile Quick Action Sheet
export const ActionSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Share2 className="mr-2 h-4 w-4" /> Share Product
        </Button>
      </DrawerTrigger>
      <DrawerContent height="auto">
        <DrawerHeader>
          <DrawerTitle>Share & Actions</DrawerTitle>
          <DrawerDescription>Choose what you'd like to do with this product</DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="space-y-1 py-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-(--radius-aurora) p-3 text-left text-sm font-medium text-aurora-text-primary hover:bg-aurora-surface-hover"
          >
            <Heart className="h-4 w-4 text-aurora-error" /> Add to Saved Wishlist
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-(--radius-aurora) p-3 text-left text-sm font-medium text-aurora-text-primary hover:bg-aurora-surface-hover"
          >
            <Share2 className="h-4 w-4 text-aurora-primary" /> Copy Shareable Link
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-(--radius-aurora) p-3 text-left text-sm font-medium text-aurora-text-primary hover:bg-aurora-surface-hover"
          >
            <SlidersHorizontal className="h-4 w-4 text-aurora-text-secondary" /> Compare with
            Similar Models
          </button>
        </DrawerBody>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" size="medium" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
