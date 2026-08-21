import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The current price to display
   */
  value?: number;
  /**
   * Alias of value
   */
  amount?: number;
  /**
   * Original price (displays strike-through when discounted)
   */
  originalValue?: number;
  /**
   * ISO currency code (e.g. 'USD', 'EUR', 'GBP')
   * @default 'EUR'
   */
  currency?: string;
  /**
   * Locale for numeric formatting (e.g. 'en-US', 'es-ES')
   * @default 'es-ES'
   */
  locale?: string;
  /**
   * If true, calculates and displays a discount percentage badge (e.g. "-20%")
   * @default false
   */
  showDiscountBadge?: boolean;
  /**
   * Typography size of componente
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

export const Price = forwardRef<HTMLDivElement, PriceProps>(
  (
    {
      value,
      amount,
      originalValue,
      currency = 'EUR',
      locale = 'es-ES',
      showDiscountBadge = false,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const rawValue = value ?? amount ?? 0;

    const formatPrice = (price: number) => {
      const num = typeof price === 'number' && !Number.isNaN(price) ? price : 0;
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(num);
    };

    const hasDiscount = originalValue !== undefined && originalValue > rawValue;
    const discountPercentage = hasDiscount
      ? Math.round(((originalValue - rawValue) / originalValue) * 100)
      : 0;

    const sizeClasses = {
      small: {
        current: 'text-base',
        original: 'text-xs',
        badge: 'text-[10px] px-1.5 py-0.5',
      },
      medium: {
        current: 'text-xl',
        original: 'text-sm',
        badge: 'text-xs px-2 py-0.5',
      },
      large: {
        current: 'text-3xl',
        original: 'text-lg',
        badge: 'text-sm px-2.5 py-1',
      },
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-baseline gap-2 font-sans', className)}
        {...props}
      >
        <span className={cn('font-bold text-aurora-text-primary', sizeClasses[size].current)}>
          {formatPrice(rawValue)}
        </span>

        {hasDiscount && (
          <span
            className={cn('line-through text-aurora-text-secondary', sizeClasses[size].original)}
          >
            {formatPrice(originalValue)}
          </span>
        )}

        {hasDiscount && showDiscountBadge && (
          <span
            className={cn(
              'rounded-(--radius-aurora) bg-aurora-error-bg font-bold text-aurora-error',
              sizeClasses[size].badge,
            )}
          >
            -{discountPercentage}%
          </span>
        )}
      </div>
    );
  },
);
Price.displayName = 'Price';
