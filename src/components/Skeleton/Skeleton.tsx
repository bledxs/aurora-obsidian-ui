import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const skeletonVariants = cva(
  'relative overflow-hidden bg-aurora-neutral-bg/90 dark:bg-slate-800/80',
  {
    variants: {
      variant: {
        rounded: 'rounded-[var(--radius-aurora)]',
        circle: 'rounded-full',
        rectangle: 'rounded-none',
      },
      animation: {
        shimmer:
          'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent',
        pulse: 'animate-pulse',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'rounded',
      animation: 'shimmer',
    },
  },
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, animation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant, animation }), className)}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

/**
 * Pre-designed placeholder for product cards (ProductCard)
 */
export const SkeletonProductCard: React.FC<{ className?: string }> = ({ className }) => (
  <div
    aria-label="Loading product"
    role="status"
    className={cn(
      'flex flex-col gap-3 rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-4 shadow-xs font-sans',
      className,
    )}
  >
    <Skeleton className="aspect-square w-full" />
    <div className="space-y-2 pt-1">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
    <div className="flex items-center justify-between pt-2">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-9 w-24 rounded-[var(--radius-aurora)]" />
    </div>
    <span className="sr-only">Cargando datos ofproducto...</span>
  </div>
);
SkeletonProductCard.displayName = 'SkeletonProductCard';

/**
 * Pre-designed placeholder for cart items (CartItem)
 */
export const SkeletonCartItem: React.FC<{ className?: string }> = ({ className }) => (
  <div
    aria-label="Loading cart item"
    role="status"
    className={cn(
      'flex items-center gap-4 rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-3 font-sans',
      className,
    )}
  >
    <Skeleton className="h-20 w-20 shrink-0" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
    <span className="sr-only">Loading item...</span>
  </div>
);
SkeletonCartItem.displayName = 'SkeletonCartItem';
