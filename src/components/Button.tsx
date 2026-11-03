import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-sm)',
      fontFamily: 'var(--font-family)',
      fontWeight: 'var(--font-weight-medium)',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      position: 'relative',
      width: fullWidth ? '100%' : 'auto',
    } as React.CSSProperties;

    const sizeStyles = {
      sm: {
        padding: 'var(--spacing-xs) var(--spacing-md)',
        fontSize: 'var(--font-size-sm)',
        height: '32px',
      },
      md: {
        padding: 'var(--spacing-sm) var(--spacing-lg)',
        fontSize: 'var(--font-size-base)',
        height: '40px',
      },
      lg: {
        padding: 'var(--spacing-md) var(--spacing-xl)',
        fontSize: 'var(--font-size-lg)',
        height: '48px',
      },
    }[size];

    const variantStyles = {
      primary: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-text-inverse)',
        boxShadow: 'var(--shadow-sm)',
      },
      secondary: {
        backgroundColor: 'var(--color-secondary-light)',
        color: 'var(--color-text-primary)',
        boxShadow: 'var(--shadow-sm)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
        border: '1px solid var(--color-primary)',
        boxShadow: 'none',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-secondary)',
        boxShadow: 'none',
      },
      danger: {
        backgroundColor: 'var(--color-error)',
        color: 'var(--color-text-inverse)',
        boxShadow: 'var(--shadow-sm)',
      },
    }[variant];

    const hoverStyles = {
      primary: { backgroundColor: 'var(--color-primary-hover)' },
      secondary: { backgroundColor: 'var(--color-secondary-hover)', color: 'var(--color-text-primary)' },
      outline: { backgroundColor: 'var(--color-primary-light)' },
      ghost: { backgroundColor: 'var(--color-background-tertiary)', color: 'var(--color-text-primary)' },
      danger: { backgroundColor: '#b91c1c' },
    }[variant];

    const activeStyles = {
      primary: { backgroundColor: 'var(--color-primary-dark)' },
      secondary: { backgroundColor: 'var(--color-secondary)' },
      outline: { backgroundColor: 'var(--color-primary-light)' },
      ghost: { backgroundColor: 'var(--color-border)' },
      danger: { backgroundColor: '#991b1b' },
    }[variant];

    const disabledStyles = {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    };

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...(disabled || loading ? disabledStyles : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        className={className}
        style={combinedStyles}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
            />
          </svg>
        ) : (
          <>{
            icon && iconPosition === 'left' && (
              <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
