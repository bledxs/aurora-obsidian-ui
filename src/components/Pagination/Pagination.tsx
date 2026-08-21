import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 3; // 1 + siblings + current + siblings + totalPages
  const totalBlocks = totalNumbers + 2; // totalNumbers + 2 * ellipsis

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export interface PaginationProps extends React.ComponentProps<'nav'> {
  /**
   * Página activa en modo auto-generado
   */
  currentPage?: number;
  /**
   * Total de páginas en modo auto-generado
   */
  totalPages?: number;
  /**
   * Callback invocado al cambiar de página
   */
  onPageChange?: (page: number) => void;
  /**
   * Cantidad de páginas vecinas a mostrar a cada lado de la activa
   * @default 1
   */
  siblingCount?: number;
  /**
   * Si es true, muestra botones con texto "Anterior" / "Siguiente"
   * @default true
   */
  showControls?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showControls = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Si se pasan props declarativas (currentPage y totalPages), renderiza el paginador auto-gestionado
    if (currentPage !== undefined && totalPages !== undefined) {
      const range = generatePaginationRange(currentPage, totalPages, siblingCount);

      return (
        <nav
          ref={ref}
          aria-label="Paginación"
          className={cn('mx-auto flex w-full justify-center font-sans', className)}
          {...props}
        >
          <PaginationContent>
            {showControls && (
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage <= 1}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange?.(currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}

            {range.map((item, index) => {
              if (item === 'ellipsis') {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: las elipsis son separadores estáticos
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const pageNumber = item as number;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={currentPage === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange?.(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {showControls && (
              <PaginationItem>
                <PaginationNext
                  disabled={currentPage >= totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange?.(currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-label="Paginación"
        className={cn('mx-auto flex w-full justify-center font-sans', className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';

export const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-1 sm:gap-1.5', className)}
      {...props}
    />
  ),
);
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('list-none', className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends React.ComponentProps<'a'> {
  isActive?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ isActive, size = 'medium', disabled = false, className, children, ...props }, ref) => {
    const sizeClasses = {
      small: 'h-8 min-w-8 text-xs px-2',
      medium: 'h-9 min-w-9 text-sm px-3',
      large: 'h-10 min-w-10 text-base px-3.5',
    }[size];

    return (
      <a
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center rounded-(--radius-aurora) font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus select-none',
          sizeClasses,
          isActive
            ? 'bg-aurora-primary font-bold text-aurora-text-on-primary shadow-xs'
            : 'text-aurora-text-primary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary',
          disabled && 'pointer-events-none opacity-40 cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
PaginationLink.displayName = 'PaginationLink';

export interface PaginationPreviousProps extends PaginationLinkProps {
  label?: string;
}

export const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  ({ className, label = 'Anterior', size = 'medium', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Ir a la página anterior"
      size={size}
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <ChevronLeft size={size === 'small' ? 14 : 16} />
      <span className="hidden sm:inline">{label}</span>
    </PaginationLink>
  ),
);
PaginationPrevious.displayName = 'PaginationPrevious';

export interface PaginationNextProps extends PaginationLinkProps {
  label?: string;
}

export const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, label = 'Siguiente', size = 'medium', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Ir a la página siguiente"
      size={size}
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <span className="hidden sm:inline">{label}</span>
      <ChevronRight size={size === 'small' ? 14 : 16} />
    </PaginationLink>
  ),
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'flex h-9 w-9 items-center justify-center text-aurora-text-secondary select-none',
        className,
      )}
      {...props}
    >
      <MoreHorizontal size={16} />
      <span className="sr-only">Más páginas</span>
    </span>
  ),
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
