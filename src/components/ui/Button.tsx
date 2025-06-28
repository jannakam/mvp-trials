import React from 'react';
import Link from 'next/link';
import { Icons, iconSizes } from './Icons';

// Button size variants
export const buttonSizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
} as const;

// Button variant styles
export const buttonVariants = {
  primary: 'bg-accent-peach text-white hover:bg-accent-peach-dark focus:ring-accent-peach/20',
  secondary: 'bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark focus:ring-accent-olive/20',
  outline: 'border-2 border-accent-peach text-accent-peach hover:bg-accent-peach hover:text-white focus:ring-accent-peach/20',
  ghost: 'text-accent-olive-dark dark:text-neutral-beige border border-accent-peach/50 hover:border-accent-peach hover:bg-accent-peach/5 focus:ring-accent-peach/20',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/20',
  success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500/20'
} as const;

// Button icon positions
export const iconPositions = {
  left: 'flex-row',
  right: 'flex-row-reverse',
  top: 'flex-col',
  bottom: 'flex-col-reverse'
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon?: React.ReactNode;
  iconPosition?: keyof typeof iconPositions;
  iconSize?: keyof typeof iconSizes;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left',
    iconSize = 'sm',
    loading = false,
    fullWidth = false,
    className = '',
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseClasses = [
      'mobile-button',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'touch-target',
      buttonSizes[size],
      buttonVariants[variant],
      iconPosition === 'left' || iconPosition === 'right' ? 'space-x-2 rtl:space-x-reverse' : 'space-y-1',
      iconPosition === 'left' || iconPosition === 'right' ? iconPositions[iconPosition] : iconPositions[iconPosition],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Icons.Clock size={iconSize} className="animate-spin" />
        )}
        {!loading && icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <span className="flex-shrink-0">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon button variant for buttons that only contain icons
interface IconButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon: React.ReactNode;
  iconSize?: keyof typeof iconSizes;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  'aria-label': string;
  onClick?: () => void;
  href?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  ({ 
    variant = 'secondary', 
    size = 'md', 
    icon, 
    iconSize = 'md',
    loading = false,
    className = '',
    disabled,
    'aria-label': ariaLabel,
    onClick,
    href,
    ...props 
  }, ref) => {
    const iconButtonSizes = {
      xs: 'p-1',
      sm: 'p-2', 
      md: 'p-2',
      lg: 'p-3',
      xl: 'p-4'
    } as const;

    const baseClasses = [
      'mobile-button',
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'touch-target',
      iconButtonSizes[size],
      buttonVariants[variant],
      className
    ].filter(Boolean).join(' ');

    const iconContent = (
      <>
        {loading ? (
          <Icons.Clock size={iconSize} className="animate-spin" />
        ) : (
          <div className={`flex items-center justify-center ${iconSizes[iconSize]}`}>
            {icon}
          </div>
        )}
      </>
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {iconContent}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        onClick={onClick}
        {...props}
      >
        {iconContent}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton'; 