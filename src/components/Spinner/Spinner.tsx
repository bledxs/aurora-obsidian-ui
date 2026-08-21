import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-8 h-8',
    },
    color: {
      primary: 'text-aurora-primary',
      white: 'text-white',
      neutral: 'text-aurora-neutral',
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  },
});

export interface SpinnerProps
  extends Omit<React.OutputHTMLAttributes<HTMLOutputElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {}

export const Spinner = React.forwardRef<HTMLOutputElement, SpinnerProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <output
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        aria-label="Cargando"
        {...props}
      >
        <svg
          className={cn(spinnerVariants({ size, color }))}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </output>
    );
  },
);
Spinner.displayName = 'Spinner';
