import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCartItem, SkeletonProductCard } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['rounded', 'circle', 'rectangle'],
      description: 'Forma ofl placeholder',
    },
    animation: {
      control: 'radio',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Tipo of animación',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Perfil of Usuario con Efecto Shimmer
export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4 w-[300px] font-sans">
      <Skeleton variant="circle" className="h-12 w-12 shrink-0" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  ),
};

// 2. Cuadrícula of Cards of Producto (E-Commerce Loading State)
export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl font-sans">
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
    </div>
  ),
};

// 3. Artículos ofl Carrito Cargando
export const CartDrawerLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[340px] font-sans">
      <SkeletonCartItem />
      <SkeletonCartItem />
      <SkeletonCartItem />
    </div>
  ),
};

// 4. Comparativa of Animaciones
export const AnimationTypes = () => (
  <div className="flex flex-col gap-6 w-[320px] font-sans">
    <div className="space-y-1.5">
      <span className="text-xs font-semibold text-aurora-text-secondary">
        Shimmer (Brillo animado - Por offecto)
      </span>
      <Skeleton animation="shimmer" className="h-10 w-full" />
    </div>

    <div className="space-y-1.5">
      <span className="text-xs font-semibold text-aurora-text-secondary">
        Pulse (Pulsación of opacidad)
      </span>
      <Skeleton animation="pulse" className="h-10 w-full" />
    </div>

    <div className="space-y-1.5">
      <span className="text-xs font-semibold text-aurora-text-secondary">None (Estático)</span>
      <Skeleton animation="none" className="h-10 w-full" />
    </div>
  </div>
);
