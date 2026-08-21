import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../Button';
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
    if (onAdd) onAdd(newQuantity);
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onUpdate) onUpdate(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onUpdate) onUpdate(newQuantity);
    } else {
      setQuantity(0);
      if (onRemove) onRemove();
    }
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
              Añadir
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('h-9 w-full min-w-40', className)}>
      <div className="flex h-full w-full items-center justify-between gap-2 rounded-(--radius-aurora) border border-aurora-primary bg-aurora-surface p-1 shadow-[0_0_0_1px_var(--color-aurora-primary)]">
        <Button
          variant="outline"
          onClick={handleDecrement}
          disabled={isLoading}
          className="flex aspect-square h-full items-center justify-center border-transparent p-0 hover:border-transparent hover:bg-aurora-surface-hover"
        >
          {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
        </Button>

        <div className="flex min-w-8 grow items-center justify-center text-center font-sans text-[14px] font-bold text-aurora-text-primary">
          {isLoading ? <Spinner size="small" color="primary" /> : quantity}
        </div>

        <Button
          variant="outline"
          onClick={handleIncrement}
          disabled={isLoading || quantity >= maxQuantity}
          className="flex aspect-square h-full items-center justify-center border-transparent p-0 hover:border-transparent hover:bg-aurora-surface-hover"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};
