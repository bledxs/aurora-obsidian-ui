import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-[calc(var(--radius-aurora)*1.5)] border bg-aurora-surface font-sans text-aurora-text-primary transition-all overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-aurora-border shadow-xs',
        outline: 'border-aurora-border shadow-none bg-transparent',
        flat: 'border-transparent bg-aurora-neutral-bg shadow-none',
        interactive:
          'border-aurora-border cursor-pointer shadow-xs hover:border-aurora-border-hover hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', variant, padding, className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6 pb-3', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-aurora-text-primary',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-aurora-text-secondary', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-3', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';
