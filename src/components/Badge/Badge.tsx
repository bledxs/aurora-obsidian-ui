import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Color semántico del badge
   * @default 'neutral'
   */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  /**
   * Estilo visual del badge
   * @default 'solid'
   */
  variant?: 'solid' | 'subtle' | 'outline';
  /**
   * Tamaño del badge
   * @default 'medium'
   */
  size?: 'small' | 'medium';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { color = 'neutral', variant = 'solid', size = 'medium', className, children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={`${styles.badge} ${styles[size]} ${styles[color]} ${styles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
