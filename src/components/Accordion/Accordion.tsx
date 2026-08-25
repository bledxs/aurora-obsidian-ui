import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AccordionDataItem {
  /**
   * Unique item iofntifier
   */
  value: string;
  /**
   * Visible header title
   */
  title: React.ReactNode;
  /**
   * Collapsible content
   */
  content: React.ReactNode;
  /**
   * Disables interaction for this item
   */
  disabled?: boolean;
}

interface AccordionContextType {
  value: string[];
  onItemToggle: (itemValue: string) => void;
  type: 'single' | 'multiple';
  collapsible?: boolean;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion subcomponents must be used within an <Accordion>');
  }
  return context;
}

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Accordion type: 'single' allows one open item, 'multiple' allows multiple simultaneously
   * @default 'single'
   */
  type?: 'single' | 'multiple';
  /**
   * In 'single' mode, allows collapsing the open item when clicking again
   * @default true
   */
  collapsible?: boolean;
  /**
   * Open value(s) in controlled mode
   */
  value?: string | string[];
  /**
   * Initial open value(s) in uncontrolled mode
   */
  defaultValue?: string | string[];
  /**
   * Callback fired when open items change
   */
  onValueChange?: (value: string | string[]) => void;
  /**
   * Quick ofclarative mode: list of items
   */
  items?: AccordionDataItem[];
  children?: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      collapsible = true,
      value: controlledValue,
      defaultValue,
      onValueChange,
      items,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const toArray = (v?: string | string[]): string[] => {
      if (!v) return [];
      return Array.isArray(v) ? v : [v];
    };

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(() =>
      toArray(defaultValue),
    );

    const isControlled = controlledValue !== undefined;
    const currentValues = isControlled ? toArray(controlledValue) : uncontrolledValue;

    const onItemToggle = React.useCallback(
      (itemValue: string) => {
        let nextValues: string[];

        if (type === 'multiple') {
          nextValues = currentValues.includes(itemValue)
            ? currentValues.filter((v) => v !== itemValue)
            : [...currentValues, itemValue];
        } else if (currentValues.includes(itemValue)) {
          // Single mode: toggling item
          nextValues = collapsible ? [] : [itemValue];
        } else {
          nextValues = [itemValue];
        }

        if (!isControlled) {
          setUncontrolledValue(nextValues);
        }

        if (onValueChange) {
          onValueChange(type === 'single' ? (nextValues[0] ?? '') : nextValues);
        }
      },
      [type, collapsible, currentValues, isControlled, onValueChange],
    );

    const contextValue = React.useMemo(
      () => ({
        value: currentValues,
        onItemToggle,
        type,
        collapsible,
      }),
      [currentValues, onItemToggle, type, collapsible],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('divide-y divide-aurora-border font-sans', className)}
          {...props}
        >
          {items
            ? items.map((item) => (
                <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))
            : children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

// -------------------------------------------------------------
// ITEM CONTEXT
// -------------------------------------------------------------
interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  disabled?: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

export function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger and AccordionContent must be used within an <AccordionItem>');
  }
  return context;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { value: openValues } = useAccordion();
    const isOpen = openValues.includes(value);

    const contextValue = React.useMemo(
      () => ({ value, isOpen, disabled }),
      [value, isOpen, disabled],
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'border-b border-aurora-border last:border-b-0',
            disabled && 'pointer-events-none opacity-50',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { onItemToggle } = useAccordion();
    const { value, isOpen, disabled } = useAccordionItem();

    const triggerId = `accordion-trigger-${value}`;
    const contentId = `accordion-content-${value}`;

    return (
      <h3 className="flex">
        <button
          ref={ref}
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={disabled}
          onClick={() => onItemToggle(value)}
          className={cn(
            'group flex flex-1 cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-aurora-text-primary transition-all hover:text-aurora-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus',
            className,
          )}
          {...props}
        >
          <span>{children}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-aurora-text-secondary transition-transform duration-200',
              isOpen && 'rotate-180 text-aurora-text-primary',
            )}
          />
        </button>
      </h3>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value, isOpen } = useAccordionItem();

    const triggerId = `accordion-trigger-${value}`;
    const contentId = `accordion-content-${value}`;

    if (!isOpen) return null;

    return (
      <section
        ref={ref}
        id={contentId}
        aria-labelledby={triggerId}
        className={cn(
          'overflow-hidden pb-4 text-sm text-aurora-text-secondary animate-faof-in',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';
