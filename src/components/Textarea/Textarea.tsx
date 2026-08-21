import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Etiqueta superior del campo de texto
   */
  label?: string;
  /**
   * Texto de ayuda o descripción inferior
   */
  helperText?: string;
  /**
   * Mensaje de error (activa automáticamente el estado de error)
   */
  errorMessage?: string;
  /**
   * Si es true, fuerza el estilo de validación errónea
   */
  isError?: boolean;
  /**
   * Si es true, muestra un contador numérico de caracteres (útil junto a maxLength)
   * @default false
   */
  showCount?: boolean;
  /**
   * Si es true, ajusta automáticamente la altura del área de texto al escribir
   * @default false
   */
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      isError = false,
      showCount = false,
      autoResize = false,
      maxLength,
      disabled = false,
      value,
      defaultValue,
      onChange,
      rows = 3,
      id,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const autoId = React.useId();
    const textareaId = id ?? autoId;

    const [charCount, setCharCount] = React.useState<number>(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });

    const hasError = isError || Boolean(errorMessage);

    const handleResize = React.useCallback(() => {
      const textarea = internalRef.current;
      if (!textarea || !autoResize) return;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }, [autoResize]);

    React.useEffect(() => {
      handleResize();
    }, [handleResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (autoResize) handleResize();
      onChange?.(e);
    };

    return (
      <div className="w-full font-sans space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-aurora-text-primary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={textareaId}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              errorMessage ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            className={cn(
              'flex w-full rounded-[var(--radius-aurora)] border bg-white px-3 py-2 text-sm text-aurora-text-primary placeholder:text-aurora-text-disabled shadow-2xs transition-colors scrollbar-aurora focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-aurora-bg-disabled disabled:opacity-60 dark:bg-slate-900',
              hasError
                ? 'border-aurora-error focus-visible:border-aurora-error focus-visible:ring-aurora-error/20'
                : 'border-aurora-border hover:border-aurora-border-hover focus-visible:border-aurora-border-focus focus-visible:ring-aurora-border-focus/20',
              autoResize && 'resize-none overflow-hidden',
              className,
            )}
            {...props}
          />
        </div>

        {(helperText || errorMessage || showCount) && (
          <div className="flex items-center justify-between text-xs pt-0.5">
            <div className="flex-1">
              {errorMessage ? (
                <p id={`${textareaId}-error`} className="text-aurora-error font-medium">
                  {errorMessage}
                </p>
              ) : helperText ? (
                <p id={`${textareaId}-helper`} className="text-aurora-text-secondary">
                  {helperText}
                </p>
              ) : null}
            </div>

            {showCount && (
              <span
                className={cn(
                  'text-[11px] tabular-nums shrink-0 ml-2 font-mono',
                  maxLength && charCount >= maxLength
                    ? 'text-aurora-error font-semibold'
                    : 'text-aurora-text-secondary',
                )}
              >
                {charCount}
                {maxLength ? ` / ${maxLength}` : ''}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
