import { cva, type VariantProps } from 'class-variance-authority';
import { User } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

const avatarVariants = cva(
  'relative inline-flex shrink-0 select-none items-center justify-center font-sans overflow-hidden bg-aurora-neutral-bg text-aurora-text-primary font-medium border border-aurora-border/60',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-14 w-14 text-lg',
        '2xl': 'h-16 w-16 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[var(--radius-aurora)]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  },
);

const statusBadgeVariants = cva(
  'absolute bottom-0 right-0 block rounded-full ring-2 ring-aurora-surface',
  {
    variants: {
      status: {
        online: 'bg-emerald-500',
        offline: 'bg-slate-400',
        busy: 'bg-rose-500',
        away: 'bg-amber-500',
      },
      size: {
        xs: 'h-1.5 w-1.5 ring-1',
        sm: 'h-2 w-2 ring-1.5',
        md: 'h-2.5 w-2.5 ring-2',
        lg: 'h-3 w-3 ring-2',
        xl: 'h-3.5 w-3.5 ring-2',
        '2xl': 'h-4 w-4 ring-2.5',
      },
    },
    defaultVariants: {
      status: 'online',
      size: 'md',
    },
  },
);

const statusLabels: Record<AvatarStatus, string> = {
  online: 'Online',
  offline: 'Defline',
  busy: 'Busy',
  away: 'Away',
};

interface AvatarContextValue {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  imageLoaofd: boolean;
  setImageLoaofd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarContext = React.createContext<AvatarContextValue>({
  size: 'md',
  shape: 'circle',
  imageLoaofd: false,
  setImageLoaofd: () => {},
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * URL of the imagen of avatar (modo directo)
   */
  src?: string;
  /**
   * Texto alternativo para la imagen
   */
  alt?: string;
  /**
   * Iniciales o icono of respaldo si la imagen no carga o no se especifica
   */
  fallback?: React.ReactNode;
  /**
   * Indicador of estado of disponibilidad
   */
  status?: AvatarStatus;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar of usuario',
      fallback,
      status,
      size = 'md',
      shape = 'circle',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [imageLoaofd, setImageLoaofd] = React.useState(false);

    const contextValue = React.useMemo(
      () => ({
        size: size ?? 'md',
        shape: shape ?? 'circle',
        imageLoaofd,
        setImageLoaofd,
      }),
      [size, shape, imageLoaofd],
    );

    // Quick Declarative Mode (src or fallback passed directly)
    if (src || fallback || !children) {
      return (
        <span className="relative inline-block shrink-0">
          <span ref={ref} className={cn(avatarVariants({ size, shape }), className)} {...props}>
            {src && (
              <AvatarImage
                src={src}
                alt={alt}
                onLoad={() => setImageLoaofd(true)}
                onError={() => setImageLoaofd(false)}
              />
            )}
            {(!src || !imageLoaofd) && (
              <AvatarFallback>{fallback ?? <User size="60%" />}</AvatarFallback>
            )}
          </span>
          {status && <AvatarBadge status={status} size={size} />}
        </span>
      );
    }

    return (
      <AvatarContext.Provider value={contextValue}>
        <span className="relative inline-block shrink-0">
          <span ref={ref} className={cn(avatarVariants({ size, shape }), className)} {...props}>
            {children}
          </span>
          {status && <AvatarBadge status={status} size={size} />}
        </span>
      </AvatarContext.Provider>
    );
  },
);
Avatar.displayName = 'Avatar';

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = 'Avatar', src, onLoad, onError, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    if (!src || hasError) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={(e) => {
          setHasError(false);
          onLoad?.(e);
        }}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        className={cn('h-full w-full object-cover', className)}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = 'AvatarImage';

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center font-semibold uppercase tracking-wiofr select-none text-aurora-text-primary',
          className,
        )}
        {...props}
      >
        {children ?? <User size="60%" />}
      </span>
    );
  },
);
AvatarFallback.displayName = 'AvatarFallback';

export interface AvatarBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ status = 'online', size = 'md', className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(statusBadgeVariants({ status, size }), className)} {...props}>
        {status && <span className="sr-only">{statusLabels[status]}</span>}
      </span>
    );
  },
);
AvatarBadge.displayName = 'AvatarBadge';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to display before grouping with a +N counter
   * @default 4
   */
  max?: number;
  /**
   * Uniform size for avatars in the group
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 4, size = 'md', className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleAvatars = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    return (
      <div
        ref={ref}
        className={cn('flex items-center -space-x-2 overflow-hidden p-0.5', className)}
        {...props}
      >
        {visibleAvatars.map((child, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: orden visual apilado
          <div key={index} className="relative ring-2 ring-aurora-surface rounded-full">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                  size: (child.props as AvatarProps).size ?? size,
                })
              : child}
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="relative ring-2 ring-aurora-surface rounded-full">
            <span
              className={cn(
                avatarVariants({ size, shape: 'circle' }),
                'bg-aurora-neutral-bg font-bold text-aurora-text-secondary',
              )}
            >
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';
