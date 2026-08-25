import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center font-sans text-aurora-text-primary transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        card: 'rounded-[calc(var(--radius-aurora)*1.5)] border border-aurora-border bg-aurora-surface shadow-xs',
        dashed:
          'rounded-[calc(var(--radius-aurora)*1.5)] border-2 border-dashed border-aurora-border bg-aurora-surface/50',
        subtle: 'rounded-[calc(var(--radius-aurora)*1.5)] bg-aurora-neutral-bg/60',
      },
      size: {
        small: 'p-6 gap-3 min-h-[180px]',
        medium: 'p-8 sm:p-12 gap-4 min-h-[260px]',
        large: 'p-12 sm:p-16 gap-5 min-h-[340px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

const emptyStateIconVariants = cva(
  'flex items-center justify-center rounded-full text-aurora-text-secondary transition-all',
  {
    variants: {
      variant: {
        default: 'bg-aurora-neutral-bg text-aurora-text-secondary',
        primary: 'bg-aurora-primary-bg text-aurora-primary',
        subtle:
          'bg-aurora-surface shadow-xs border border-aurora-border text-aurora-text-secondary',
        glow: 'bg-aurora-primary/10 text-aurora-primary ring-8 ring-aurora-primary/5',
      },
      size: {
        small: 'h-10 w-10 text-lg [&_svg]:h-5 [&_svg]:w-5',
        medium: 'h-14 w-14 text-2xl [&_svg]:h-7 [&_svg]:w-7',
        large: 'h-20 w-20 text-3xl [&_svg]:h-10 [&_svg]:w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof emptyStateVariants> {
  /**
   * Primary icon or illustration to display
   */
  icon?: React.ReactNode;
  /**
   * Main title or heading of the empty state
   */
  title?: React.ReactNode;
  /**
   * Explanatory description or callout text
   */
  description?: React.ReactNode;
  /**
   * Primary call-to-action button or link
   */
  action?: React.ReactNode;
  /**
   * Optional secondary action button
   */
  secondaryAction?: React.ReactNode;
  /**
   * Icon visual style variant
   * @default 'default'
   */
  iconVariant?: 'default' | 'primary' | 'subtle' | 'glow';
}

export type EmptyStateSize = 'small' | 'medium' | 'large';

const resolveSize = (size: VariantProps<typeof emptyStateVariants>['size']): EmptyStateSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant,
      size,
      icon,
      title,
      description,
      action,
      secondaryAction,
      iconVariant = 'default',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDeclarative = Boolean(icon || title || description || action || secondaryAction);
    const contentSize = resolveSize(size);

    if (!isDeclarative) {
      return (
        <div ref={ref} className={cn(emptyStateVariants({ variant, size }), className)} {...props}>
          {children}
        </div>
      );
    }

    const hasActions = Boolean(action || secondaryAction);

    return (
      <div ref={ref} className={cn(emptyStateVariants({ variant, size }), className)} {...props}>
        {icon && (
          <EmptyStateIcon size={contentSize} variant={iconVariant}>
            {icon}
          </EmptyStateIcon>
        )}

        <div className="flex max-w-md flex-col items-center gap-1.5">
          {title && <EmptyStateTitle size={contentSize}>{title}</EmptyStateTitle>}
          {description && (
            <EmptyStateDescription size={contentSize}>{description}</EmptyStateDescription>
          )}
        </div>

        {hasActions && (
          <EmptyStateActions className="mt-2">
            {secondaryAction}
            {action}
          </EmptyStateActions>
        )}
        {children}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';

export interface EmptyStateIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateIconVariants> {}

export const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ variant, size, className, children, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(emptyStateIconVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  ),
);
EmptyStateIcon.displayName = 'EmptyStateIcon';

export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'span';
  size?: EmptyStateSize;
}

export const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ as: Component = 'h3', size = 'medium', className, children, ...props }, ref) => {
    const sizeClasses = {
      small: 'text-sm font-semibold',
      medium: 'text-base sm:text-lg font-semibold',
      large: 'text-xl sm:text-2xl font-bold tracking-tight',
    }[size];

    return (
      <Component
        ref={ref}
        className={cn('text-aurora-text-primary', sizeClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
EmptyStateTitle.displayName = 'EmptyStateTitle';

export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: EmptyStateSize;
}

export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyStateDescriptionProps
>(({ size = 'medium', className, children, ...props }, ref) => {
  const sizeClasses = {
    small: 'text-xs text-aurora-text-secondary',
    medium: 'text-sm text-aurora-text-secondary',
    large: 'text-sm sm:text-base text-aurora-text-secondary',
  }[size];

  return (
    <p ref={ref} className={cn('max-w-md text-balance', sizeClasses, className)} {...props}>
      {children}
    </p>
  );
});
EmptyStateDescription.displayName = 'EmptyStateDescription';

export interface EmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const EmptyStateActions = React.forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center justify-center gap-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
EmptyStateActions.displayName = 'EmptyStateActions';
