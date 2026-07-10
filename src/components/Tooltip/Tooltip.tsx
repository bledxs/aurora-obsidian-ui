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
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /**
   * El contenido del tooltip (puede ser texto o elementos React)
   */
  content: React.ReactNode;
  /**
   * Posición preferida (si choca contra el borde, cambiará automáticamente)
   * @default 'top'
   */
  position?: Placement;
  /**
   * Retraso en milisegundos antes de mostrarse
   * @default 200
   */
  delay?: number;
  /**
   * El elemento sobre el que el usuario interactuará (hover/focus)
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

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as string;

  return (
    <>
      {isValidElement(children)
        ? cloneElement(
            children,
            getReferenceProps({
              ref: refs.setReference,
              ...(children.props as Record<string, unknown>),
            }),
          )
        : children}

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.tooltip}
            {...getFloatingProps()}
          >
            {content}
            <div
              ref={arrowRef}
              className={styles.arrow}
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
