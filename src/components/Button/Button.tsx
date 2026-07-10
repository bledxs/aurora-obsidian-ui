import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}: ButtonProps) => {
  const modeClass = styles[variant];
  const sizeClass = styles[size];
  
  return (
    <button
      type="button"
      className={[styles.button, modeClass, sizeClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
