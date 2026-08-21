import { ShoppingCart } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
import { QuantitySelector } from '../QuantitySelector';
import { Spinner } from '../Spinner';

export interface AddToCartProps {
  initialQuantity?: number;
  maxQuantity?: number;
  isLoading?: boolean;
  onAdd?: (quantity: number) => void;
  onUpdate?: (quantity: number) => void;
  onRemove?: () => void;
  className?: string;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  initialQuantity = 0,
  maxQuantity = 99,
  isLoading = false,
  onAdd,
  onUpdate,
  onRemove,
  className,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddClick = () => {
    const newQuantity = 1;
    setQuantity(newQuantity);
    onAdd?.(newQuantity);
  };

  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
    onUpdate?.(newQty);
  };

  const handleRemove = () => {
    setQuantity(0);
    onRemove?.();
  };

  if (quantity === 0) {
    return (
      <div className={cn('h-9 w-full min-w-40', className)}>
        <Button
          variant="primary"
          onClick={handleAddClick}
          disabled={isLoading}
          className="flex h-full w-full items-center justify-center gap-2"
        >
          {isLoading ? (
            <Spinner size="small" color="white" />
          ) : (
            <>
              <ShoppingCart size={16} />
              Add
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('h-9 w-full min-w-40', className)}>
      <QuantitySelector
        value={quantity}
        min={1}
        max={maxQuantity}
        showTrashOnMin
        onChange={handleQuantityChange}
        onRemove={handleRemove}
        disabled={isLoading}
        size="medium"
        className="h-full w-full border-aurora-primary shadow-[0_0_0_1px_var(--color-aurora-primary)]"
      />
    </div>
  );
};
AddToCart.displayName = 'AddToCart';
