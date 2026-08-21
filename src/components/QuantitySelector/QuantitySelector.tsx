import { cva, type VariantProps } from 'class-variance-authority';
import { Minus, Plus, Trash2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

const quantitySelectorVariants = cva(
  'inline-flex items-center rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface font-sans text-aurora-text-primary transition-all focus-within:border-aurora-border-focus focus-within:ring-2 focus-within:ring-aurora-border-focus/20',
  {
    variants: {
      size: {
        small: 'h-7 text-xs',
        medium: 'h-9 text-sm',
        large: 'h-11 text-base',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const buttonVariants = cva(
  'flex h-full items-center justify-center text-aurora-text-secondary transition-colors hover:bg-aurora-surface-hover hover:text-aurora-text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-aurora-text-secondary',
  {
    variants: {
      size: {
        small: 'w-7 px-1.5',
        medium: 'w-9 px-2.5',
        large: 'w-11 px-3',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const iconSizes = {
  small: 12,
  medium: 14,
  large: 16,
};

export interface QuantitySelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof quantitySelectorVariants> {
  /**
   * Valor numérico actual
   */
  value: number;
  /**
   * Valor mínimo permitido
   * @default 1
   */
  min?: number;
  /**
   * Valor máximo permitido
   * @default 99
   */
  max?: number;
  /**
   * Incremento/decremento por paso
   * @default 1
   */
  step?: number;
  /**
   * Callback invocado al cambiar el valor
   */
  onChange?: (value: number) => void;
  /**
   * Callback invocado al llegar al mínimo y decrementar (eliminar)
   */
  onRemove?: () => void;
  /**
   * Si es true, muestra un icono de papelera al llegar al mínimo
   * @default false
   */
  showTrashOnMin?: boolean;
  /**
   * Deshabilita la interacción
   * @default false
   */
  disabled?: boolean;
}

export const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      value,
      min = 1,
      max = 99,
      step = 1,
      onChange,
      onRemove,
      showTrashOnMin = false,
      disabled = false,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const handleDecrement = () => {
      if (disabled) return;
      if (value > min) {
        onChange?.(Math.max(min, value - step));
      } else if (value === min && onRemove) {
        onRemove();
      }
    };

    const handleIncrement = () => {
      if (disabled) return;
      if (value < max) {
        onChange?.(Math.min(max, value + step));
      }
    };

    const isAtMin = value <= min;
    const isAtMax = value >= max;
    const isTrash = isAtMin && showTrashOnMin;
    const iconSize = iconSizes[size || 'medium'];

    return (
      <div ref={ref} className={cn(quantitySelectorVariants({ size }), className)} {...props}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (isAtMin && !onRemove)}
          aria-label={isTrash ? 'Eliminar del carrito' : 'Disminuir cantidad'}
          className={cn(
            buttonVariants({ size }),
            'rounded-l-[calc(var(--radius-aurora)-1px)]',
            isTrash && 'hover:text-aurora-error hover:bg-aurora-error-bg/30',
          )}
        >
          {isTrash ? <Trash2 size={iconSize} /> : <Minus size={iconSize} />}
        </button>

        <span
          className={cn(
            'flex flex-1 items-center justify-center text-center font-bold select-none',
            size === 'small' && 'min-w-6 px-1',
            size === 'medium' && 'min-w-8 px-2',
            size === 'large' && 'min-w-10 px-3',
          )}
        >
          {value}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || isAtMax}
          aria-label="Aumentar cantidad"
          className={cn(buttonVariants({ size }), 'rounded-r-[calc(var(--radius-aurora)-1px)]')}
        >
          <Plus size={iconSize} />
        </button>
      </div>
    );
  },
);
QuantitySelector.displayName = 'QuantitySelector';
