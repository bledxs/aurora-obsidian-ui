import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Etiqueta descriptiva superior
   */
  label?: string;
  /**
   * Estado of error (booleano) o mensaje of error (string)
   */
  error?: string | boolean;
  /**
   * Texto of ayuda en la parte inferior
   */
  helperText?: string;
  /**
   * Si es true, el input ocupará todo el ancho of su contenedor
   */
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth, className, id, ...props }, ref) => {
    // Generar un ID único en caso of que no se provea uno, para vincular el label al input
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const hasErrorMessage = hasError && typeof error === 'string';

    let ariaDescribedBy: string | undefined;
    if (hasErrorMessage) {
      ariaDescribedBy = `${inputId}-error`;
    } else if (helperText) {
      ariaDescribedBy = `${inputId}-helper`;
    }

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-sans text-[12px] font-semibold text-aurora-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative flex w-full">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'flex w-full font-sans text-[14px] text-aurora-text-primary bg-aurora-text-on-primary',
              'border border-aurora-border rounded-(--radius-aurora) px-4 py-2 transition-all outline-none',
              'placeholder:text-aurora-text-disabled',
              'hover:not-disabled:border-aurora-border-hover',
              'focus-visible:border-aurora-border-focus focus-visible:ring-[3px] focus-visible:ring-blue-500/15',
              'disabled:bg-aurora-bg-disabled disabled:text-aurora-text-disabled disabled:cursor-not-allowed disabled:border-aurora-border',
              hasError &&
                'border-aurora-error focus-visible:border-aurora-error focus-visible:ring-aurora-error/15 hover:not-disabled:border-aurora-error',
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={ariaDescribedBy}
            {...props}
          />
        </div>
        {(helperText || hasErrorMessage) && (
          <span
            id={hasError ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              'font-sans text-[12px]',
              hasError ? 'text-aurora-error' : 'text-aurora-text-secondary',
            )}
          >
            {hasErrorMessage ? error : helperText}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
