import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import styles from './AddToCart.module.css';

export interface AddToCartProps {
  initialQuantity?: number;
  maxQuantity?: number;
  isLoading?: boolean;
  onAdd?: (quantity: number) => void;
  onUpdate?: (quantity: number) => void;
  onRemove?: () => void;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  initialQuantity = 0,
  maxQuantity = 99,
  isLoading = false,
  onAdd,
  onUpdate,
  onRemove,
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
      <Button
        variant="primary"
        onClick={handleAddClick}
        disabled={isLoading}
        className={`${styles.container} ${styles.addButton}`}
      >
        {isLoading ? (
          <Spinner color="neutral" />
        ) : (
          <>
            <ShoppingCart size={18} aria-hidden="true" />
            Añadir al carrito
          </>
        )}
      </Button>
    );
  }

  return (
    <div className={`${styles.container} ${styles.stepperContainer}`}>
      <Button
        variant="outline"
        size="small"
        onClick={handleDecrement}
        disabled={isLoading}
        className={styles.stepperButton}
        aria-label="Disminuir cantidad"
      >
        {quantity === 1 ? (
          <Trash2 size={16} aria-hidden="true" />
        ) : (
          <Minus size={16} aria-hidden="true" />
        )}
      </Button>

      <span className={styles.quantityDisplay} aria-live="polite">
        {isLoading ? <Spinner color="neutral" /> : quantity}
      </span>

      <Button
        variant="outline"
        size="small"
        onClick={handleIncrement}
        disabled={isLoading || quantity >= maxQuantity}
        className={styles.stepperButton}
        aria-label="Aumentar cantidad"
      >
        <Plus size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};
