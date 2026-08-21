import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const switchTrackVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-aurora-border-focus peer-focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        small: 'h-4 w-7',
        medium: 'h-6 w-11',
        large: 'h-7 w-14',
      },
      checked: {
        true: 'bg-aurora-primary',
        false: 'bg-aurora-border/80 hover:bg-aurora-border',
      },
    },
    defaultVariants: {
      size: 'medium',
      checked: false,
    },
  },
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out flex items-center justify-center text-aurora-primary',
  {
    variants: {
      size: {
        small: 'h-3 w-3 data-[checked=true]:translate-x-3',
        medium: 'h-5 w-5 data-[checked=true]:translate-x-5',
        large: 'h-6 w-6 data-[checked=true]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchTrackVariants> {
  /**
   * Estado controlado del interruptor
   */
  checked?: boolean;
  /**
   * Estado inicial no controlado
   */
  defaultChecked?: boolean;
  /**
   * Callback invocado cuando cambia el estado
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Icono opcional dentro del pulgar
   */
  thumbIcon?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onChange,
      disabled = false,
      size = 'medium',
      thumbIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const autoId = React.useId();
    const inputId = id ?? autoId;

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextChecked = e.target.checked;
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
      onChange?.(e);
    };

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'relative inline-flex items-center select-none font-sans',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          checked={checked}
          disabled={disabled}
          onChange={handleToggle}
          aria-checked={checked}
          className="peer sr-only"
          {...props}
        />
        <div
          aria-hidden="true"
          className={cn(
            switchTrackVariants({ size, checked }),
            disabled && 'cursor-not-allowed',
            className,
          )}
        >
          <span data-checked={checked} className={cn(switchThumbVariants({ size }))}>
            {thumbIcon}
          </span>
        </div>
      </label>
    );
  },
);
Switch.displayName = 'Switch';

export interface SwitchCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Fila o tarjeta con interruptor integrada para preferencias y checkout
 */
export const SwitchCard = React.forwardRef<HTMLDivElement, SwitchCardProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      title,
      description,
      icon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = React.useId();
    const switchId = id ?? autoId;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between gap-4 rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-4 font-sans transition-colors',
          disabled && 'opacity-50',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-3 select-none">
          {icon && <div className="mt-0.5 shrink-0 text-aurora-primary">{icon}</div>}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor={switchId}
              className={cn(
                'text-sm font-semibold text-aurora-text-primary',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              {title}
            </label>
            {description && <p className="text-xs text-aurora-text-secondary">{description}</p>}
          </div>
        </div>

        <Switch
          id={switchId}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
      </div>
    );
  },
);
SwitchCard.displayName = 'SwitchCard';
