import { Minus, Plus, Trash2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Image } from '../Image';
import { Price } from '../Price';

export interface CartItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Identificador único del producto
   */
  id: string | number;
  /**
   * Nombre del producto
   */
  title: string;
  /**
   * Precio unitario
   */
  price: number;
  /**
   * Precio original unitario antes de descuento (opcional)
   */
  originalPrice?: number;
  /**
   * Cantidad actual en el carrito
   */
  quantity: number;
  /**
   * Cantidad máxima permitida
   * @default 99
   */
  maxQuantity?: number;
  /**
   * URL de la imagen del producto
   */
  imageUrl: string;
  /**
   * Texto alternativo para la imagen
   */
  imageAlt?: string;
  /**
   * Descripción de variante (ej. "Talla: M • Color: Negro")
   */
  variantDescription?: string;
  /**
   * Callback al modificar la cantidad
   */
  onQuantityChange?: (quantity: number) => void;
  /**
   * Callback al hacer clic en eliminar
   */
  onRemove?: () => void;
  /**
   * Estado de carga/bloqueo de botones
   * @default false
   */
  isLoading?: boolean;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      id,
      title,
      price,
      originalPrice,
      quantity,
      maxQuantity = 99,
      imageUrl,
      imageAlt,
      variantDescription,
      onQuantityChange,
      onRemove,
      isLoading = false,
      className,
      ...props
    },
    ref,
  ) => {
    const handleIncrement = () => {
      if (quantity < maxQuantity && onQuantityChange) {
        onQuantityChange(quantity + 1);
      }
    };

    const handleDecrement = () => {
      if (quantity > 1 && onQuantityChange) {
        onQuantityChange(quantity - 1);
      } else if (quantity === 1 && onRemove) {
        onRemove();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 border-b border-aurora-border py-3 font-sans text-aurora-text-primary last:border-b-0',
          className,
        )}
        {...props}
      >
        {/* Imagen miniatura */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-(--radius-aurora) bg-aurora-neutral-bg">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            aspectRatio="1/1"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>

        {/* Información y Controles */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between gap-2">
            <div>
              <h4 className="line-clamp-1 text-sm font-semibold text-aurora-text-primary">
                {title}
              </h4>
              {variantDescription && (
                <p className="mt-0.5 text-xs text-aurora-text-secondary">{variantDescription}</p>
              )}
            </div>

            {/* Botón eliminar rápido */}
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                disabled={isLoading}
                aria-label={`Eliminar ${title} del carrito`}
                className="rounded-xs p-1 text-aurora-text-secondary transition-colors hover:text-aurora-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {/* Stepper compacto */}
            <div className="flex h-7 items-center rounded-(--radius-aurora) border border-aurora-border bg-aurora-surface">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={isLoading}
                aria-label="Disminuir cantidad"
                className="flex h-full w-7 items-center justify-center rounded-l-(--radius-aurora) text-aurora-text-secondary transition-colors hover:bg-aurora-surface-hover hover:text-aurora-text-primary disabled:opacity-50"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-6 text-center text-xs font-bold text-aurora-text-primary">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={isLoading || quantity >= maxQuantity}
                aria-label="Aumentar cantidad"
                className="flex h-full w-7 items-center justify-center rounded-r-(--radius-aurora) text-aurora-text-secondary transition-colors hover:bg-aurora-surface-hover hover:text-aurora-text-primary disabled:opacity-50"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Precio acumulado */}
            <Price
              value={price * quantity}
              originalValue={originalPrice ? originalPrice * quantity : undefined}
              size="small"
            />
          </div>
        </div>
      </div>
    );
  },
);
CartItem.displayName = 'CartItem';
