import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  /**
   * Identificador único de la pestaña
   */
  value: string;
  /**
   * Etiqueta o título de la pestaña
   */
  label: React.ReactNode;
  /**
   * Contenido que se mostrará al activar la pestaña
   */
  content: React.ReactNode;
  /**
   * Deshabilita la pestaña
   */
  disabled?: boolean;
}

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'pills' | 'underline';
}

const TabsContext = React.createContext<TabsContextType | null>(null);

export function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Los subcomponentes de Tabs deben usarse dentro de un <Tabs>');
  }
  return context;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Valor de la pestaña activa en modo controlado
   */
  value?: string;
  /**
   * Valor inicial de la pestaña activa en modo no controlado
   */
  defaultValue?: string;
  /**
   * Callback invocado al cambiar de pestaña
   */
  onValueChange?: (value: string) => void;
  /**
   * Variante visual de las pestañas: 'pills' o 'underline'
   * @default 'underline'
   */
  variant?: 'pills' | 'underline';
  /**
   * Modo declarativo rápido: lista de pestañas
   */
  items?: TabItem[];
  children?: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = 'underline',
      items,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const initialDefault = defaultValue || items?.[0]?.value || '';
    const [uncontrolledValue, setUncontrolledValue] = React.useState(initialDefault);

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange],
    );

    const contextValue = React.useMemo(
      () => ({
        value: activeValue,
        onValueChange: handleValueChange,
        variant,
      }),
      [activeValue, handleValueChange, variant],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full font-sans', className)} {...props}>
          {items ? (
            <>
              <TabsList>
                {items.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {items.map((item) => (
                <TabsContent key={item.value} value={item.value}>
                  {item.content}
                </TabsContent>
              ))}
            </>
          ) : (
            children
          )}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabs();

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'flex items-center',
          variant === 'underline' && 'gap-6 border-b border-aurora-border',
          variant === 'pills' &&
            'inline-flex gap-1 rounded-[calc(var(--radius-aurora)*1.2)] bg-aurora-neutral-bg p-1',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { value: activeValue, onValueChange, variant } = useTabs();
    const isActive = activeValue === value;

    const triggerId = `tab-trigger-${value}`;
    const contentId = `tab-content-${value}`;

    return (
      <button
        ref={ref}
        id={triggerId}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={contentId}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => onValueChange(value)}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus disabled:pointer-events-none disabled:opacity-50',
          variant === 'underline' && [
            'relative -mb-px border-b-2 py-3',
            isActive
              ? 'border-aurora-primary font-semibold text-aurora-primary'
              : 'border-transparent text-aurora-text-secondary hover:border-aurora-border hover:text-aurora-text-primary',
          ],
          variant === 'pills' && [
            'rounded-[var(--radius-aurora)] px-4 py-1.5',
            isActive
              ? 'bg-aurora-surface font-semibold text-aurora-text-primary shadow-xs'
              : 'text-aurora-text-secondary hover:text-aurora-text-primary',
          ],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: activeValue } = useTabs();
    const isActive = activeValue === value;

    const triggerId = `tab-trigger-${value}`;
    const contentId = `tab-content-${value}`;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        id={contentId}
        role="tabpanel"
        aria-labelledby={triggerId}
        className={cn(
          'mt-4 text-aurora-text-primary focus-visible:outline-none animate-fade-in',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';
