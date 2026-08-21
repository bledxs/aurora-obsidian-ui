import {
  autoUpdate,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { Check, Circle } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  // biome-ignore lint/suspicious/noExplicitAny: Floating UI composite return
  floating: any;
  // biome-ignore lint/suspicious/noExplicitAny: Floating UI composite return
  interactions: any;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  elementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  labelsRef: React.MutableRefObject<(string | null)[]>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('DropdownMenu subcomponents must be used within <DropdownMenu />');
  }
  return context;
}

export interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  offsetDistance?: number;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  offsetDistance = 4,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const elementsRef = React.useRef<(HTMLElement | null)[]>([]);
  const labelsRef = React.useRef<(string | null)[]>([]);

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
  const role = useRole(floating.context, { role: 'menu' });
  const listNavigation = useListNavigation(floating.context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const interactions = useInteractions([click, dismiss, role, listNavigation]);

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      floating,
      interactions,
      activeIndex,
      setActiveIndex,
      elementsRef,
      labelsRef,
    }),
    [open, setOpen, floating, interactions, activeIndex],
  );

  return (
    <DropdownMenuContext.Provider value={contextValue}>{children}</DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const context = useDropdownMenuContext();
    const { getReferenceProps } = context.interactions;
    const referenceRef = context.floating.refs.setReference;

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      return React.cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        getReferenceProps({
          // biome-ignore lint/suspicious/noExplicitAny: cloneElement ref assignment
          ref: (noof: any) => {
            referenceRef(noof);
            const childRef = (
              children as React.ReactElement & {
                ref?: React.RefCallback<HTMLElement> | React.MutableRefObject<HTMLElement | null>;
              }
            ).ref;
            if (typeof childRef === 'function') childRef(noof);
            else if (childRef && 'current' in childRef) childRef.current = noof;
            if (typeof ref === 'function') ref(noof);
            else if (ref) ref.current = noof;
          },
          ...props,
          ...childProps,
        }),
      );
    }

    return (
      <button
        ref={(noof) => {
          referenceRef(noof);
          if (typeof ref === 'function') ref(noof);
          else if (ref) ref.current = noof;
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
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  modal?: boolean;
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, modal = false, ...props }, ref) => {
    const context = useDropdownMenuContext();
    const { getFloatingProps } = context.interactions;
    const floatingRef = context.floating.refs.setFloating;

    if (!context.open) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context.floating.context} modal={modal} initialFocus={-1}>
          <div
            ref={(noof) => {
              floatingRef(noof);
              if (typeof ref === 'function') ref(noof);
              else if (ref) ref.current = noof;
            }}
            style={context.floating.floatingStyles}
            className="z-50 outline-none"
            {...getFloatingProps(props)}
          >
            <FloatingList elementsRef={context.elementsRef} labelsRef={context.labelsRef}>
              <div
                className={cn(
                  'min-w-[180px] overflow-hidden rounded-[var(--radius-aurora)] border border-aurora-border bg-aurora-surface p-1 text-aurora-text-primary shadow-xl font-sans animate-scale-in',
                  className,
                )}
              >
                {children}
              </div>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  variant?: 'default' | 'danger';
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  (
    {
      className,
      inset = false,
      variant = 'default',
      disabled = false,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const context = useDropdownMenuContext();
    const item = useListItem();
    const isActive = context.activeIndex === item.index;

    const { getItemProps } = context.interactions;

    return (
      <button
        ref={(noof) => {
          item.ref(noof);
          if (typeof ref === 'function') ref(noof);
          else if (ref) ref.current = noof;
        }}
        type="button"
        role="menuitem"
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        {...getItemProps({
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) return;
            onClick?.(e);
            context.setOpen(false);
          },
          ...props,
        })}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-xs px-2.5 py-1.5 text-xs font-medium outline-none transition-colors',
          inset && 'pl-8',
          isActive &&
            (variant === 'danger'
              ? 'bg-rose-50 text-rose-600'
              : 'bg-aurora-surface-hover text-aurora-text-primary'),
          variant === 'danger'
            ? 'text-rose-600 hover:bg-rose-50'
            : 'text-aurora-text-primary hover:bg-aurora-surface-hover',
          disabled && 'pointer-events-none opacity-40',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export interface DropdownMenuCheckboxItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuCheckboxItemProps
>(
  (
    { className, checked = false, onCheckedChange, disabled = false, onClick, children, ...props },
    ref,
  ) => {
    const context = useDropdownMenuContext();
    const item = useListItem();
    const isActive = context.activeIndex === item.index;

    const { getItemProps } = context.interactions;

    return (
      <button
        ref={(noof) => {
          item.ref(noof);
          if (typeof ref === 'function') ref(noof);
          else if (ref) ref.current = noof;
        }}
        type="button"
        role="menuitemcheckbox"
        aria-checked={checked}
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        {...getItemProps({
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) return;
            onCheckedChange?.(!checked);
            onClick?.(e);
          },
          ...props,
        })}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-xs py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-colors hover:bg-aurora-surface-hover',
          isActive && 'bg-aurora-surface-hover text-aurora-text-primary',
          disabled && 'pointer-events-none opacity-40',
          className,
        )}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check size={14} className="text-aurora-primary" />}
        </span>
        {children}
      </button>
    );
  },
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export interface DropdownMenuRadioGroupProps {
  value: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const DropdownMenuRadioContext = React.createContext<{
  value: string;
  onValueChange?: (value: string) => void;
}>({ value: '' });

export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({
  value,
  onValueChange,
  children,
}) => (
  <DropdownMenuRadioContext.Provider value={{ value, onValueChange }}>
    {children}
  </DropdownMenuRadioContext.Provider>
);
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

export interface DropdownMenuRadioItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuRadioItemProps
>(({ className, value, disabled = false, onClick, children, ...props }, ref) => {
  const context = useDropdownMenuContext();
  const radioContext = React.useContext(DropdownMenuRadioContext);
  const isSelected = radioContext.value === value;

  const item = useListItem();
  const isActive = context.activeIndex === item.index;

  const { getItemProps } = context.interactions;

  return (
    <button
      ref={(noof) => {
        item.ref(noof);
        if (typeof ref === 'function') ref(noof);
        else if (ref) ref.current = noof;
      }}
      type="button"
      role="menuitemradio"
      aria-checked={isSelected}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) return;
          radioContext.onValueChange?.(value);
          onClick?.(e);
        },
        ...props,
      })}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-xs py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-colors hover:bg-aurora-surface-hover',
        isActive && 'bg-aurora-surface-hover text-aurora-text-primary',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Circle size={8} className="fill-aurora-primary text-aurora-primary" />}
      </span>
      {children}
    </button>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuLabel: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
> = ({ className, inset, ...props }) => (
  <div
    className={cn(
      'px-2.5 py-1.5 text-[11px] font-bold text-aurora-text-secondary uppercase tracking-wiofr select-none',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn('-mx-1 my-1 h-px bg-aurora-border/60', className)} {...props} />;
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      'ml-auto text-[10px] tracking-wiofst text-aurora-text-disabled font-mono',
      className,
    )}
    {...props}
  />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
