"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium 
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-60
      active:scale-[0.98] transform-gpu
      shadow-sm hover:shadow-md
    `;
    
    const variants = {
      primary: `
        bg-[var(--primary)] text-white border border-transparent
        hover:bg-[var(--primary-hover)] hover:shadow-lg hover:-translate-y-0.5
        focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
        shadow-[0_4px_14px_0_rgba(103,126,234,0.25)]
        hover:shadow-[0_6px_20px_0_rgba(103,126,234,0.35)]
      `,
      secondary: `
        bg-[var(--surface)] text-[var(--foreground)] border border-[var(--surface-border)]
        hover:bg-[var(--surface-hover)] hover:border-[var(--surface-border-hover)]
        focus-visible:ring-[var(--foreground-muted)] focus-visible:ring-offset-2
        hover:-translate-y-0.5
      `,
      accent: `
        bg-[var(--accent)] text-white border border-transparent
        hover:bg-[var(--accent-hover)] hover:shadow-lg hover:-translate-y-0.5
        focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
        shadow-[0_4px_14px_0_rgba(56,178,172,0.25)]
        hover:shadow-[0_6px_20px_0_rgba(56,178,172,0.35)]
      `,
      danger: `
        bg-[var(--error)] text-white border border-transparent
        hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5
        focus-visible:ring-[var(--error)] focus-visible:ring-offset-2
        shadow-[0_4px_14px_0_rgba(245,101,101,0.25)]
        hover:shadow-[0_6px_20px_0_rgba(245,101,101,0.35)]
      `,
      outline: `
        bg-transparent text-[var(--primary)] border border-[var(--primary)]
        hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)]
        focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
        hover:-translate-y-0.5
      `,
      ghost: `
        bg-transparent text-[var(--foreground-muted)] border border-transparent
        hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]
        focus-visible:ring-[var(--foreground-muted)] focus-visible:ring-offset-2
        hover:-translate-y-0.5
      `
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs rounded-[var(--radius-md)] gap-1.5",
      md: "h-10 px-4 text-sm rounded-[var(--radius-lg)] gap-2",
      lg: "h-12 px-6 text-base rounded-[var(--radius-lg)] gap-2.5"
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps }; 