import * as React from "react"
import { cn } from "../lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";
    const variants = {
      primary: "bg-lime text-bg-base hover:bg-lime-soft shadow-[0_2px_0_var(--color-lime-deep)] rounded-1",
      secondary: "bg-transparent border border-rule-strong text-cream hover:bg-lime-tint rounded-1",
      ghost: "text-bone hover:text-cream hover:bg-white/5 rounded-1",
    };
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2 bg-bg-high border border-rule px-3 py-2 text-sm text-cream transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-cream placeholder:text-char focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime focus-visible:border-lime disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium text-bone mb-1.5 block", className)} {...props} />
  )
)
Label.displayName = "Label"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("bg-bg-paper border border-rule rounded-3", className)} {...props} />
  )
)
Card.displayName = "Card"

const Chip = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { variant?: 'success' | 'warn' | 'danger' | 'info' | 'neutral' | 'lime' }>(
  ({ className, variant = 'neutral', ...props }, ref) => {
    const variants = {
      success: "bg-good/10 text-good",
      warn: "bg-warn/10 text-warn",
      danger: "bg-bad/10 text-bad",
      info: "bg-info/10 text-info",
      neutral: "bg-rule-strong text-bone",
      lime: "bg-lime-tint text-lime",
    };
    return (
      <span ref={ref} className={cn("inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-medium", variants[variant], className)} {...props} />
    )
  }
)
Chip.displayName = "Chip"

export { Button, Input, Label, Card, Chip }
