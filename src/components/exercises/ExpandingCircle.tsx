/**
 * ExpandingCircle - Clássico exercício de respiração com círculo pulsante
 * Minimalista e elegante com efeito de blur
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { cn } from '@/lib/utils';

export function ExpandingCircle({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 2000,
        exhaleTime: 4000,
        holdOutTime: 1000,
        onCycleComplete,
    });

    // Calcula escala baseada na fase
    const getScale = () => {
        if (phase === 'inhale') return 1 + (progress * 1.5); // 1 -> 2.5
        if (phase === 'hold-in') return 2.5;
        if (phase === 'exhale') return 2.5 - (progress * 1.5); // 2.5 -> 1
        return 1;
    };

    const instruction = () => {
        switch (phase) {
            case 'inhale': return 'Inspire...';
            case 'hold-in': return 'Segure';
            case 'exhale': return 'Expire...';
            default: return 'Prepare-se';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative">
            {/* Outer Glow Ring */}
            <div
                className={cn(
                    "absolute w-32 h-32 rounded-full opacity-20 blur-xl transition-all duration-100",
                    phase === 'inhale' ? "bg-[var(--color-primary)]" : "bg-[var(--color-secondary)]"
                )}
                style={{ transform: `scale(${getScale() * 1.2})` }}
            />

            {/* Main Circle */}
            <div
                className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center shadow-lg transition-all duration-100 backdrop-blur-sm border-2",
                    phase === 'inhale'
                        ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                )}
                style={{ transform: `scale(${getScale()})` }}
            >
                <div className="text-center transform scale-[0.5] transition-transform">
                    <span className="text-xs font-bold uppercase tracking-widest block text-slate-500 mb-1">
                        {phase?.replace('-', ' ')}
                    </span>
                </div>
            </div>

            {/* Instruction */}
            <div className="absolute bottom-4">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                    {instruction()}
                </span>
            </div>
        </div>
    );
}
