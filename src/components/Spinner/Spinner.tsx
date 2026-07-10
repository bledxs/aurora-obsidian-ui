import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tamaño del spinner
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color del spinner
   * @default 'primary'
   */
  color?: 'primary' | 'white' | 'neutral';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'medium', color = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.spinnerContainer} ${styles[size]} ${styles[color]} ${className || ''}`}
        role="status"
        aria-label="Cargando"
        {...props}
      >
        <svg
          className={styles.spinnerSvg}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.spinnerTrack}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={styles.spinnerHead}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className={styles.srOnly}>Cargando...</span>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';
