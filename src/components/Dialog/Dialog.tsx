import { FloatingPortal } from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

export function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Los subcomponentes de Dialog deben usarse dentro de un <Dialog>');
  }
  return context;
}

export interface DialogProps {
  /**
   * Estado de apertura controlado
   */
  open?: boolean;
  /**
   * Estado inicial no controlado
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback invocado cuando cambia el estado de apertura
   */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = React.useMemo(
    () => ({ open, onOpenChange: handleOpenChange }),
    [open, handleOpenChange],
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
};
Dialog.displayName = 'Dialog';

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, children, ...props }, ref) => {
    const { onOpenChange } = useDialog();
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onOpenChange(true);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DialogTrigger.displayName = 'DialogTrigger';

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, children, ...props }, ref) => {
  const { onOpenChange } = useDialog();
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onOpenChange(false);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
});
DialogClose.displayName = 'DialogClose';

const dialogVariants = cva(
  'pointer-events-auto relative z-50 m-0 box-border flex w-full flex-col gap-4 rounded-[calc(var(--radius-aurora)*1.5)] border border-aurora-border bg-aurora-surface p-6 shadow-2xl font-sans text-aurora-text-primary border-0 max-h-[85vh] overflow-y-auto animate-scale-in',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
        '2xl': 'max-w-3xl',
        full: 'max-w-5xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface DialogContentProps
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof dialogVariants> {
  /**
   * Si es false, oculta el botón 'X' en la esquina superior derecha
   * @default true
   */
  showCloseButton?: boolean;
}

export const DialogContent = React.forwardRef<HTMLDialogElement, DialogContentProps>(
  ({ size = 'md', className, children, showCloseButton = true, ...props }, ref) => {
    const { open, onOpenChange } = useDialog();

    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
      <FloatingPortal>
        {/* Overlay / Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-fade-in"
        />

        {/* Centering Flexbox Wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          {/* Modal Dialog */}
          <dialog
            ref={ref}
            open
            aria-modal="true"
            className={cn(dialogVariants({ size }), className)}
            {...props}
          >
            {children}

            {showCloseButton && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 z-10 rounded-sm p-1 text-aurora-text-secondary opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus cursor-pointer bg-aurora-surface/80 backdrop-blur-xs"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </dialog>
        </div>
      </FloatingPortal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 pt-4',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-aurora-text-primary', className)}
    {...props}
  >
    {children}
  </h2>
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-aurora-text-secondary', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';
