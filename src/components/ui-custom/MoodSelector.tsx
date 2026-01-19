/**
 * MoodSelector - Card de seleção de humor reimaginado
 */
import { cn } from '@/lib/utils';
import { Card } from './Card';
import type { Contexto } from '@/types';

interface MoodSelectorProps {
    contexto: Contexto;
    emoji: string;
    label: string;
    description?: string;
    selected?: boolean;
    personaColor?: 'empolgado' | 'ouvinte' | 'conselheiro';
    onClick?: () => void;
    className?: string;
}

const personaGradients = {
    empolgado: 'from-orange-50 to-orange-100/50 border-orange-200/50 hover:border-orange-300',
    ouvinte: 'from-blue-50 to-blue-100/50 border-blue-200/50 hover:border-blue-300',
    conselheiro: 'from-emerald-50 to-emerald-100/50 border-emerald-200/50 hover:border-emerald-300',
};

export function MoodSelector({
    emoji,
    label,
    description,
    selected = false,
    personaColor = 'empolgado',
    onClick,
    className,
}: MoodSelectorProps) {
    return (
        <Card
            variant="interactive"
            onClick={onClick}
            className={cn(
                'bg-gradient-to-br border-2 transition-all',
                personaGradients[personaColor],
                selected && 'ring-2 ring-primary ring-offset-2 scale-[1.02]',
                className
            )}
        >
            <div className="flex items-center gap-4">
                {/* Emoji badge */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{emoji}</span>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base truncate">{label}</h3>
                    {description && (
                        <p className="text-sm text-muted-foreground truncate">{description}</p>
                    )}
                </div>

                {/* Arrow indicator */}
                <div className="flex-shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </Card>
    );
}
