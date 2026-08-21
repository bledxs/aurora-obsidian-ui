import { FloatingPortal } from '@floating-ui/react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { dismissToast, subscribeToasts, type ToastData, type ToastType } from './toast-store';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToasterProps {
  /**
   * Posición de las notificaciones en la pantalla
   * @default 'bottom-right'
   */
  position?: ToastPosition;
  /**
   * Si es true, muestra un botón de cierre manual en cada notificación
   * @default true
   */
  closeButton?: boolean;
  className?: string;
}

const typeStyles: Record<
  ToastType,
  {
    container: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }
> = {
  default: {
    container: 'border-aurora-border bg-aurora-surface shadow-md',
    title: 'text-aurora-text-primary',
    description: 'text-aurora-text-secondary',
    icon: null,
  },
  success: {
    container:
      'border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/90 shadow-md',
    title: 'text-emerald-950 dark:text-emerald-100',
    description: 'text-emerald-800 dark:text-emerald-300',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
  },
  error: {
    container: 'border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/90 shadow-md',
    title: 'text-red-950 dark:text-red-100',
    description: 'text-red-800 dark:text-red-300',
    icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />,
  },
  warning: {
    container:
      'border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/90 shadow-md',
    title: 'text-amber-950 dark:text-amber-100',
    description: 'text-amber-900 dark:text-amber-300',
    icon: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />,
  },
  info: {
    container: 'border-blue-200 bg-blue-50 dark:border-blue-800/60 dark:bg-blue-950/90 shadow-md',
    title: 'text-blue-950 dark:text-blue-100',
    description: 'text-blue-800 dark:text-blue-300',
    icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />,
  },
};

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
};

export const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  closeButton = true,
  className,
}) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  React.useEffect(() => {
    return subscribeToasts((updatedToasts) => {
      setToasts(updatedToasts);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <FloatingPortal>
      <section
        aria-live="polite"
        aria-label="Notificaciones"
        tabIndex={-1}
        className={cn(
          'fixed z-100 pointer-events-none flex max-h-screen w-full max-w-sm flex-col gap-2 p-4 font-sans focus:outline-none',
          positionClasses[position],
          className,
        )}
      >
        {toasts.map((toastItem) => (
          <ToastCard key={toastItem.id} toast={toastItem} closeButton={closeButton} />
        ))}
      </section>
    </FloatingPortal>
  );
};
Toaster.displayName = 'Toaster';

interface ToastCardProps {
  toast: ToastData;
  closeButton?: boolean;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, closeButton }) => {
  const { id, title, description, type = 'default', duration = 4000, action, cancel, icon } = toast;

  React.useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => {
      dismissToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration]);

  const currentType = typeStyles[type] || typeStyles.default;
  const activeIcon = icon !== undefined ? icon : currentType.icon;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={cn(
        'pointer-events-auto relative flex w-full items-start gap-3 rounded-[var(--radius-aurora)] border p-4 backdrop-blur-md transition-all animate-scale-in',
        currentType.container,
      )}
    >
      {activeIcon && <div className="mt-0.5">{activeIcon}</div>}

      <div className="flex-1 space-y-1 min-w-0">
        {title && (
          <div className={cn('font-semibold text-sm leading-tight', currentType.title)}>
            {title}
          </div>
        )}
        {description && (
          <div className={cn('text-xs leading-normal', currentType.description)}>{description}</div>
        )}

        {(action || cancel) && (
          <div className="pt-2 flex items-center gap-2">
            {action && (
              <button
                type="button"
                onClick={(e) => {
                  action.onClick(e);
                  dismissToast(id);
                }}
                className="cursor-pointer rounded-xs bg-aurora-primary px-2.5 py-1 text-xs font-semibold text-aurora-text-on-primary shadow-xs hover:bg-aurora-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
              >
                {action.label}
              </button>
            )}
            {cancel && (
              <button
                type="button"
                onClick={(e) => {
                  cancel.onClick(e);
                  dismissToast(id);
                }}
                className="cursor-pointer rounded-xs border border-aurora-border bg-aurora-surface px-2.5 py-1 text-xs font-medium text-aurora-text-secondary hover:bg-aurora-surface-hover hover:text-aurora-text-primary focus-visible:outline-none"
              >
                {cancel.label}
              </button>
            )}
          </div>
        )}
      </div>

      {closeButton && (
        <button
          type="button"
          onClick={() => dismissToast(id)}
          className="cursor-pointer -mr-1 -mt-1 rounded-full p-1 text-aurora-text-secondary opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
          aria-label="Cerrar notificación"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
