/**
 * FlowerBloom - Flor geométrica que abre e fecha
 * Estética mandala
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';

export function FlowerBloom({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 2000,
        exhaleTime: 4000,
        holdOutTime: 1000,
        onCycleComplete,
    });

    const getRotation = () => {
        if (phase === 'inhale') return progress * 45;
        if (phase === 'hold-in') return 45 + (progress * 5); // slow rotate
        if (phase === 'exhale') return 50 - (progress * 45);
        return 5;
    };

    const getBloom = () => {
        if (phase === 'inhale') return progress;
        if (phase === 'hold-in') return 1;
        if (phase === 'exhale') return 1 - progress;
        return 0;
    };

    const petals = [0, 60, 120, 180, 240, 300];
    const scale = getBloom(); // 0 closed, 1 open

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative">
            <div
                className="relative w-40 h-40 transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${getRotation()}deg)` }}
            >
                {/* Pétalas */}
                {petals.map((angle) => (
                    <div
                        key={angle}
                        className="absolute top-1/2 left-1/2 w-16 h-24 origin-bottom rounded-[100%_0%_100%_0%_/_50%_0%_50%_0%] bg-pink-300/60 dark:bg-pink-500/40 border border-pink-400 dark:border-pink-300 mix-blend-multiply dark:mix-blend-screen transition-all duration-100"
                        style={{
                            transform: `translate(-50%, -100%) rotate(${angle}deg) scaleY(${0.2 + (scale * 0.8)})`,
                            opacity: 0.5 + (scale * 0.5)
                        }}
                    />
                ))}

                {/* Centro */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-300 rounded-full shadow-md z-10" />
            </div>
        </div>
    );
}
