import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface NavbarLink {
  /**
   * Etiqueta visible del enlace
   */
  label: React.ReactNode;
  /**
   * Destino del enlace
   */
  href?: string;
  /**
   * Si es true, resalta el enlace como página activa
   */
  active?: boolean;
  /**
   * Callback invocado al hacer clic en el enlace
   */
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Logotipo o marca a la izquierda
   */
  brand?: React.ReactNode;
  /**
   * Enlaces de navegación principales (modo declarativo)
   */
  links?: NavbarLink[];
  /**
   * Cantidad de productos en el carrito para mostrar en el badge
   */
  cartCount?: number;
  /**
   * Callback invocado al hacer clic en el botón del carrito
   */
  onCartClick?: () => void;
  /**
   * Callback invocado al hacer clic en el botón de cuenta de usuario
   */
  onUserClick?: () => void;
  /**
   * Si es true, muestra la barra o disparador de búsqueda integrada
   * @default false
   */
  showSearch?: boolean;
  /**
   * Placeholder para el input de búsqueda
   * @default 'Buscar productos...'
   */
  searchPlaceholder?: string;
  /**
   * Callback invocado al escribir en el buscador
   */
  onSearchChange?: (query: string) => void;
  /**
   * Si es true, fija la barra en la parte superior con backdrop blur
   * @default true
   */
  sticky?: boolean;
  /**
   * Acciones personalizadas adicionales a la derecha
   */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      links,
      cartCount,
      onCartClick,
      onUserClick,
      showSearch = false,
      searchPlaceholder = 'Buscar productos...',
      onSearchChange,
      sticky = true,
      actions,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [searchExpanded, setSearchExpanded] = React.useState(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const handleOpenSearch = React.useCallback(() => {
      setSearchExpanded(true);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }, []);

    const handleCloseSearch = React.useCallback(() => {
      setSearchExpanded(false);
    }, []);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && searchExpanded) {
          handleCloseSearch();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchExpanded, handleCloseSearch]);

    return (
      <header
        ref={ref}
        className={cn(
          'relative w-full border-b border-aurora-border bg-aurora-surface/95 font-sans text-aurora-text-primary backdrop-blur-md transition-all',
          sticky && 'sticky top-0 z-40',
          className,
        )}
        {...props}
      >
        {/* Buscador inteligente expandido en pantalla completa/cabecera */}
        {searchExpanded ? (
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="flex flex-1 items-center gap-3">
              <Search size={18} className="text-aurora-text-secondary shrink-0" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full bg-transparent text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary focus-visible:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleCloseSearch}
              className="rounded-full p-2 text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus cursor-pointer"
              aria-label="Cerrar buscador"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
            {/* Lado Izquierdo: Menú Móvil + Marca + Enlaces */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-8">
              {links && links.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex shrink-0 cursor-pointer rounded-md p-1.5 sm:p-2 text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus lg:hidden"
                  aria-label="Abrir menú de navegación"
                  aria-expanded={mobileMenuOpen}
                >
                  <Menu size={20} />
                </button>
              )}

              {brand && (
                <div className="flex min-w-0 shrink items-center font-bold text-base sm:text-lg tracking-tight truncate">
                  {brand}
                </div>
              )}

              {/* Enlaces de Navegación Desktop */}
              {links && links.length > 0 && (
                <nav
                  className="hidden items-center gap-5 lg:flex xl:gap-7"
                  aria-label="Navegación principal"
                >
                  {links.map((link) => (
                    <a
                      key={typeof link.label === 'string' ? link.label : (link.href ?? 'link')}
                      href={link.href || '#'}
                      onClick={link.onClick}
                      className={cn(
                        'shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-aurora-primary',
                        link.active
                          ? 'font-semibold text-aurora-primary'
                          : 'text-aurora-text-secondary hover:text-aurora-text-primary',
                      )}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* Lado Derecho: Buscador inteligente + Acciones de usuario y carrito */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {showSearch && (
                <button
                  type="button"
                  onClick={handleOpenSearch}
                  className="hidden sm:inline-flex relative cursor-pointer rounded-full p-2 text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
                  aria-label="Abrir buscador"
                >
                  <Search size={20} />
                </button>
              )}

              {actions}

              {onUserClick && (
                <button
                  type="button"
                  onClick={onUserClick}
                  className="relative cursor-pointer rounded-full p-1.5 sm:p-2 text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
                  aria-label="Cuenta de usuario"
                >
                  <User size={20} />
                </button>
              )}

              {onCartClick && (
                <button
                  type="button"
                  onClick={onCartClick}
                  className="relative cursor-pointer rounded-full p-1.5 sm:p-2 text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus"
                  aria-label={`Carrito de compras, ${cartCount ?? 0} artículos`}
                >
                  <ShoppingBag size={20} />
                  {cartCount !== undefined && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-aurora-primary font-bold text-[9px] sm:text-[10px] text-white shadow-xs">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Menú desplegable Móvil */}
        {mobileMenuOpen && links && links.length > 0 && !searchExpanded && (
          <div className="border-t border-aurora-border bg-aurora-surface px-4 pt-2 pb-4 space-y-1 lg:hidden animate-fade-in">
            {showSearch && (
              <div className="relative my-3">
                <Search
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-aurora-text-secondary"
                />
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="h-9 w-full rounded-full border border-aurora-border bg-aurora-neutral-bg pr-3 pl-9 text-aurora-text-primary text-xs placeholder:text-aurora-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-border-focus/20"
                />
              </div>
            )}
            {links.map((link) => (
              <a
                key={typeof link.label === 'string' ? link.label : (link.href ?? 'link')}
                href={link.href || '#'}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  link.onClick?.(e);
                }}
                className={cn(
                  'block rounded-md py-2 px-3 font-medium text-base transition-colors',
                  link.active
                    ? 'bg-aurora-neutral-bg font-semibold text-aurora-primary'
                    : 'text-aurora-text-secondary hover:bg-aurora-neutral-bg hover:text-aurora-text-primary',
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {children}
      </header>
    );
  },
);
Navbar.displayName = 'Navbar';

export const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center font-bold text-lg tracking-tight', className)}
      {...props}
    />
  ),
);
NavbarBrand.displayName = 'NavbarBrand';

export const NavbarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn('hidden items-center space-x-8 md:flex', className)} {...props} />
  ),
);
NavbarNav.displayName = 'NavbarNav';

export const NavbarItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ active, className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'text-sm font-medium transition-colors hover:text-aurora-primary',
      active ? 'font-semibold text-aurora-primary' : 'text-aurora-text-secondary',
      className,
    )}
    {...props}
  />
));
NavbarItem.displayName = 'NavbarItem';

export const NavbarActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-3', className)} {...props} />
  ),
);
NavbarActions.displayName = 'NavbarActions';
