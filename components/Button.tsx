"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-flame text-ink hover:bg-flame-dim hover:shadow-[var(--glow-flame)]",
  secondary:
    "border border-wire text-ink hover:border-flame hover:text-flame-text",
  ghost: "text-ink-dim hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium tracking-wide
          transition-all duration-200 ease-out
          hover:scale-[1.015] active:scale-[0.985]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame
          ${variants[variant]} ${sizes[size]}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading…
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
