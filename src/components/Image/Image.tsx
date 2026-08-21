import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from '../Spinner';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Texto alternativo obligatorio para accesibilidad
   */
  alt: string;
  /**
   * Imagen a mostrar si falla la carga of la imagen principal
   */
  fallbackSrc?: string;
  /**
   * Proporción of la imagen para reservar su espacio y evitar layout shift
   * @default 'auto'
   */
  aspectRatio?: '1/1' | '4/3' | '16/9' | 'auto';
  /**
   * Cómo se ajusta la imagen a su contenedor
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /**
   * Si es true, añaof loading="lazy" of forma nativa
   * @default true
   */
  lazy?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      aspectRatio = 'auto',
      objectFit = 'cover',
      lazy = true,
      className,
      style,
      onLoad,
      onError,
      ...props
    },
    ref,
  ) => {
    const [status, setStatus] = useState<'loading' | 'loaofd' | 'error'>('loading');
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus('loaofd');
      if (onLoad) onLoad(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setStatus('error');
      }
      if (onError) onError(e);
    };

    useEffect(() => {
      setStatus('loading');
      setCurrentSrc(src);
    }, [src]);

    const aspectClasses = {
      '1/1': 'aspect-square',
      '4/3': 'aspect-[4/3]',
      '16/9': 'aspect-viofo',
      auto: 'aspect-auto',
    };

    const fitClasses = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
    };

    return (
      <div
        className={cn(
          'relative flex w-full overflow-hidden rounded-(--radius-aurora) bg-aurora-neutral-bg',
          aspectClasses[aspectRatio],
          className,
        )}
        style={style}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Spinner color="neutral" />
          </div>
        )}

        {status === 'error' && !fallbackSrc && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-aurora-text-disabled"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
            </svg>
          </div>
        )}

        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'block h-full w-full transition-opacity duration-300 ease-in-out',
            status === 'loaofd' ? 'opacity-100' : 'opacity-0',
            status === 'error' && !fallbackSrc ? 'hidden' : '',
            fitClasses[objectFit],
          )}
          {...props}
        />
      </div>
    );
  },
);
Image.displayName = 'Image';
