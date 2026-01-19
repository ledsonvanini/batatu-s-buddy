/**
 * RollerCoasterBreathing - Exercício de respiração estilo montanha russa
 * Visual refinado com física simulada e partículas
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { cn } from '@/lib/utils';

export function RollerCoasterBreathing({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 2000,
        exhaleTime: 4000,
        holdOutTime: 1000,
        onCycleComplete,
    });

    const pathRef = useRef<SVGPathElement>(null);
    const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

    // Posição baseada na fase
    const getPhaseProgress = () => {
        // Mapeia o progresso total do ciclo (0-1) para o path SVG
        // Inhale (0-0.36) -> Hold (0.36-0.54) -> Exhale (0.54-0.9) -> Wait (0.9-1.0)
        // Simplificando visualização: apenas inhale (sobe) e exhale (desce) para montanha russa
        // Mas precisamos considerar 'hold' como platô

        // Vamos usar uma interpolação simplificada apenas para o movimento visual
        if (phase === 'inhale') return progress * 0.4; // 0 a 40% do path
        if (phase === 'hold-in') return 0.4 + (progress * 0.1); // 40 a 50% (platô)
        if (phase === 'exhale') return 0.5 + (progress * 0.4); // 50 a 90% (descida)
        return 0.9 + (progress * 0.1); // 90 a 100% (final)
    };

    useEffect(() => {
        if (pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            const currentLength = getPhaseProgress() * pathLength;
            const point = pathRef.current.getPointAtLength(currentLength);
            setDotPos({ x: point.x, y: point.y });
        }
    }, [phase, progress]);

    // Cores dinâmicas
    const getColors = () => {
        if (phase === 'inhale') return 'text-[var(--color-primary)] drop-shadow-glow';
        if (phase === 'exhale') return 'text-[var(--color-secondary)]';
        return 'text-slate-400';
    };

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return 'Subindo... (Inspira)';
            case 'hold-in': return 'Segura lá em cima!';
            case 'exhale': return 'Descendo... (Solta)';
            default: return 'Respira...';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative">
            {/* Container do SVG */}
            <svg
                className="w-full h-full max-w-[400px]"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Trilho (Path Background) */}
                <path
                    d="M 20 180 Q 100 180, 150 100 T 280 100 T 380 180"
                    stroke="var(--color-border)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    className="opacity-50"
                />

                {/* Path de Referência (Invisible) */}
                <path
                    ref={pathRef}
                    d="M 20 180 Q 100 180, 150 100 T 280 100 T 380 180"
                    stroke="none"
                    fill="none"
                />

                {/* Carrinho (Circle) */}
                <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r="12"
                    className={cn(
                        "fill-[var(--color-primary)] transition-all duration-75",
                        phase === 'inhale' && "fill-[var(--color-accent)] scale-110",
                        phase === 'exhale' && "fill-[var(--color-secondary)]"
                    )}
                    filter="url(#glow)"
                />

                {/* Efeito de Rastro (Trail) - Simples */}
                {[1, 2, 3].map(i => (
                    <circle
                        key={i}
                        cx={dotPos.x - (i * (phase === 'inhale' ? 2 : -2))}
                        cy={dotPos.y + (i * 1)}
                        r={10 - i * 2}
                        className="fill-[var(--color-primary)] opacity-30"
                    />
                ))}

                {/* Filters */}
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Instrução com animação simples */}
            <div className="absolute top-4 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm border border-black/5 animate-fade-in text-center">
                <span className={cn("text-sm font-bold transition-colors", getColors())}>
                    {getInstruction()}
                </span>
            </div>
        </div>
    );
}
