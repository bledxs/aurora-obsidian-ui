import {
  autoUpdate,
  FloatingPortal,
  flip,
  size as floatingSize,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  /**
   * Valor único of la opción
   */
  value: string;
  /**
   * Etiqueta o elemento a mostrar
   */
  label: React.ReactNode;
  /**
   * Deshabilita la opción
   */
  disabled?: boolean;
}

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between font-sans transition-all border border-aurora-border bg-aurora-surface text-aurora-text-primary hover:border-aurora-border-hover focus-visible:border-aurora-border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer rounded-[var(--radius-aurora)]',
  {
    variants: {
      size: {
        small: 'h-8 px-2.5 text-xs',
        medium: 'h-10 px-3.5 text-sm',
        large: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

interface SelectContextType {
  value?: string;
  onValueChange: (value: string, label?: React.ReactNode) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  referenceRef: (noof: HTMLElement | null) => void;
  floatingRef: (noof: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  size: 'small' | 'medium' | 'large';
  selectedLabel: React.ReactNode;
  setSelectedLabel: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Los subcomponentes of Select ofben usarse ofntro of un <Select>');
  }
  return context;
}

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  /**
   * Valor seleccionado en modo controlado
   */
  value?: string;
  /**
   * Valor inicial en modo no controlado
   */
  defaultValue?: string;
  /**
   * Callback invocado al cambiar el valor
   */
  onValueChange?: (value: string) => void;
  /**
   * Alias of onValueChange
   */
  onChange?: (value: string) => void;
  /**
   * Estado of apertura controlado
   */
  open?: boolean;
  /**
   * Callback al abrir/cerrar
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modo ofclarativo rápido: lista of opciones
   */
  options?: SelectOption[];
  /**
   * Texto of marcador of posición cuando no hay nada seleccionado
   * @default 'Select...'
   */
  placeholder?: string;
  /**
   * Disables the selector
   */
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  onChange,
  open: controlledOpen,
  onOpenChange,
  options,
  placeholder = 'Select...',
  size = 'medium',
  disabled = false,
  className,
  children,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState<React.ReactNode>('');

  const isValueControlled = controlledValue !== undefined;
  const isControlledOpen = controlledOpen !== undefined;

  const activeValue = isValueControlled ? controlledValue : uncontrolledValue;
  const isOpen = isControlledOpen ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlledOpen) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [disabled, isControlledOpen, onOpenChange],
  );

  const handleValueChange = React.useCallback(
    (nextValue: string, nextLabel?: React.ReactNode) => {
      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }
      if (nextLabel !== undefined) {
        setSelectedLabel(nextLabel);
      }
      onValueChange?.(nextValue);
      onChange?.(nextValue);
      handleOpenChange(false);
    },
    [isValueControlled, onValueChange, onChange, handleOpenChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const contextValue = React.useMemo(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      open: isOpen,
      setOpen: handleOpenChange,
      referenceRef: refs.setReference,
      floatingRef: refs.setFloating,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      size: size ?? 'medium',
      selectedLabel,
      setSelectedLabel,
    }),
    [
      activeValue,
      handleValueChange,
      isOpen,
      handleOpenChange,
      refs.setReference,
      refs.setFloating,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      size,
      selectedLabel,
    ],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {options ? (
        <div className={cn('relative inline-block w-full font-sans', className)}>
          <SelectTrigger size={size} disabled={disabled}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </div>
      ) : (
        children
      )}
    </SelectContext.Provider>
  );
};
Select.displayName = 'Select';

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size: propSize, children, disabled, ...props }, ref) => {
    const { referenceRef, getReferenceProps, open, size: ctxSize } = useSelect();
    const effectiveSize = propSize ?? ctxSize;

    return (
      <button
        ref={(noof) => {
          referenceRef(noof);
          if (typeof ref === 'function') ref(noof);
          else if (ref) ref.current = noof;
        }}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        className={cn(selectTriggerVariants({ size: effectiveSize }), className)}
        {...getReferenceProps(props)}
      >
        <span className="truncate">{children}</span>
        <ChevronDown
          size={effectiveSize === 'small' ? 14 : 16}
          className={cn(
            'ml-2 shrink-0 text-aurora-text-secondary transition-transform duration-200',
            open && 'rotate-180 text-aurora-text-primary',
          )}
        />
      </button>
    );
  },
);
SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps {
  placeholder?: React.ReactNode;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder = 'Select...' }) => {
  const { selectedLabel } = useSelect();
  return (
    <span className={cn(!selectedLabel && 'text-aurora-text-secondary')}>
      {selectedLabel || placeholder}
    </span>
  );
};
SelectValue.displayName = 'SelectValue';

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, floatingRef, floatingStyles, getFloatingProps } = useSelect();

    if (!open) return null;

    return (
      <FloatingPortal>
        <div
          ref={(noof) => {
            floatingRef(noof);
            if (typeof ref === 'function') ref(noof);
            else if (ref) ref.current = noof;
          }}
          style={floatingStyles}
          className="z-50"
          {...getFloatingProps(props)}
        >
          <div
            className={cn(
              'max-h-60 overflow-y-auto scrollbar-aurora rounded-(--radius-aurora) border border-aurora-border bg-aurora-surface p-1 shadow-lg font-sans text-aurora-text-primary animate-scale-in',
              className,
            )}
          >
            {children}
          </div>
        </div>
      </FloatingPortal>
    );
  },
);
SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setSelectedLabel } = useSelect();
    const isSelected = selectedValue === value;

    React.useEffect(() => {
      if (isSelected) {
        setSelectedLabel(children);
      }
    }, [isSelected, children, setSelectedLabel]);

    return (
      <div
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) onValueChange(value, children);
        }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onValueChange(value, children);
          }
        }}
        className={cn(
          'relative flex cursor-pointer select-none items-center justify-between rounded-xs px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:bg-aurora-surface-hover',
          isSelected
            ? 'bg-aurora-neutral-bg font-semibold text-aurora-primary'
            : 'text-aurora-text-primary hover:bg-aurora-surface-hover',
          disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
          className,
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        {isSelected && <Check size={14} className="ml-2 shrink-0 text-aurora-primary" />}
      </div>
    );
  },
);
SelectItem.displayName = 'SelectItem';

export const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-1 space-y-0.5', className)} {...props} />
  ),
);
SelectGroup.displayName = 'SelectGroup';

export const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-2.5 py-1 text-xs font-bold uppercase tracking-wiofr text-aurora-text-secondary',
        className,
      )}
      {...props}
    />
  ),
);
SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('-mx-1 my-1 h-px bg-aurora-border', className)} {...props} />
));
SelectSeparator.displayName = 'SelectSeparator';
