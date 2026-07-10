import type React from 'react';
import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Etiqueta del checkbox
   */
  label?: React.ReactNode;
  /**
   * Estado de error (booleano) o mensaje de error
   */
  error?: string | boolean;
  /**
   * Texto de ayuda inferior
   */
  helperText?: string;
  /**
   * Estado indeterminado (guion en lugar de palomita)
   */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, indeterminate, className, id, ...props }, forwardedRef) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error;

    // Referencia interna necesaria para poder setear la propiedad indeterminate dinámicamente
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id={checkboxId}
            ref={internalRef}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError && typeof error === 'string'
                ? `${checkboxId}-error`
                : helperText
                  ? `${checkboxId}-helper`
                  : undefined
            }
            {...props}
          />
          <div className={`${styles.control} ${hasError ? styles.controlError : ''}`}>
            <svg
              className={styles.icon}
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {indeterminate ? (
                <line x1="5" y1="12" x2="19" y2="12" />
              ) : (
                <polyline points="20 6 9 17 4 12" />
              )}
            </svg>
          </div>
          {label && (
            <label htmlFor={checkboxId} className={styles.label}>
              {label}
            </label>
          )}
        </div>

        {hasError && typeof error === 'string' ? (
          <p id={`${checkboxId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${checkboxId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
