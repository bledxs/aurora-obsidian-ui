import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Item list to generate breadcrumbs automatically without manual subcomponents.
   */
  items?: BreadcrumbItemData[];
  /**
   * Custom separator between elements (applies when the `items` prop is used).
   */
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, children, className, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
        {items ? (
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <React.Fragment key={typeof item.label === 'string' ? item.label : index}>
                  <BreadcrumbItem>
                    {isLast || !item.href ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        ) : (
          children
        )}
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 wrap-break-word font-sans text-sm text-aurora-text-secondary sm:gap-2',
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'rounded-sm transition-colors hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus',
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-current="page"
    className={cn('font-medium text-aurora-text-primary', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  const hasValidChildren =
    React.isValidElement(children) ||
    (typeof children === 'string' && children.trim().length > 0) ||
    typeof children === 'number';

  return (
    <li
      aria-hidden="true"
      className={cn('text-aurora-text-disabled [&>svg]:size-3.5 select-none', className)}
      {...props}
    >
      {hasValidChildren ? children : <ChevronRight className="h-3.5 w-3.5" />}
    </li>
  );
};
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    className={cn('flex h-6 w-6 items-center justify-center text-aurora-text-disabled', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    <span className="sr-only">More pages</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
