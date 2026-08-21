import { Circle } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation: 'vertical' | 'horizontal';
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      'Los subcomponentes de RadioGroup deben ser usados dentro de un <RadioGroup />',
    );
  }
  return context;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      onChange,
      name: customName,
      disabled = false,
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const autoName = React.useId();
    const name = customName ?? autoName;

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (disabled) return;
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
        onChange?.(nextValue);
      },
      [disabled, isControlled, onValueChange, onChange],
    );

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        name,
        disabled,
        orientation,
      }),
      [value, handleValueChange, name, disabled, orientation],
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-disabled={disabled}
          className={cn(
            'flex font-sans',
            orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, disabled: itemDisabled, className, id, ...props }, ref) => {
    const context = useRadioGroupContext();
    const isChecked = context.value === value;
    const isDisabled = context.disabled || itemDisabled;
    const autoId = React.useId();
    const inputId = id ?? autoId;

    return (
      <div className="relative inline-flex items-center justify-center">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => {
            if (!isDisabled) context.onValueChange(value);
          }}
          className="peer sr-only"
          {...props}
        />
        <div
          aria-hidden="true"
          className={cn(
            'aspect-square h-4 w-4 rounded-full border border-aurora-border shadow-xs transition-all flex items-center justify-center cursor-pointer',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-aurora-border-focus peer-focus-visible:ring-offset-2',
            isChecked
              ? 'border-aurora-primary bg-aurora-primary text-white'
              : 'bg-white hover:border-aurora-border-hover',
            isDisabled && 'cursor-not-allowed opacity-50 bg-aurora-neutral-bg',
            className,
          )}
        >
          {isChecked && <Circle className="h-2 w-2 fill-white text-white" />}
        </div>
      </div>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroupItem';

export interface RadioGroupCardProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  disabled?: boolean;
}

/**
 * Tarjeta seleccionable enriquecida para métodos de pago y opciones de envío de e-commerce
 */
export const RadioGroupCard = React.forwardRef<HTMLLabelElement, RadioGroupCardProps>(
  ({ value, disabled: itemDisabled, className, children, id, ...props }, ref) => {
    const context = useRadioGroupContext();
    const isChecked = context.value === value;
    const isDisabled = context.disabled || itemDisabled;
    const autoId = React.useId();
    const itemId = id ?? autoId;

    return (
      <label
        ref={ref}
        htmlFor={itemId}
        data-checked={isChecked}
        data-disabled={isDisabled}
        className={cn(
          'group relative flex cursor-pointer items-start gap-3.5 rounded-[var(--radius-aurora)] border p-4 transition-all font-sans',
          isChecked
            ? 'border-aurora-primary bg-aurora-primary/5 ring-1 ring-aurora-primary'
            : 'border-aurora-border bg-aurora-surface hover:border-aurora-border-hover hover:bg-aurora-surface-hover/50',
          isDisabled && 'cursor-not-allowed opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        <RadioGroupItem
          id={itemId}
          value={value}
          disabled={isDisabled}
          className="mt-0.5 shrink-0"
        />
        <div className="flex flex-1 flex-col gap-0.5 select-none">{children}</div>
      </label>
    );
  },
);
RadioGroupCard.displayName = 'RadioGroupCard';
