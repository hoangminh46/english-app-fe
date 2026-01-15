'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'success' 
  | 'ghost' 
  | 'outline' 
  | 'gray';

export type ButtonSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground border-b-4 border-emerald-700 hover:brightness-110 active:border-b-0 active:translate-y-1',
  secondary: 'bg-secondary text-secondary-foreground border-b-4 border-orange-700 hover:brightness-110 active:border-b-0 active:translate-y-1',
  danger: 'bg-destructive text-destructive-foreground border-b-4 border-red-900 hover:brightness-110 active:border-b-0 active:translate-y-1',
  success: 'bg-green-500 text-white border-b-4 border-green-700 hover:brightness-110 active:border-b-0 active:translate-y-1',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  outline: 'bg-transparent border-2 border-input text-foreground hover:bg-muted active:translate-y-1',
  gray: 'bg-muted text-muted-foreground border-b-4 border-gray-400 hover:bg-gray-200 active:border-b-0 active:translate-y-1',
};

const sizeClasses: Record<ButtonSize, string> = {
  none: '',
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-4 py-2 text-sm rounded-2xl',
  lg: 'px-6 py-3 text-base rounded-2xl',
  xl: 'px-8 py-4 text-lg rounded-3xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-4';
    
    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className
    ].join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
