import { Trash2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Image } from '../Image';
import { Price } from '../Price';
import { QuantitySelector } from '../QuantitySelector';

export interface CartItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Unique product identifier (optional when using React list keys)
   */
  id?: string | number;
  /**
   * Product name / title
   */
  title: string;
  /**
   * Unit price
   */
  price: number;
  /**
   * Previous unit price before discount (optional)
   */
  originalPrice?: number;
  /**
   * Current quantity in cart
   */
  quantity: number;
  /**
   * Maximum allowed quantity
   * @default 99
   */
  maxQuantity?: number;
  /**
   * Product image URL
   */
  imageUrl?: string;
  /**
   * Product image URL alias
   */
  imageSrc?: string;
  /**
   * Alternative text for product image
   */
  imageAlt?: string;
  /**
   * Variant description (e.g. "Size: M • Color: Black")
   */
  variantDescription?: string;
  /**
   * Variant title alias (e.g. "Size: M • Color: Black")
   */
  variantTitle?: string;
  /**
   * Variant name alias
   */
  variant?: string;
  /**
   * Callback fired when quantity changes
   */
  onQuantityChange?: (quantity: number) => void;
  /**
   * Callback fired when remove button is clicked
   */
  onRemove?: () => void;
  /**
   * Loading / button disabled state
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
      imageSrc,
      imageAlt,
      variantDescription,
      variantTitle,
      variant,
      onQuantityChange,
      onRemove,
      isLoading = false,
      className,
      ...props
    },
    ref,
  ) => {
    const finalImage = imageSrc || imageUrl || '';
    const finalVariant = variantTitle || variantDescription || variant;

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 border-b border-aurora-border py-3 font-sans text-aurora-text-primary last:border-b-0',
          className,
        )}
        {...props}
      >
        {/* Product thumbnail */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-(--radius-aurora) bg-aurora-neutral-bg">
          <Image
            src={finalImage}
            alt={imageAlt || title}
            aspectRatio="1/1"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>

        {/* Details & Controls */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between gap-2">
            <div>
              <h4 className="line-clamp-1 text-sm font-semibold text-aurora-text-primary">
                {title}
              </h4>
              {finalVariant && (
                <p className="mt-0.5 text-xs text-aurora-text-secondary">{finalVariant}</p>
              )}
            </div>

            {/* Quick remove button */}
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                disabled={isLoading}
                aria-label={`Remove ${title} from cart`}
                className="rounded-xs p-1 text-aurora-text-secondary transition-colors hover:text-aurora-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {/* Quantity controller stepper */}
            <QuantitySelector
              value={quantity}
              min={1}
              max={maxQuantity}
              showTrashOnMin
              onChange={onQuantityChange}
              onRemove={onRemove}
              disabled={isLoading}
              size="small"
            />

            {/* Cumulative item total price */}
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
