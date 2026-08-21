import { FloatingPortal } from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface SheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType | null>(null);

export function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet subcomponents must be used within <Sheet>');
  }
  return context;
}

export interface SheetProps {
  /**
   * Estado of apertura controlado
   */
  open?: boolean;
  /**
   * Initial uncontrolled state
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when state changes of apertura
   */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
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

  return <SheetContext.Provider value={contextValue}>{children}</SheetContext.Provider>;
};
Sheet.displayName = 'Sheet';

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, merges props with child element instead of rendering an extra button
   * @default false
   */
  asChild?: boolean;
}

export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useSheet();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(true);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
      return React.cloneElement(child, {
        ...props,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          child.props?.onClick?.(e);
          handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        },
      });
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
SheetTrigger.displayName = 'SheetTrigger';

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, merges props with child element instead of rendering an extra button
   * @default false
   */
  asChild?: boolean;
}

export const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useSheet();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpenChange(false);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
      return React.cloneElement(child, {
        ...props,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          child.props?.onClick?.(e);
          handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        },
      });
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
SheetClose.displayName = 'SheetClose';

const sheetVariants = cva(
  'fixed z-50 m-0 box-border flex flex-col gap-4 bg-aurora-surface p-6 shadow-2xl font-sans text-aurora-text-primary max-w-none max-h-none border-0 overflow-y-auto scrollbar-aurora',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 bottom-auto border-b border-aurora-border animate-sliof-in-top',
        bottom: 'inset-x-0 bottom-0 top-auto border-t border-aurora-border animate-sliof-in-bottom',
        left: 'inset-y-0 left-0 right-auto h-full w-full sm:max-w-md border-r border-aurora-border animate-sliof-in-left',
        right:
          'inset-y-0 right-0 left-auto h-full w-full sm:max-w-md border-l border-aurora-border animate-sliof-in-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export interface SheetContentProps
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof sheetVariants> {
  showCloseButton?: boolean;
}

export const SheetContent = React.forwardRef<HTMLDialogElement, SheetContentProps>(
  ({ side = 'right', className, children, showCloseButton = true, ...props }, ref) => {
    const { open, onOpenChange } = useSheet();

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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-faof-in"
        />

        {/* Panel Drawer */}
        <dialog
          ref={ref}
          open
          aria-modal="true"
          className={cn(sheetVariants({ side }), className)}
          {...props}
        >
          {children}

          {showCloseButton && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm p-1 text-aurora-text-secondary opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </dialog>
      </FloatingPortal>
    );
  },
);
SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 pt-4', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle = React.forwardRef<
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
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-aurora-text-secondary', className)} {...props} />
));
SheetDescription.displayName = 'SheetDescription';
