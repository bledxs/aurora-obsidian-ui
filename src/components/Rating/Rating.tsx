import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

const ratingVariants = cva(
  'inline-flex items-center gap-1 font-sans text-aurora-text-primary select-none',
  {
    variants: {
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const starSizes = {
  small: 14,
  medium: 18,
  large: 24,
};

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  /**
   * Current rating score (e.g. 4.5)
   * @default 0
   */
  value?: number;
  /**
   * Maximum rating score
   * @default 5
   */
  max?: number;
  /**
   * If true, enables click and hover interactions to submit rating
   * @default false
   */
  interactive?: boolean;
  /**
   * Callback fired upon clicking a rating score
   */
  onChange?: (value: number) => void;
  /**
   * If true, displays the numeric score (e.g. "4.7")
   * @default false
   */
  showValue?: boolean;
  /**
   * Review count (e.g. 128 -> "(128)")
   */
  reviewCount?: number;
  /**
   * Custom formatter function for review counter (e.g. (count) => `${count} reviews`)
   */
  formatReviewCount?: (count: number) => React.ReactNode;
  /**
   * Disables interaction
   * @default false
   */
  disabled?: boolean;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      interactive = false,
      onChange,
      showValue = false,
      reviewCount,
      formatReviewCount,
      disabled = false,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const displayValue = hoverValue ?? value;
    const starSize = starSizes[size || 'medium'];

    const handleStarClick = (score: number) => {
      if (disabled || !interactive) return;
      onChange?.(score);
    };

    const handleMouseEnter = (score: number) => {
      if (disabled || !interactive) return;
      setHoverValue(score);
    };

    const handleMouseLeave = () => {
      if (disabled || !interactive) return;
      setHoverValue(null);
    };

    const roundedValue = Number(value.toFixed(1));
    const ariaText = `Rating: ${roundedValue} out of ${max} stars${
      reviewCount !== undefined ? `, ${reviewCount} reviews` : ''
    }`;

    return (
      <div ref={ref} className={cn(ratingVariants({ size }), className)} {...props}>
        <span className="sr-only">{ariaText}</span>

        {interactive ? (
          <fieldset
            aria-label="Select rating"
            className="m-0 flex items-center gap-0.5 border-0 p-0"
            onMouseLeave={handleMouseLeave}
          >
            {Array.from({ length: max }, (_, index) => {
              const starNumber = index + 1;
              let fillRatio = 0;
              if (displayValue >= starNumber) {
                fillRatio = 1;
              } else if (displayValue > starNumber - 1) {
                fillRatio = displayValue - (starNumber - 1);
              }

              return (
                <button
                  key={starNumber}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleStarClick(starNumber)}
                  onMouseEnter={() => handleMouseEnter(starNumber)}
                  aria-label={`${starNumber} of ${max} stars`}
                  className={cn(
                    'relative inline-flex items-center justify-center p-0.5 transition-transform cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus rounded-xs',
                    disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
                  )}
                >
                  <Star
                    size={starSize}
                    className="text-aurora-border fill-aurora-border/30"
                    strokeWidth={1.5}
                  />
                  {fillRatio > 0 && (
                    <span
                      className="absolute inset-0.5 overflow-hidden text-amber-400 fill-amber-400"
                      style={{
                        clipPath: `inset(0 ${(1 - fillRatio) * 100}% 0 0)`,
                      }}
                    >
                      <Star size={starSize} strokeWidth={1.5} />
                    </span>
                  )}
                </button>
              );
            })}
          </fieldset>
        ) : (
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: max }, (_, index) => {
              const starNumber = index + 1;
              let fillRatio = 0;
              if (displayValue >= starNumber) {
                fillRatio = 1;
              } else if (displayValue > starNumber - 1) {
                fillRatio = displayValue - (starNumber - 1);
              }

              return (
                <span
                  key={starNumber}
                  className="relative inline-flex items-center justify-center p-0.5"
                >
                  <Star
                    size={starSize}
                    className="text-aurora-border fill-aurora-border/30"
                    strokeWidth={1.5}
                  />
                  {fillRatio > 0 && (
                    <span
                      className="absolute inset-0.5 overflow-hidden text-amber-400 fill-amber-400"
                      style={{
                        clipPath: `inset(0 ${(1 - fillRatio) * 100}% 0 0)`,
                      }}
                    >
                      <Star size={starSize} strokeWidth={1.5} />
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        )}

        {/* Optional numeric value (ej. 4.8) */}
        {showValue && (
          <span className="font-bold text-aurora-text-primary ml-1" aria-hidden="true">
            {roundedValue}
          </span>
        )}

        {/* Optional review count */}
        {reviewCount !== undefined && (
          <span className="text-aurora-text-secondary text-xs ml-0.5" aria-hidden="true">
            {formatReviewCount ? formatReviewCount(reviewCount) : `(${reviewCount})`}
          </span>
        )}
      </div>
    );
  },
);
Rating.displayName = 'Rating';
