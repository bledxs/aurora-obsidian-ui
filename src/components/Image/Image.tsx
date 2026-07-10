import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import styles from './Image.module.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Texto alternativo obligatorio para accesibilidad
   */
  alt: string;
  /**
   * Imagen a mostrar si falla la carga de la imagen principal
   */
  fallbackSrc?: string;
  /**
   * Proporción de la imagen para reservar su espacio y evitar layout shift
   * @default 'auto'
   */
  aspectRatio?: '1/1' | '4/3' | '16/9' | 'auto';
  /**
   * Cómo se ajusta la imagen a su contenedor
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /**
   * Si es true, añade loading="lazy" de forma nativa
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
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setStatus('loaded');
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

    // Reseteamos el estado si la fuente externa cambia
    useEffect(() => {
      setCurrentSrc(src);
      setStatus('loading');
    }, [src]);

    // Mapeo seguro de la prop aspectRatio a una clase CSS
    const aspectClass = `aspect-${aspectRatio.replace('/', '-')}`;

    return (
      <div className={`${styles.wrapper} ${styles[aspectClass]} ${className || ''}`} style={style}>
        {status === 'loading' && (
          <div className={styles.loaderContainer}>
            <Spinner color="neutral" />
          </div>
        )}

        {status === 'error' && !fallbackSrc && (
          <div className={styles.errorContainer}>
            <svg
              className={styles.errorIcon}
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
              <line x1="3" y1="3" x2="21" y2="21" />
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
          className={`${styles.image} ${styles[objectFit]} ${status === 'loaded' ? styles.loaded : ''} ${status === 'error' ? styles.hidden : ''}`}
          {...props}
        />
      </div>
    );
  },
);

Image.displayName = 'Image';
