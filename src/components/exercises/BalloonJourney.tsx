/**
 * BalloonJourney - Balão subindo e descendo entre nuvens
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { Cloud, Wind } from 'lucide-react';

export function BalloonJourney({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 1000,
        exhaleTime: 4000,
        holdOutTime: 1000,
        onCycleComplete,
    });

    // Calcula altura do balão (em %)
    const getHeight = () => {
        if (phase === 'inhale') return 20 + (progress * 60); // 20% -> 80%
        if (phase === 'hold-in') return 80 + (Math.sin(Date.now() / 200) * 2); // Leve flutuação
        if (phase === 'exhale') return 80 - (progress * 60); // 80% -> 20%
        return 20;
    };

    const balloonColor = phase === 'inhale' || phase === 'hold-in'
        ? 'text-[var(--color-primary)]'
        : 'text-[var(--color-secondary)]';

    return (
        <div className="w-full h-[300px] relative overflow-hidden bg-gradient-to-b from-sky-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-black/5 shadow-inner">

            {/* Nuvens Fundo (Parallax Lento) */}
            <div className="absolute top-10 left-10 text-white/40 animate-pulse">
                <Cloud size={64} fill="currentColor" />
            </div>
            <div className="absolute top-20 right-20 text-white/30">
                <Cloud size={48} fill="currentColor" />
            </div>

            {/* Balão */}
            <div
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300 ease-out"
                style={{ bottom: `${getHeight()}%` }}
            >
                {/* Balão Graphic */}
                <div className={`relative transition-colors duration-500 ${balloonColor} filter drop-shadow-lg`}>
                    <svg width="60" height="70" viewBox="0 0 60 70" fill="currentColor">
                        <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" />
                        <path d="M26 60L24 70H36L34 60H26Z" /> {/* Cesta simples */}
                    </svg>
                    {/* Brilho */}
                    <div className="absolute top-2 left-3 w-3 h-3 bg-white/30 rounded-full" />
                </div>

                {/* Vento (Particle trail) na subida */}
                {phase === 'inhale' && (
                    <div className="absolute -bottom-8 animate-slide-up opacity-50 text-slate-400">
                        <Wind size={20} />
                    </div>
                )}
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-sm font-bold bg-white/80 dark:bg-slate-900/80 px-4 py-1.5 rounded-full backdrop-blur-sm text-[var(--color-text-secondary)]">
                    {phase === 'inhale' ? 'Subindo...' : phase === 'exhale' ? 'Descendo...' : 'Flutuando...'}
                </span>
            </div>
        </div>
    );
}
