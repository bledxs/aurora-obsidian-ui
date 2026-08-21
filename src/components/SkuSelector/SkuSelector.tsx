import { type FC, forwardRef, type HTMLAttributes, useId, useState } from 'react';
import { cn } from '../../lib/utils';

export interface SkuOption {
  id: string | number;
  label: string;
  value: string;
  color?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export interface SkuAttributeOption {
  label: string;
  value: string;
  color?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export type SkuVariantType = 'pill' | 'color' | 'image';
export type SkuSelectorSize = 'small' | 'medium' | 'large';

export interface SkuAttribute {
  name: string;
  type?: SkuVariantType;
  options: SkuAttributeOption[];
}

export interface SkuVariant {
  id: string | number;
  sku?: string;
  price?: number;
  originalPrice?: number;
  attributes: Record<string, string>;
  inStock?: boolean;
  stockCount?: number;
}

export interface SkuSelectionResult {
  selectedVariant?: SkuVariant;
  selectedAttributes: Record<string, string>;
  isAvailable: boolean;
}

export interface SkuSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // --- All-in-One Mode: Variant Matrix ---
  /**
   * All-in-One Mode: List of attributes (e.g. Color, Size, etc.)
   */
  attributes?: SkuAttribute[];
  /**
   * All-in-One Mode: Variant matrix with stock and pricing
   */
  variants?: SkuVariant[];
  /**
   * Initial selected attribute values { Color: 'obsidian', Size: 'm' }
   */
  initialAttributes?: Record<string, string>;
  /**
   * Unified callback returning the exact selected variant and availability
   */
  onSelectionChange?: (result: SkuSelectionResult) => void;

  // --- Simple Mode (Single attribute group) ---
  name?: string;
  label?: string;
  selectedLabel?: string;
  options?: SkuOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SkuOption) => void;
  variantType?: SkuVariantType;
  size?: SkuSelectorSize;
  error?: string;
}

const COLOR_SIZE_CLASSES: Record<SkuSelectorSize, string> = {
  small: 'h-7 w-7',
  medium: 'h-9 w-9',
  large: 'h-11 w-11',
};

const IMAGE_SIZE_CLASSES: Record<SkuSelectorSize, string> = {
  small: 'h-10 w-10',
  medium: 'h-12 w-12',
  large: 'h-14 w-14',
};

const PILL_SIZE_CLASSES: Record<SkuSelectorSize, string> = {
  small: 'h-8 px-2.5 text-xs min-w-8',
  medium: 'h-10 px-3.5 text-sm min-w-10',
  large: 'h-12 px-4.5 text-base min-w-12',
};

interface SkuOptionItemProps {
  name: string;
  size: SkuSelectorSize;
  option: SkuAttributeOption;
  isSelected: boolean;
  onSelect: (value: string, option: SkuAttributeOption) => void;
}

const ColorOption: FC<SkuOptionItemProps> = ({ name, size, option, isSelected, onSelect }) => {
  const isDisabled = !!option.disabled;
  const inputId = `sku-${name}-${option.value}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border transition-all select-none cursor-pointer focus-within:ring-2 focus-within:ring-aurora-border-focus focus-within:ring-offset-2',
        COLOR_SIZE_CLASSES[size],
        isSelected
          ? 'border-aurora-primary ring-2 ring-aurora-primary ring-offset-2 scale-105'
          : 'border-aurora-border/80 hover:scale-105',
        isDisabled &&
          'border-aurora-border/50 opacity-40 cursor-not-allowed overflow-hidden hover:scale-100',
      )}
      title={`${option.label}${isDisabled ? ' (Out of Stock)' : ''}`}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={option.value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => onSelect(option.value, option)}
        className="sr-only"
      />
      <span
        className="h-full w-full rounded-full border border-black/10 shadow-inner"
        style={{ backgroundColor: option.color || '#cccccc' }}
      />
      {isDisabled && (
        <span className="absolute inset-0 m-auto h-[1.5px] w-full rotate-45 bg-aurora-text-disabled" />
      )}
    </label>
  );
};

const ImageOption: FC<SkuOptionItemProps> = ({ name, size, option, isSelected, onSelect }) => {
  const isDisabled = !!option.disabled;
  const inputId = `sku-${name}-${option.value}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative overflow-hidden rounded-(--radius-aurora) border transition-all cursor-pointer select-none focus-within:ring-2 focus-within:ring-aurora-border-focus',
        IMAGE_SIZE_CLASSES[size],
        isSelected
          ? 'border-aurora-primary ring-2 ring-aurora-primary'
          : 'border-aurora-border hover:border-aurora-border-hover',
        isDisabled && 'opacity-40 cursor-not-allowed',
      )}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={option.value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => onSelect(option.value, option)}
        className="sr-only"
      />
      <img src={option.imageUrl} alt={option.label} className="h-full w-full object-cover" />
      {isDisabled && (
        <span className="absolute inset-0 m-auto h-[1.5px] w-full rotate-45 bg-aurora-text-disabled" />
      )}
    </label>
  );
};

