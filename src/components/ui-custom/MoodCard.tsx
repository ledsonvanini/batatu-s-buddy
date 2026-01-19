/**
 * MoodCard - Card de seleção de humor SEM EMOJIS
 * Usa ícones Lucide para visual consistente
 */
import { cn } from '@/lib/utils';
import {
    CloudRain,
    Mic,
    Moon,
    Heart,
    Users,
    Sparkles,
    ChevronRight,
    type LucideIcon
} from 'lucide-react';
import type { Contexto } from '@/types';

interface MoodCardProps {
    contexto: Contexto;
    title: string;
    subtitle?: string;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}

// Mapeamento de contexto para ícone e cores
const contextoConfig: Record<Contexto, {
    Icon: LucideIcon;
    bgClass: string;
    iconClass: string;
}> = {
    dia_tenso: {
        Icon: CloudRain,
        bgClass: 'bg-indigo-100 dark:bg-indigo-900/30',
        iconClass: 'text-indigo-600 dark:text-indigo-400',
    },
    entrevista: {
        Icon: Mic,
        bgClass: 'bg-purple-100 dark:bg-purple-900/30',
        iconClass: 'text-purple-600 dark:text-purple-400',
    },
    sem_sono: {
        Icon: Moon,
        bgClass: 'bg-slate-100 dark:bg-slate-800/50',
        iconClass: 'text-slate-600 dark:text-slate-400',
    },
    crush: {
        Icon: Heart,
        bgClass: 'bg-rose-100 dark:bg-rose-900/30',
        iconClass: 'text-rose-600 dark:text-rose-400',
    },
    familia: {
        Icon: Users,
        bgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
        iconClass: 'text-emerald-600 dark:text-emerald-400',
    },
    neutro: {
        Icon: Sparkles,
        bgClass: 'bg-amber-100 dark:bg-amber-900/30',
        iconClass: 'text-amber-600 dark:text-amber-400',
    },
};

export function MoodCard({
    contexto,
    title,
    subtitle,
    selected = false,
    onClick,
    className,
}: MoodCardProps) {
    const config = contextoConfig[contexto];
    const Icon = config.Icon;

    return (
        <button
            onClick={onClick}
            className={cn(
                'mood-card w-full text-left group',
                selected && 'ring-2 ring-[var(--color-primary)] ring-offset-2',
                className
            )}
        >
            {/* Icon */}
            <div className={cn('mood-card-icon', config.bgClass)}>
                <Icon className={cn('w-6 h-6', config.iconClass)} />
            </div>

            {/* Content */}
            <div className="mood-card-content">
                <span className="mood-card-title">{title}</span>
                {subtitle && (
                    <span className="mood-card-subtitle">{subtitle}</span>
                )}
            </div>

            {/* Arrow */}
            <ChevronRight className="mood-card-arrow w-5 h-5" />
        </button>
    );
}
