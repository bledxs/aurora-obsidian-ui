import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-sans font-semibold rounded-[var(--radius-aurora)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 leading-none',
  {
    variants: {
      variant: {
        primary:
          'bg-aurora-primary text-aurora-text-on-primary hover:bg-aurora-primary-hover hover:-translate-y-[1px]',
        secondary:
          'bg-aurora-surface text-aurora-text-primary hover:bg-aurora-surface-hover hover:-translate-y-[1px]',
        outline:
          'bg-transparent text-aurora-text-primary shadow-[inset_0_0_0_1px_var(--color-aurora-border)] hover:bg-aurora-surface hover:-translate-y-[1px]',
      },
      size: {
        small: 'text-[12px] px-4 py-2',
        medium: 'text-[14px] px-5 py-[10px]',
        large: 'text-[16px] px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <button
        type={type ?? 'button'}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
