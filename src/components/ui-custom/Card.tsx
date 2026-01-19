/**
 * Card - Componente de card reutilizável com variantes
 */
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'glass' | 'interactive';

interface CardProps {
    children: ReactNode;
    variant?: CardVariant;
    className?: string;
    onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-card border border-border',
    elevated: 'bg-card shadow-card',
    glass: 'bg-card/80 backdrop-blur-md border border-white/20',
    interactive: `
    bg-card border-2 border-transparent cursor-pointer
    transition-all duration-300 hover:scale-[1.02] hover:shadow-card
    active:scale-[0.98]
  `,
};

export function Card({ children, variant = 'default', className, onClick }: CardProps) {
    const Component = onClick ? 'button' : 'div';

    return (
        <Component
            onClick={onClick}
            className={cn(
                'rounded-2xl p-4',
                variantStyles[variant],
                onClick && 'text-left w-full',
                className
            )}
        >
            {children}
        </Component>
    );
}

// Sub-componentes
export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('mb-3', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
    return <h3 className={cn('font-bold text-lg text-foreground', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
    return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('mt-4 flex items-center gap-3', className)}>{children}</div>;
}
