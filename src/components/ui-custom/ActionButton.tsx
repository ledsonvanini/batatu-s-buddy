/**
 * ActionButton - Botões de ação principal e secundária
 */
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ActionButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
    className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-primary text-primary-foreground 
    hover:brightness-110 active:brightness-95
    shadow-md hover:shadow-lg
  `,
    secondary: `
    bg-muted text-foreground  
    hover:bg-muted/80 active:bg-muted/60
  `,
    ghost: `
    bg-transparent text-foreground
    hover:bg-muted/50 active:bg-muted/30
  `,
    outline: `
    bg-transparent text-primary border-2 border-primary
    hover:bg-primary/10 active:bg-primary/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-base rounded-xl gap-2',
    lg: 'px-8 py-4 text-lg font-bold rounded-2xl gap-3',
};

export function ActionButton({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    disabled = false,
    fullWidth = false,
    onClick,
    className,
}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'inline-flex items-center justify-center font-semibold transition-all duration-200',
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </button>
    );
}

// CTA específico para pós-atividade
export function CTAButton({
    children,
    onClick,
    className,
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <ActionButton
            variant="primary"
            size="lg"
            fullWidth
            onClick={onClick}
            className={cn('animate-pulse hover:animate-none', className)}
        >
            {children}
        </ActionButton>
    );
}

// Link secundário
export function TextLink({
    children,
    onClick,
    className,
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors',
                className
            )}
        >
            {children}
        </button>
    );
}
