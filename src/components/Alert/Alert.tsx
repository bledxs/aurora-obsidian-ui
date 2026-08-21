import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative flex w-full gap-3.5 rounded-[var(--radius-aurora)] border p-4 text-sm font-sans transition-all',
  {
    variants: {
      variant: {
        default: 'bg-aurora-surface border-aurora-border text-aurora-text-primary',
        info: 'bg-blue-50/90 border-blue-200 text-blue-950 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200',
        success:
          'bg-emerald-50/90 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200',
        warning:
          'bg-amber-50/90 border-amber-200 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200',
        error:
          'bg-red-50/90 border-red-200 text-red-950 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const defaultIcons = {
  default: <Info className="h-5 w-5 shrink-0 text-aurora-primary" />,
  info: <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />,
  error: <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * Icono personalizado o false para ocultar el icono
   */
  icon?: React.ReactNode | false;
  /**
   * Si es true, muestra un botón de cierre en la esquina
   */
  dismissible?: boolean;
  /**
   * Callback invocado al cerrar la alerta
   */
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = 'default', icon, dismissible = false, onClose, children, ...props },
    ref,
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed) return null;

    const currentVariant = variant ?? 'default';
    const renderIcon = icon === false ? null : (icon ?? defaultIcons[currentVariant]);
    const role = currentVariant === 'error' || currentVariant === 'warning' ? 'alert' : 'status';

    const handleDismiss = () => {
      setDismissed(true);
      onClose?.();
    };

    return (
      <div
        ref={ref}
        role={role}
        className={cn(alertVariants({ variant: currentVariant }), className)}
        {...props}
      >
        {renderIcon && <div className="mt-0.5">{renderIcon}</div>}
        <div className="flex-1 space-y-1">{children}</div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Cerrar notificación"
            className="shrink-0 -mr-1 -mt-1 rounded-xs p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
          >
            <X size={15} />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs opacity-90 leading-relaxed [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export const AlertAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-2.5 flex items-center gap-2', className)} {...props} />
  ),
);
AlertAction.displayName = 'AlertAction';
