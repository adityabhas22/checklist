"use client";

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-[var(--foreground-secondary)] tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              `
                flex h-11 w-full rounded-[var(--radius-lg)] 
                border border-[var(--surface-border)]
                bg-[var(--surface)] 
                px-4 py-3 text-sm font-medium
                text-[var(--foreground)]
                placeholder:text-[var(--foreground-light)] placeholder:font-normal
                transition-all duration-200 ease-out
                
                focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2
                focus:border-[var(--primary)] focus:bg-[var(--surface)]
                focus:shadow-[0_0_0_3px_rgba(103,126,234,0.1)]
                
                hover:border-[var(--surface-border-hover)]
                hover:shadow-[var(--shadow-sm)]
                
                disabled:cursor-not-allowed disabled:opacity-60
                disabled:bg-[var(--background-secondary)]
                
                file:border-0 file:bg-transparent file:text-sm file:font-medium
              `,
              error && `
                border-[var(--error)] focus:border-[var(--error)] 
                focus:ring-[var(--error)] focus:shadow-[0_0_0_3px_rgba(245,101,101,0.1)]
              `,
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[var(--error)]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-[var(--error)] flex items-center gap-1.5">
            <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 0v.008h.008V12.75H12zm0 4.5h.008v.008H12v-.008z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps }; 