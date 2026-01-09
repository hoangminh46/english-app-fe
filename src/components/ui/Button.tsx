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
  primary: 'bg-blue-600 text-white border-2 border-transparent hover:bg-blue-700 shadow-sm focus-visible:ring-blue-500',
  secondary: 'bg-indigo-600 text-white border-2 border-transparent hover:bg-indigo-700 shadow-sm focus-visible:ring-indigo-500',
  danger: 'bg-red-600 text-white border-2 border-transparent hover:bg-red-700 shadow-sm focus-visible:ring-red-500',
  success: 'bg-emerald-600 text-white border-2 border-transparent hover:bg-emerald-700 shadow-sm focus-visible:ring-emerald-500',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-500',
  outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500',
  gray: 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200 focus-visible:ring-gray-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  none: '',
  sm: 'px-3 py-1.5 text-xs sm:text-sm',
  md: 'px-4 py-2 text-sm sm:text-base',
  lg: 'px-6 py-2.5 text-base sm:text-lg',
  xl: 'px-8 py-4 text-lg sm:text-xl',
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
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]';
    
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
