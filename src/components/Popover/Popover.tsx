import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  // biome-ignore lint/suspicious/noExplicitAny: retorno compuesto de Floating UI
  floating: any;
  // biome-ignore lint/suspicious/noExplicitAny: retorno compuesto de Floating UI
  interactions: any;
  labelId?: string;
  descriptionId?: string;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopoverContext debe ser usado dentro de un <Popover />');
  }
  return context;
}

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  offsetDistance?: number;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  offsetDistance = 8,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetDistance),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, { role: 'dialog' });

  const interactions = useInteractions([click, dismiss, role]);

  const labelId = useId();
  const descriptionId = useId();

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      floating,
      interactions,
      labelId,
      descriptionId,
    }),
    [open, setOpen, floating, interactions, labelId, descriptionId],
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
};
Popover.displayName = 'Popover';

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const context = usePopoverContext();
    const { getReferenceProps } = context.interactions;
    const referenceRef = context.floating.refs.setReference;

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      return React.cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        getReferenceProps({
          // biome-ignore lint/suspicious/noExplicitAny: cloneElement ref assignment
          ref: (node: any) => {
            referenceRef(node);
            const childRef = (
              children as React.ReactElement & {
                ref?: React.RefCallback<HTMLElement> | React.MutableRefObject<HTMLElement | null>;
              }
            ).ref;
            if (typeof childRef === 'function') childRef(node);
            else if (childRef && 'current' in childRef) childRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          },
          ...props,
          ...childProps,
        }),
      );
    }

    return (
      <button
        ref={(node) => {
          referenceRef(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        type="button"
        className={cn(
          'inline-flex items-center justify-center font-sans focus-visible:outline-none',
          className,
        )}
        {...getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);
PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Muestra un botón de cierre 'X' en la esquina superior derecha
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * Si es true, previene el cierre al interactuar fuera
   * @default false
   */
  modal?: boolean;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, showCloseButton = false, modal = false, ...props }, ref) => {
    const context = usePopoverContext();
    const { getFloatingProps } = context.interactions;
    const floatingRef = context.floating.refs.setFloating;

    if (!context.open) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context.floating.context} modal={modal} initialFocus={-1}>
          {/* Contenedor exterior exclusivo para posicionamiento 3D */}
          <div
            ref={(node) => {
              floatingRef(node);
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            style={context.floating.floatingStyles}
            className="z-50 outline-none"
            {...getFloatingProps(props)}
          >
            {/* Contenedor interior con animaciones y estilos de Aurora */}
            <div
              className={cn(
                'relative w-72 rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-4 text-aurora-text-primary shadow-xl font-sans animate-scale-in',
                className,
              )}
            >
              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => context.setOpen(false)}
                  aria-label="Cerrar ventana emergente"
                  className="absolute right-3 top-3 rounded-xs p-1 text-aurora-text-secondary hover:bg-aurora-surface-hover hover:text-aurora-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
                >
                  <X size={15} />
                </button>
              )}
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
PopoverContent.displayName = 'PopoverContent';

export const PopoverHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col space-y-1 text-left pb-3 border-b border-aurora-border/50 mb-3',
      className,
    )}
    {...props}
  />
);
PopoverHeader.displayName = 'PopoverHeader';

export const PopoverTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  const context = usePopoverContext();
  return (
    <h4
      id={context.labelId}
      className={cn('text-sm font-semibold text-aurora-text-primary leading-none', className)}
      {...props}
    />
  );
};
PopoverTitle.displayName = 'PopoverTitle';

export const PopoverDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => {
  const context = usePopoverContext();
  return (
    <p
      id={context.descriptionId}
      className={cn('text-xs text-aurora-text-secondary', className)}
      {...props}
    />
  );
};
PopoverDescription.displayName = 'PopoverDescription';

export const PopoverClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  onClick,
  children,
  ...props
}) => {
  const context = usePopoverContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        context.setOpen(false);
        onClick?.(e);
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius-aurora)] text-xs font-semibold px-3 py-1.5 transition-colors focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
PopoverClose.displayName = 'PopoverClose';
