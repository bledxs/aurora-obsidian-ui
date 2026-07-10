import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Etiqueta descriptiva superior
   */
  label?: string;
  /**
   * Estado de error (booleano) o mensaje de error (string)
   */
  error?: string | boolean;
  /**
   * Texto de ayuda en la parte inferior
   */
  helperText?: string;
  /**
   * Si es true, el input ocupará todo el ancho de su contenedor
   */
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth, className, id, ...props }, ref) => {
    // Generar un ID único en caso de que no se provea uno, para vincular el label al input
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <input
            id={inputId}
            ref={ref}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError && typeof error === 'string'
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>
        {hasError && typeof error === 'string' ? (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
