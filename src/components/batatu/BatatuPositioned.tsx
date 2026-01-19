/**
 * BatatuPositioned - Batatu em posições estratégicas estilo Duolingo
 */
import { cn } from '@/lib/utils';
import { BatatuMascot } from '@/components/BatatuMascot';
import type { Persona } from '@/types';

type Position = 'bottom-left' | 'bottom-right' | 'top-right' | 'center' | 'hidden';
type Mood = 'happy' | 'excited' | 'relaxed' | 'thinking' | 'sad';

interface BatatuPositionedProps {
    position: Position;
    persona: Persona;
    mood?: Mood;
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    className?: string;
}

const positionStyles: Record<Position, string> = {
    'bottom-left': 'fixed bottom-20 left-4 -rotate-6 z-30',
    'bottom-right': 'fixed bottom-20 right-4 rotate-6 z-30',
    'top-right': 'fixed top-20 right-4 z-30',
    'center': 'relative z-10',
    'hidden': 'hidden',
};

export function BatatuPositioned({
    position,
    persona,
    mood = 'happy',
    size = 'md',
    message,
    className,
}: BatatuPositionedProps) {
    if (position === 'hidden') return null;

    return (
        <div
            className={cn(
                positionStyles[position],
                'transition-all duration-500 animate-bounce-soft',
                className
            )}
        >
            {/* Balão de fala opcional */}
            {message && (
                <div className={cn(
                    'absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap',
                    'bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-lg',
                    'text-sm font-medium text-foreground',
                    'before:content-[""] before:absolute before:bottom-0 before:left-1/2',
                    'before:-translate-x-1/2 before:translate-y-2',
                    'before:border-8 before:border-transparent before:border-t-white',
                    'dark:before:border-t-slate-800'
                )}>
                    {message}
                </div>
            )}

            <BatatuMascot
                persona={persona}
                mood={mood}
                size={size}
            />
        </div>
    );
}

// Wrapper para Batatu com entrada animada
export function BatatuAnimated({
    persona,
    mood = 'excited',
    entering = false,
    className,
}: {
    persona: Persona;
    mood?: Mood;
    entering?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'transition-all duration-700',
                entering ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                className
            )}
        >
            <BatatuMascot
                persona={persona}
                mood={mood}
                size="lg"
            />
        </div>
    );
}
