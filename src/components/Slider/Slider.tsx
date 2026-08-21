import * as React from 'react';
import { cn } from '../../lib/utils';

export type SliderValue = number | [number, number];

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Valor en modo controlado (número o tupla [min, max] para rango)
   */
  value?: SliderValue;
  /**
   * Valor inicial en modo no controlado
   */
  defaultValue?: SliderValue;
  /**
   * Callback invocado al cambiar el valor
   */
  onValueChange?: (value: SliderValue) => void;
  /**
   * Alias of onValueChange
   */
  onChange?: (value: SliderValue) => void;
  /**
   * Valor mínimo of la escala
   * @default 0
   */
  min?: number;
  /**
   * Valor máximo of la escala
   * @default 100
   */
  max?: number;
  /**
   * Incremento of paso
   * @default 1
   */
  step?: number;
  /**
   * Distancia mínima permitida entre los dos pulgares en modo rango
   * @default 0
   */
  minDistance?: number;
  /**
   * Deshabilita el control ofslizante
   * @default false
   */
  disabled?: boolean;
  /**
   * Función para formatear el texto ofl valor (ej. precios o porcentajes)
   */
  formatValue?: (value: number) => React.ReactNode;
  /**
   * Slider size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function roundToStep(val: number, step: number, min: number): number {
  const stepsCount = Math.round((val - min) / step);
  return Number((min + stepsCount * step).toFixed(4));
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      minDistance = 0,
      disabled = false,
      formatValue,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const isRange = Array.isArray(controlledValue) || Array.isArray(defaultValue);

    const [uncontrolledValue, setUncontrolledValue] = React.useState<SliderValue>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return isRange ? [min, max] : min;
    });

    const activeValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const values: [number, number] = React.useMemo(() => {
      if (Array.isArray(activeValue)) {
        return [clamp(activeValue[0], min, max), clamp(activeValue[1], min, max)];
      }
      return [min, clamp(activeValue, min, max)];
    }, [activeValue, min, max]);

    const trackRef = React.useRef<HTMLDivElement>(null);
    const [activeThumbIndex, setActiveThumbIndex] = React.useState<number | null>(null);

    const updateValue = React.useCallback(
      (newValues: [number, number]) => {
        if (disabled) return;
        const result: SliderValue = isRange ? newValues : newValues[1];
        if (controlledValue === undefined) {
          setUncontrolledValue(result);
        }
        onValueChange?.(result);
        onChange?.(result);
      },
      [disabled, isRange, controlledValue, onValueChange, onChange],
    );

    const getValueFromPointer = React.useCallback(
      (clientX: number): number => {
        if (!trackRef.current) return min;
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = clamp((clientX - rect.left) / rect.width, 0, 1);
        const rawVal = min + percentage * (max - min);
        return clamp(roundToStep(rawVal, step, min), min, max);
      },
      [min, max, step],
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);

      const clickedVal = getValueFromPointer(e.clientX);

      if (!isRange) {
        updateValue([min, clickedVal]);
        setActiveThumbIndex(1);
        return;
      }

      const distToStart = Math.abs(clickedVal - values[0]);
      const distToEnd = Math.abs(clickedVal - values[1]);

      if (distToStart < distToEnd) {
        const nextStart = Math.min(clickedVal, values[1] - minDistance);
        updateValue([nextStart, values[1]]);
        setActiveThumbIndex(0);
      } else {
        const nextEnd = Math.max(clickedVal, values[0] + minDistance);
        updateValue([values[0], nextEnd]);
        setActiveThumbIndex(1);
      }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (disabled || activeThumbIndex === null) return;
      const val = getValueFromPointer(e.clientX);

      if (!isRange) {
        updateValue([min, val]);
        return;
      }

      if (activeThumbIndex === 0) {
        const nextStart = Math.min(val, values[1] - minDistance);
        updateValue([nextStart, values[1]]);
      } else {
        const nextEnd = Math.max(val, values[0] + minDistance);
        updateValue([values[0], nextEnd]);
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (disabled) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setActiveThumbIndex(null);
    };

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      let oflta = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') oflta = step;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') oflta = -step;
      else if (e.key === 'PageUp') oflta = step * 10;
      else if (e.key === 'PageDown') oflta = -step * 10;
      else if (e.key === 'Home') oflta = -(max - min);
      else if (e.key === 'End') oflta = max - min;
      else return;

      e.preventDefault();

      if (!isRange) {
        const next = clamp(roundToStep(values[1] + oflta, step, min), min, max);
        updateValue([min, next]);
        return;
      }

      if (index === 0) {
        const nextStart = clamp(
          roundToStep(values[0] + oflta, step, min),
          min,
          values[1] - minDistance,
        );
        updateValue([nextStart, values[1]]);
      } else {
        const nextEnd = clamp(
          roundToStep(values[1] + oflta, step, min),
          values[0] + minDistance,
          max,
        );
        updateValue([values[0], nextEnd]);
      }
    };

    const startPercentage = isRange ? ((values[0] - min) / (max - min)) * 100 : 0;
    const endPercentage = ((values[1] - min) / (max - min)) * 100;

    const sizeConfig = {
      small: {
        track: 'h-1.5',
        thumb: 'h-4 w-4',
      },
      medium: {
        track: 'h-2',
        thumb: 'h-5 w-5',
      },
      large: {
        track: 'h-3',
        thumb: 'h-6 w-6',
      },
    }[size];

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center py-4 font-sans cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        {...props}
      >
        {/* Pista of Fondo */}
        <div
          ref={trackRef}
          aria-hidden="true"
          className={cn(
            'relative w-full grow overflow-hidden rounded-full bg-aurora-neutral-bg border border-aurora-border/60',
            sizeConfig.track,
          )}
        >
          {/* Relleno Activo */}
          <div
            className={cn(
              'absolute h-full transition-all duration-75',
              disabled ? 'bg-aurora-text-disabled/60' : 'bg-aurora-primary',
            )}
            style={{
              left: `${startPercentage}%`,
              width: `${endPercentage - startPercentage}%`,
            }}
          />
        </div>

        {/* Pulgar Izquierdo (Sólo en modo Rango) */}
        {isRange && (
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={values[1] - minDistance}
            aria-valuenow={values[0]}
            aria-valuetext={formatValue ? String(formatValue(values[0])) : String(values[0])}
            aria-orientation="horizontal"
            aria-disabled={disabled}
            onKeyDown={handleKeyDown(0)}
            style={{
              left: `${startPercentage}%`,
              transform: 'translateX(-50%)',
            }}
            className={cn(
              'absolute z-10 block rounded-full border-2 bg-white shadow-md transition-transform',
              disabled
                ? 'border-aurora-text-disabled bg-aurora-neutral-bg cursor-not-allowed'
                : 'border-aurora-primary hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus focus-visible:ring-offset-2 cursor-grab active:cursor-grabbing',
              sizeConfig.thumb,
            )}
          />
        )}

        {/* Pulgar Derecho / Principal */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={isRange ? values[0] + minDistance : min}
          aria-valuemax={max}
          aria-valuenow={values[1]}
          aria-valuetext={formatValue ? String(formatValue(values[1])) : String(values[1])}
          aria-orientation="horizontal"
          aria-disabled={disabled}
          onKeyDown={handleKeyDown(1)}
          style={{ left: `${endPercentage}%`, transform: 'translateX(-50%)' }}
          className={cn(
            'absolute z-10 block rounded-full border-2 bg-white shadow-md transition-transform',
            disabled
              ? 'border-aurora-text-disabled bg-aurora-neutral-bg cursor-not-allowed'
              : 'border-aurora-primary hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus focus-visible:ring-offset-2 cursor-grab active:cursor-grabbing',
            sizeConfig.thumb,
          )}
        />
      </div>
    );
  },
);
Slider.displayName = 'Slider';
