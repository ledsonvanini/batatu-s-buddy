/**
 * TriangleBalance - Triângulo equilátero para respiração triangular
 * Inspira, Segura, Expira (Tempos iguais)
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';

export function TriangleBalance({ persona, onCycleComplete }: BreathingGameProps) {
    // Respiração triangular: 4-4-4
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 4000,
        exhaleTime: 4000,
        holdOutTime: 0,
        onCycleComplete,
    });

    // Triângulo Equilátero
    // Top: (100, 20), BottomRight: (180, 160), BottomLeft: (20, 160)
    // Perímetro total aprox 500
    // Inhale: BottomLeft -> Top
    // Hold: Top -> BottomRight
    // Exhale: BottomRight -> BottomLeft

    const totalLength = 500;

    const getDashoffset = () => {
        const p = progress;
        // Inhale (0-1/3 do total se fosse continuo, mas aqui fazemos por fase)
        // Reset offset a cada fase? Não, queremos desenhar continuo

        // Vamos mapear fase para progresso total do path
        // Inhale: 0 -> 0.33
        // Hold: 0.33 -> 0.66
        // Exhale: 0.66 -> 1.0

        let totalProgress = 0;
        if (phase === 'inhale') totalProgress = p * 0.333;
        else if (phase === 'hold-in') totalProgress = 0.333 + (p * 0.333);
        else if (phase === 'exhale') totalProgress = 0.666 + (p * 0.333);

        return totalLength - (totalProgress * totalLength);
    };

    const getLabel = () => {
        switch (phase) {
            case 'inhale': return 'Inspira';
            case 'hold-in': return 'Segura';
            case 'exhale': return 'Expira';
            default: return '';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative">
            <div className="relative w-60 h-60">
                <svg width="100%" height="100%" viewBox="0 0 200 180" className="overflow-visible">
                    {/* Base */}
                    <path
                        d="M 20 160 L 100 20 L 180 160 Z"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="4"
                        opacity="0.3"
                    />

                    {/* Active Line - Começa de baixo esquerda e sobe (Inhale) */}
                    <path
                        d="M 20 160 L 100 20 L 180 160 Z"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={totalLength}
                        strokeDashoffset={getDashoffset()}
                        className="transition-all duration-100 ease-linear drop-shadow-glow"
                    />

                    {/* Dots nos vértices */}
                    <circle cx="20" cy="160" r="4" className={phase === 'inhale' ? "fill-[var(--color-primary)] animate-pulse" : "fill-slate-300"} />
                    <circle cx="100" cy="20" r="4" className={phase === 'hold-in' ? "fill-[var(--color-primary)] animate-pulse" : "fill-slate-300"} />
                    <circle cx="180" cy="160" r="4" className={phase === 'exhale' ? "fill-[var(--color-primary)] animate-pulse" : "fill-slate-300"} />
                </svg>

                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xl font-bold text-[var(--color-text)] uppercase tracking-widest">
                        {getLabel()}
                    </span>
                </div>
            </div>
        </div>
    );
}
