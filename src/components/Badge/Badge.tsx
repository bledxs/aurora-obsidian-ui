import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-sans font-medium rounded-[var(--radius-aurora)] whitespace-nowrap leading-none border',
  {
    variants: {
      variant: {
        solid: 'border-transparent text-white',
        subtle: 'border-transparent',
        outline: 'bg-transparent',
      },
      color: {
        primary: '',
        success: '',
        warning: '',
        error: '',
        neutral: '',
      },
      size: {
        small: 'text-[10px] px-2 py-1',
        medium: 'text-[12px] px-3 py-1.5',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-aurora-primary text-aurora-text-on-primary',
      },
      { variant: 'solid', color: 'success', className: 'bg-aurora-success' },
      { variant: 'solid', color: 'warning', className: 'bg-aurora-warning' },
      { variant: 'solid', color: 'error', className: 'bg-aurora-error' },
      { variant: 'solid', color: 'neutral', className: 'bg-aurora-neutral' },

      {
        variant: 'subtle',
        color: 'primary',
        className: 'bg-aurora-primary-bg text-aurora-primary',
      },
      {
        variant: 'subtle',
        color: 'success',
        className: 'bg-aurora-success-bg text-aurora-success',
      },
      {
        variant: 'subtle',
        color: 'warning',
        className: 'bg-aurora-warning-bg text-aurora-warning',
      },
      { variant: 'subtle', color: 'error', className: 'bg-aurora-error-bg text-aurora-error' },
      {
        variant: 'subtle',
        color: 'neutral',
        className: 'bg-aurora-neutral-bg text-aurora-neutral',
      },

      {
        variant: 'outline',
        color: 'primary',
        className: 'border-aurora-primary text-aurora-primary',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'border-aurora-success text-aurora-success',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'border-aurora-warning text-aurora-warning',
      },
      { variant: 'outline', color: 'error', className: 'border-aurora-error text-aurora-error' },
      {
        variant: 'outline',
        color: 'neutral',
        className: 'border-aurora-border text-aurora-text-primary',
      },
    ],
    defaultVariants: {
      color: 'neutral',
      variant: 'solid',
      size: 'medium',
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ color, variant, size, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';
