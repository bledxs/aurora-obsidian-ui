import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface PriceProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * El precio actual a mostrar
   */
  value: number;
  /**
   * El precio original (si hay descuento, aparecerá tachado)
   */
  originalValue?: number;
  /**
   * Código de moneda ISO (ej. 'EUR', 'USD', 'MXN')
   * @default 'EUR'
   */
  currency?: string;
  /**
   * Localización para el formato numérico (ej. 'es-ES', 'en-US')
   * @default 'es-ES'
   */
  locale?: string;
  /**
   * Si es true, calcula y muestra un pequeño badge rojo con el porcentaje de descuento (ej. "-20%")
   * @default false
   */
  showDiscountBadge?: boolean;
  /**
   * Tamaño tipográfico del componente
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

export const Price = forwardRef<HTMLDivElement, PriceProps>(
  (
    {
      value,
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
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(price);
    };

    const hasDiscount = originalValue !== undefined && originalValue > value;
    const discountPercentage = hasDiscount
      ? Math.round(((originalValue - value) / originalValue) * 100)
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
          {formatPrice(value)}
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
