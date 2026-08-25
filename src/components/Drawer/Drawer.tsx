import { FloatingPortal } from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface DrawerContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = React.createContext<DrawerContextType | null>(null);

export function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer subcomponents must be used within <Drawer>');
  }
  return context;
}

export interface DrawerProps {
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Initial uncontrolled open state
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
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

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
};
Drawer.displayName = 'Drawer';

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, merges props with child element instead of rendering an extra button
   * @default false
   */
  asChild?: boolean;
}

export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useDrawer();

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
DrawerTrigger.displayName = 'DrawerTrigger';

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, merges props with child element instead of rendering an extra button
   * @default false
   */
  asChild?: boolean;
}

export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ asChild = false, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useDrawer();

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
DrawerClose.displayName = 'DrawerClose';

const drawerVariants = cva(
  'fixed inset-x-0 bottom-0 z-50 m-0 box-border flex flex-col bg-aurora-surface shadow-2xl font-sans text-aurora-text-primary rounded-t-[calc(var(--radius-aurora)*2.5)] border-t border-aurora-border outline-none transition-all duration-300 animate-slide-in-bottom',
  {
    variants: {
      height: {
        auto: 'max-h-[85vh]',
        half: 'h-[50vh] max-h-[50vh]',
        tall: 'h-[85vh] max-h-[85vh]',
        full: 'h-[95vh] max-h-[95vh]',
      },
    },
    defaultVariants: {
      height: 'auto',
    },
  },
);

export interface DrawerContentProps
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof drawerVariants> {
  /**
   * If true, renders a close 'X' button in the top right corner
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * If true, renders the top visual touch drag handle
   * @default true
   */
  showHandle?: boolean;
}

export const DrawerContent = React.forwardRef<HTMLDialogElement, DrawerContentProps>(
  (
    { height = 'auto', showCloseButton = false, showHandle = true, className, children, ...props },
    ref,
  ) => {
    const { open, onOpenChange } = useDrawer();

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
        {/* Backdrop Overlay */}
        <div
          aria-hidden="true"
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-fade-in"
        />

        {/* Sliding Bottom Drawer */}
        <dialog
          ref={ref}
          open
          aria-modal="true"
          className={cn(drawerVariants({ height }), className)}
          {...props}
        >
          {showHandle && <DrawerHandle />}

          {children}

          {showCloseButton && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-aurora-text-secondary opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </dialog>
      </FloatingPortal>
    );
  },
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerHandle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('flex w-full items-center justify-center pt-3 pb-1', className)}
      {...props}
    >
      <div className="h-1.5 w-12 rounded-full bg-aurora-border transition-colors hover:bg-aurora-border-hover" />
    </div>
  ),
);
DrawerHandle.displayName = 'DrawerHandle';

export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 px-6 pt-2 pb-4 text-center sm:text-left', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto px-6 py-2 scrollbar-aurora', className)}
      {...props}
    />
  ),
);
DrawerBody.displayName = 'DrawerBody';

export const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 border-t border-aurora-border p-6 pt-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerTitle = React.forwardRef<
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
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-aurora-text-secondary', className)} {...props} />
));
DrawerDescription.displayName = 'DrawerDescription';
