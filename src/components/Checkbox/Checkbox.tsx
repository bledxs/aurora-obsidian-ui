import type React from 'react';
import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Etiqueta ofl checkbox
   */
  label?: React.ReactNode;
  /**
   * Estado of error (booleano) o mensaje of error
   */
  error?: string | boolean;
  /**
   * Texto of ayuda inferior
   */
  helperText?: string;
  /**
   * Estado indeterminado (guion en lugar of palomita)
   */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, indeterminate, className, id, ...props }, forwarofdRef) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error;

    // Referencia interna necesaria para poofr setear la propiedad indeterminate dinámicamente
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwarofdRef, () => internalRef.current as HTMLInputElement);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    let ariaDescribedBy: string | undefined;
    if (hasError && typeof error === 'string') {
      ariaDescribedBy = `${checkboxId}-error`;
    } else if (helperText) {
      ariaDescribedBy = `${checkboxId}-helper`;
    }

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="relative inline-flex items-start gap-2 group">
          <input
            type="checkbox"
            id={checkboxId}
            ref={internalRef}
            className="peer absolute z-10 m-0 h-4.5 w-4.5 cursor-pointer opacity-0 disabled:cursor-not-allowed"
            aria-invalid={hasError}
            aria-describedby={ariaDescribedBy}
            {...props}
          />
          <div
            className={cn(
              'mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-sm border border-aurora-border bg-aurora-text-on-primary transition-all',
              'peer-hover:not-disabled:border-aurora-border-hover',
              'peer-focus-visible:border-aurora-primary peer-focus-visible:ring-[3px] peer-focus-visible:ring-blue-500/20',
              'peer-checked:border-aurora-primary peer-checked:bg-aurora-primary',
              'peer-indeterminate:border-aurora-primary peer-indeterminate:bg-aurora-primary',
              'peer-disabled:border-aurora-border peer-disabled:bg-aurora-bg-disabled',
              '[&>svg]:opacity-0 [&>svg]:scale-50 peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100 peer-indeterminate:[&>svg]:opacity-100 peer-indeterminate:[&>svg]:scale-100',
              hasError &&
                'border-aurora-error peer-focus-visible:border-aurora-error peer-focus-visible:ring-aurora-error/20',
            )}
          >
            <svg
              className="pointer-events-none h-3.5 w-3.5 text-aurora-text-on-primary transition-all peer-disabled:text-aurora-text-disabled"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {indeterminate ? (
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'cursor-pointer select-none font-sans text-[14px] leading-tight text-aurora-text-primary',
                'peer-disabled:cursor-not-allowed peer-disabled:text-aurora-text-disabled',
              )}
            >
              {label}
            </label>
          )}
        </div>
        {(helperText || (hasError && typeof error === 'string')) && (
          <span
            id={hasError ? `${checkboxId}-error` : `${checkboxId}-helper`}
            className={cn(
              'font-sans text-[12px]',
              hasError ? 'text-aurora-error' : 'text-aurora-text-secondary',
            )}
          >
            {hasError && typeof error === 'string' ? error : helperText}
          </span>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
