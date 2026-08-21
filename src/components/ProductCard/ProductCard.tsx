import { Star } from 'lucide-react';
import type React from 'react';
import { cn } from '../../lib/utils';
import { AddToCart } from '../AddToCart';
import { Badge } from '../Badge';
import { Image } from '../Image';
import { Price } from '../Price';

export interface ProductCardProps {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageAlt?: string;
  badge?: string;
  badgeColor?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  rating?: number;
  reviewsCount?: number;
  className?: string;
  onAddToCart?: (quantity: number) => void;
  onUpdateCart?: (quantity: number) => void;
  onRemoveFromCart?: () => void;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  originalPrice,
  imageUrl,
  imageAlt,
  badge,
  badgeColor = 'primary',
  rating,
  reviewsCount,
  className,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  cartQuantity = 0,
}) => {
  return (
    <div
      className={cn(
        'group relative flex w-full max-w-sm flex-col overflow-hidden rounded-(--radius-aurora) border border-aurora-border bg-aurora-surface transition-all hover:shadow-lg',
        className,
      )}
      data-product-id={`product-${id}`}
    >
      {/* Image Section */}
      <div className="relative w-full overflow-hidden bg-aurora-neutral-bg">
        {badge && (
          <div className="absolute left-3 top-3 z-20">
            <Badge color={badgeColor} variant="solid">
              {badge}
            </Badge>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          aspectRatio="1/1"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-sans text-lg font-bold text-aurora-text-primary">
          {title}
        </h3>

        {description && (
          <p className="mt-1 line-clamp-2 font-sans text-sm text-aurora-text-secondary">
            {description}
          </p>
        )}

        {/* Rating Section */}
        {(rating !== undefined || reviewsCount !== undefined) && (
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-aurora-warning text-aurora-warning" />
            {rating !== undefined && (
              <span className="font-sans text-sm font-medium text-aurora-text-primary">
                {rating}
              </span>
            )}
            {reviewsCount !== undefined && (
              <span className="font-sans text-sm text-aurora-text-secondary">({reviewsCount})</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
          {/* Price Section */}
          <Price
            value={price}
            originalValue={originalPrice}
            showDiscountBadge={false}
            size="medium"
            className="mb-4"
          />

          {/* Action Section */}
          <AddToCart
            initialQuantity={cartQuantity}
            onAdd={onAddToCart}
            onUpdate={onUpdateCart}
            onRemove={onRemoveFromCart}
          />
        </div>
      </div>
    </div>
  );
};
ProductCard.displayName = 'ProductCard';
