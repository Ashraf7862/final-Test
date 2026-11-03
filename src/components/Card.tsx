import React, { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = {
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--color-surface)',
      transition: 'all var(--transition-normal)',
    } as React.CSSProperties;

    const variantStyles = {
      default: {
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      },
      outlined: {
        border: '1px solid var(--color-border)',
        boxShadow: 'none',
      },
      elevated: {
        border: 'none',
        boxShadow: 'var(--shadow-md)',
      },
      filled: {
        border: 'none',
        backgroundColor: 'var(--color-background-secondary)',
        boxShadow: 'none',
      },
    }[variant];

    const paddingStyles = {
      none: { padding: 0 },
      sm: { padding: 'var(--spacing-sm)' },
      md: { padding: 'var(--spacing-lg)' },
      lg: { padding: 'var(--spacing-xl)' },
    }[padding];

    const hoverStyles = hoverable
      ? {
          '&:hover': {
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border-hover)',
            transform: 'translateY(-2px)',
          },
        }
      : {};

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles,
      ...paddingStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={combinedStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', style, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        paddingBottom: 'var(--spacing-md)',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: 'var(--spacing-md)',
        ...style,
      }}
      {...props}