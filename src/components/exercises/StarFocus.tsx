/**
 * StarFocus - Desenhar uma estrela respirando
 * Inspira (Traça ponta), Segura (Vértice), Expira (Traça ponta)
 * 5 pontas = 5 ciclos completos ou 1 ciclo = estrela toda?
 * Vamos fazer: 1 ciclo de respiração = contorno completo da estrela (rápido) ou
 * melhor: 1 ciclo respiração = 1 ponta da estrela. 5 respirações completa a estrela.
 */
import { useState, useEffect } from 'react';
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';

export function StarFocus({ persona, onCycleComplete }: BreathingGameProps) {
    // Para completar a estrela em 5 respirações, precisamos de estado local
    const [starProgress, setStarProgress] = useState(0); // 0 a 5

    const { phase, progress } = useBreathing({
        inhaleTime: 3000,
        holdInTime: 1000,
        exhaleTime: 3000,
        holdOutTime: 1000,
        onCycleComplete: () => {
            setStarProgress(p => (p + 1) % 6);
            onCycleComplete?.();
        },
    });

    // Reset star after 5 cycles
    useEffect(() => {
        if (starProgress >= 5) {
            setTimeout(() => setStarProgress(0), 1000);
        }
    }, [starProgress]);

    // Points of a 5-point star
    // Top (100, 0), Right (160, 200), Left (40, 60)... calculados para SVG 200x200
    const points = "100,10 123,80 198,80 138,125 160,198 100,155 40,198 62,125 2,80 77,80";
    // Isso desenha a estrela preenchida. Para traçar o contorno em ordem:
    // Top -> Bottom Right -> Top Left -> Top Right -> Bottom Left -> Top
    // Path data aproximado:
    const pathData = "M100 10 L160 198 L2 80 L198 80 L40 198 Z";

    const totalLength = 1000; // Aproximação do comprimento do path

    // Quantos % da estrela já foram completados + progresso atual
    const getCurrentDashoffset = () => {
        if (starProgress >= 5) return 0; // Full star

        // Cada respiração completa 20% da estrela (1/5)
        // Dentro da respiração:
        // Inhale (0-0.4) -> Traça metade da linha
        // Hold (0.4-0.5) -> Pausa
        // Exhale (0.5-0.9) -> Traça outra metade

        const segmentSize = totalLength / 5;
        const completedSegments = starProgress * segmentSize;

        let currentSegmentProgress = 0;
        if (phase === 'inhale') currentSegmentProgress = progress * 0.5;
        else if (phase === 'hold-in') currentSegmentProgress = 0.5;
        else if (phase === 'exhale') currentSegmentProgress = 0.5 + (progress * 0.5);
        else currentSegmentProgress = 1;

        const currentDraw = completedSegments + (currentSegmentProgress * segmentSize);
        return totalLength - currentDraw;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative">
            <div className="relative w-48 h-48">
                <svg width="100%" height="100%" viewBox="0 0 200 210" className="drop-shadow-glow">
                    {/* Base Track */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="4"
                        opacity="0.2"
                    />

                    {/* Progress Line */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={totalLength}
                        strokeDashoffset={getCurrentDashoffset()}
                        className="transition-all duration-100 ease-linear"
                    />

                    {/* Fill quando completo */}
                    <path
                        d={pathData}
                        fill="var(--color-primary)"
                        opacity={starProgress >= 5 ? 0.5 : 0}
                        className="transition-opacity duration-1000"
                    />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-2xl text-[var(--color-text)]">
                    {starProgress < 5 ? `${starProgress}/5` : '★'}
                </div>
            </div>

            <div className="mt-6 font-medium text-sm text-[var(--color-text-secondary)]">
                Complete a estrela
            </div>
        </div>
    );
}
