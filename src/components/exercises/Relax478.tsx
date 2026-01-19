/**
 * Relax478 - Exercício 4-7-8
 * Foco visual na contagem e anéis concêntricos
 * Inspira (4s), Segura (7s), Expira (8s)
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { cn } from '@/lib/utils';

export function Relax478({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 7000,
        exhaleTime: 8000,
        holdOutTime: 0, // Sem pausa no 4-7-8
        onCycleComplete,
    });

    const getTimer = () => {
        const total = phase === 'inhale' ? 4 : phase === 'hold-in' ? 7 : 8;
        return Math.ceil(total - (progress * total));
    };

    // 3 anéis que pulsam
    const rings = [1, 2, 3];

    return (
        <div className="flex flex-col items-center justify-center w-full h-[320px] relative">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Pulsing Rings */}
                {rings.map((ring) => (
                    <div
                        key={ring}
                        className={cn(
                            "absolute rounded-full border transition-all duration-1000",
                            phase === 'inhale' && "border-[var(--color-primary)] opacity-30",
                            phase === 'hold-in' && "border-[var(--color-secondary)] opacity-50",
                            phase === 'exhale' && "border-slate-300 opacity-20"
                        )}
                        style={{
                            width: `${100 + (ring * 40)}px`,
                            height: `${100 + (ring * 40)}px`,
                            transform: phase === 'inhale'
                                ? `scale(${1 + (progress * 0.2)})` // Expande levemente
                                : phase === 'exhale'
                                    ? `scale(${1.2 - (progress * 0.2)})` // Contrai
                                    : 'scale(1.2)' // Segura expandido
                        }}
                    />
                ))}

                {/* Central Counter */}
                <div className={cn(
                    "w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg transition-colors duration-500",
                    phase === 'inhale' ? "bg-[var(--color-primary)] text-white" :
                        phase === 'hold-in' ? "bg-[var(--color-secondary)] text-white" :
                            "bg-slate-100 dark:bg-slate-800 text-[var(--color-text)] border border-slate-200"
                )}>
                    <span className="text-4xl font-black mb-1">{getTimer()}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                        {phase?.replace('hold-in', 'segura').replace('exhale', 'solta').replace('inhale', 'inspira')}
                    </span>
                </div>
            </div>
        </div>
    );
}
