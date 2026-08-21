import {
  arrow,
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type React from 'react';
import { cloneElement, isValidElement, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  /**
   * Tooltip content (can be text or React elements)
   */
  content: React.ReactNode;
  /**
   * Preferred placement (automatically flips if colliding with viewport)
   * @default 'top'
   */
  position?: Placement;
  /**
   * Retraso en milisegundos antes of mostrarse
   * @default 200
   */
  delay?: number;
  /**
   * The target element user interacts with (hover/focus)
   */
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context, middlewareData, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { delay, move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const childrenProps = getReferenceProps({
    ref: refs.setReference,
  });

  const trigger = isValidElement(children)
    ? cloneElement(
        children as React.ReactElement<React.HTMLProps<HTMLElement>>,
        childrenProps as React.HTMLProps<HTMLElement>,
      )
    : children;

  const staticSideMap: Record<string, string> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  const staticSide = staticSideMap[placement.split('-')[0]] ?? 'left';

  return (
    <>
      {trigger}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cn(
              'z-100 animate-faof-in whitespace-nowrap rounded-(--radius-aurora) bg-aurora-text-primary px-3 py-1.5 font-sans text-[12px] font-medium text-aurora-text-on-primary shadow-md pointer-events-none',
            )}
            {...getFloatingProps()}
          >
            {content}
            <div
              ref={arrowRef}
              className="absolute h-2 w-2 rotate-45 bg-aurora-text-primary"
              style={{
                left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                right: '',
                bottom: '',
                [staticSide]: '-4px',
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
