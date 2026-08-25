import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertTriangle,
  HeartOff,
  PackageOpen,
  RotateCcw,
  SearchX,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Button } from '../Button';
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from './EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'dashed', 'subtle'],
      description: 'Surface container variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Component size scale',
    },
    iconVariant: {
      control: 'select',
      options: ['default', 'primary', 'subtle', 'glow'],
      description: 'Icon background container style',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Empty Shopping Cart
export const EmptyShoppingCart: Story = {
  args: {
    variant: 'card',
    iconVariant: 'glow',
    icon: <ShoppingBag />,
    title: 'Your cart is empty',
    description:
      'Looks like you haven’t added anything to your cart yet. Explore our latest arrivals to find something you love.',
    action: <Button variant="primary">Start Shopping</Button>,
    secondaryAction: <Button variant="outline">View Wishlist</Button>,
  },
};

// 2. Zero Search Results
export const NoSearchResults: Story = {
  args: {
    variant: 'dashed',
    iconVariant: 'subtle',
    icon: <SearchX />,
    title: 'No products found',
    description:
      'We couldn’t find any matches for "vintage leather jacket". Try checking your spelling or adjusting filters.',
    action: <Button variant="secondary">Clear Filters</Button>,
    secondaryAction: <Button variant="ghost">Browse All Categories</Button>,
  },
};

// 3. No Order History
export const NoOrders: Story = {
  args: {
    variant: 'subtle',
    iconVariant: 'primary',
    icon: <PackageOpen />,
    title: 'No orders placed yet',
    description:
      'When you complete a purchase, your real-time tracking details and invoice history will appear here.',
    action: <Button variant="primary">Explore Catalog</Button>,
  },
};

// 4. Empty Wishlist
export const EmptyWishlist: Story = {
  args: {
    variant: 'default',
    iconVariant: 'glow',
    icon: <HeartOff />,
    title: 'Your wishlist is waiting',
    description:
      'Save your favorite jackets, footwear, and accessories by clicking the heart icon while browsing.',
    action: (
      <Button variant="primary">
        <Sparkles className="mr-2 h-4 w-4" /> Discover Trending Items
      </Button>
    ),
  },
};

// 5. Connection / Server Error State
export const ServerError: Story = {
  args: {
    variant: 'card',
    iconVariant: 'default',
    icon: <AlertTriangle className="text-aurora-error" />,
    title: 'Unable to load products',
    description:
      'A temporary network issue occurred while loading this collection. Please try refreshing the page.',
    action: (
      <Button variant="danger">
        <RotateCcw className="mr-2 h-4 w-4" /> Try Again
      </Button>
    ),
    secondaryAction: <Button variant="outline">Contact Support</Button>,
  },
};

// 6. Compact / Small Inline
export const SmallInline: Story = {
  args: {
    size: 'small',
    variant: 'subtle',
    iconVariant: 'subtle',
    icon: <PackageOpen />,
    title: 'No active coupons',
    description: 'Enter a valid promotional code above to receive discounts on this order.',
  },
};

// 7. Full Composable Mode
export const Composable: Story = {
  render: () => (
    <EmptyState variant="card" size="large" className="w-120">
      <EmptyStateIcon variant="glow" size="large">
        <ShoppingBag />
      </EmptyStateIcon>

      <div className="flex flex-col items-center gap-2 max-w-sm">
        <EmptyStateTitle size="large">Build Your Dream Setup</EmptyStateTitle>
        <EmptyStateDescription size="large">
          Custom mechanical keyboards, obsidian desk mats, and wireless audio are ready to ship.
        </EmptyStateDescription>
      </div>

      <EmptyStateActions className="mt-4">
        <Button variant="outline" size="medium">
          View Collections
        </Button>
        <Button variant="primary" size="medium">
          Shop Featured
        </Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};