const PillOption: FC<SkuOptionItemProps> = ({ name, size, option, isSelected, onSelect }) => {
  const isDisabled = !!option.disabled;
  const inputId = `sku-${name}-${option.value}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative inline-flex items-center justify-center font-sans font-medium rounded-(--radius-aurora) border transition-all select-none cursor-pointer focus-within:ring-2 focus-within:ring-aurora-border-focus',
        PILL_SIZE_CLASSES[size],
        isSelected
          ? 'border-aurora-primary bg-aurora-primary text-aurora-text-on-primary shadow-xs ring-1 ring-aurora-primary'
          : 'border-aurora-border bg-aurora-surface text-aurora-text-primary hover:border-aurora-border-hover hover:bg-aurora-surface-hover',
        isDisabled &&
          'border-aurora-border/60 bg-aurora-surface/50 text-aurora-text-disabled cursor-not-allowed overflow-hidden',
      )}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={option.value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => onSelect(option.value, option)}
        className="sr-only"
      />
      {option.label}
      {isDisabled && (
        <span className="absolute inset-0 m-auto h-[1.5px] w-full rotate-[-25ofg] bg-aurora-text-disabled" />
      )}
    </label>
  );
};

interface OptionItemProps extends SkuOptionItemProps {
  type: SkuVariantType;
}

const OptionItem: FC<OptionItemProps> = (props) => {
  if (props.type === 'color') {
    return <ColorOption {...props} />;
  }
  if (props.type === 'image' && props.option.imageUrl) {
    return <ImageOption {...props} />;
  }
  return <PillOption {...props} />;
};

// Subcomponente interno para renderizar un grupo of opciones individual
interface AttributeGroupProps {
  name: string;
  label: string;
  type?: SkuVariantType;
  size?: SkuSelectorSize;
  options: SkuAttributeOption[];
  selectedValue: string;
  onSelect: (value: string, option: SkuAttributeOption) => void;
}

const AttributeGroup: FC<AttributeGroupProps> = ({
  name,
  label,
  type = 'pill',
  size = 'medium',
  options,
  selectedValue,
  onSelect,
}) => {
  const currentOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="flex flex-col gap-2 font-sans">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-aurora-text-primary">
          {label}
          {currentOption?.label && (
            <span className="ml-1.5 font-normal text-aurora-text-secondary">
              : {currentOption.label}
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <OptionItem
            key={option.value}
            name={name}
            type={type}
            size={size}
            option={option}
            isSelected={selectedValue === option.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// SUBCOMPONENTE MODO 1: AUTOMÁTICO MULTI-ATRIBUTO
// -------------------------------------------------------------
const MultiAttributeSkuSelector = forwardRef<HTMLDivElement, SkuSelectorProps>(
  (
    {
      attributes = [],
      variants = [],
      initialAttributes,
      onSelectionChange,
      onChange,
      options,
      value,
      defaultValue,
      variantType,
      size = 'medium',
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();

    const getInitialState = () => {
      if (initialAttributes) return initialAttributes;
      if (variants && variants.length > 0) {
        const firstInStock = variants.find(
          (v) => v.inStock !== false && (v.stockCount === undefined || v.stockCount > 0),
        );
        if (firstInStock) return firstInStock.attributes;
      }
      const fallback: Record<string, string> = {};
      for (const attr of attributes) {
        if (attr.options[0]) {
          fallback[attr.name] = attr.options[0].value;
        }
      }
      return fallback;
    };

    const [selectedAttributes, setSelectedAttributes] =
      useState<Record<string, string>>(getInitialState);

    const handleAttributeSelect = (attrName: string, optionValue: string) => {
      const nextAttributes = { ...selectedAttributes, [attrName]: optionValue };
      setSelectedAttributes(nextAttributes);

      if (variants && onSelectionChange) {
        const matchedVariant = variants.find((v) =>
          Object.entries(nextAttributes).every(([k, val]) => v.attributes[k] === val),
        );
        const isAvailable =
          !!matchedVariant &&
          matchedVariant.inStock !== false &&
          (matchedVariant.stockCount === undefined || matchedVariant.stockCount > 0);

        onSelectionChange({
          selectedVariant: matchedVariant,
          selectedAttributes: nextAttributes,
          isAvailable,
        });
      }
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-5', className)} {...props}>
        {attributes.map((attr) => {
          const computedOptions = attr.options.map((option) => {
            if (!variants || variants.length === 0) return option;

            const hasMatchingInStockVariant = variants.some((v) => {
              const matchesOption = v.attributes[attr.name] === option.value;
              const matchesOthers = Object.entries(selectedAttributes).every(([k, val]) =>
                k === attr.name ? true : v.attributes[k] === val,
              );
              const inStock =
                v.inStock !== false && (v.stockCount === undefined || v.stockCount > 0);
              return matchesOption && matchesOthers && inStock;
            });

            return {
              ...option,
              disabled: !hasMatchingInStockVariant,
            };
          });

          return (
            <AttributeGroup
              key={attr.name}
              name={`sku-group-${reactId}-${attr.name}`}
              label={attr.name}
              type={attr.type}
              size={size}
              options={computedOptions}
              selectedValue={selectedAttributes[attr.name] || ''}
              onSelect={(val) => handleAttributeSelect(attr.name, val)}
            />
          );
        })}
        {error && <p className="text-xs text-aurora-error">{error}</p>}
      </div>
    );
  },
);
MultiAttributeSkuSelector.displayName = 'MultiAttributeSkuSelector';

// -------------------------------------------------------------
// SUBCOMPONENTE MODO 2: SIMPLE (Un solo grupo)
// -------------------------------------------------------------
const SingleAttributeSkuSelector = forwardRef<HTMLDivElement, SkuSelectorProps>(
  (
    {
      name,
      label,
      selectedLabel,
      options,
      value,
      defaultValue,
      onChange,
      variantType = 'pill',
      size = 'medium',
      error,
      attributes,
      variants,
      initialAttributes,
      onSelectionChange,
      className,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const singleGroupName = name || `sku-single-${reactId}`;
    const [uncontrolledVal, setUncontrolledVal] = useState<string>(
      defaultValue || options?.[0]?.value || '',
    );
    const selectedVal = value ?? uncontrolledVal;

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
        {options && (
          <AttributeGroup
            name={singleGroupName}
            label={label || ''}
            type={variantType}
            size={size}
            options={options}
            selectedValue={selectedVal}
            onSelect={(val, opt) => {
              if (value === undefined) setUncontrolledVal(val);
              onChange?.(val, opt as SkuOption);
            }}
          />
        )}
        {error && <p className="text-xs text-aurora-error">{error}</p>}
      </div>
    );
  },
);
SingleAttributeSkuSelector.displayName = 'SingleAttributeSkuSelector';

// -------------------------------------------------------------
// COMPONENTE PRINCIPAL
// -------------------------------------------------------------
export const SkuSelector = forwardRef<HTMLDivElement, SkuSelectorProps>((props, ref) => {
  if (props.attributes && props.attributes.length > 0) {
    return <MultiAttributeSkuSelector ref={ref} {...props} />;
  }
  return <SingleAttributeSkuSelector ref={ref} {...props} />;
});
SkuSelector.displayName = 'SkuSelector';
