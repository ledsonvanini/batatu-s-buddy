/**
 * OceanWave - Onda do mar que sobe e desce
 * Minimalista e relaxante
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { cn } from '@/lib/utils';

export function OceanWave({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 5000, // Ondas são lentas
        holdInTime: 2000,
        exhaleTime: 6000,
        holdOutTime: 1000,
        onCycleComplete,
    });

    // Altura da onda (0 a 100%)
    const waveHeight = () => {
        if (phase === 'inhale') return progress * 60; // Sobe até 60%
        if (phase === 'hold-in') return 60 + (Math.sin(Date.now() / 300) * 2); // Flutua
        if (phase === 'exhale') return 60 - (progress * 60); // Desce
        return 0; // Mar calmo
    };

    return (
        <div className="w-full h-[300px] relative overflow-hidden rounded-3xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-inner">
            {/* Céu / Sol */}
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-amber-200/50 shadow-[0_0_30px_rgba(251,191,36,0.4)]" />

            {/* Onda Container */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-[#0ea5e9] transition-all duration-300 ease-linear"
                style={{
                    height: `${20 + waveHeight()}%`,
                    opacity: 0.8
                }}
            >
                {/* Crista da onda SVG animada */}
                <div className="absolute -top-6 left-0 right-0 w-[200%] h-8 animate-wave-slow flex">
                    {/* Repetir SVG wave para loop infinito */}
                    <svg className="w-1/2 h-full text-[#0ea5e9] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" transform="translate(0, -10)"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" transform="translate(0, -5)"></path>
                    </svg>
                    <svg className="w-1/2 h-full text-[#0ea5e9] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" transform="translate(0, -10)"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" transform="translate(0, -5)"></path>
                    </svg>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center z-10 text-white font-bold drop-shadow-md">
                {phase === 'inhale' ? 'A onda vem...' : phase === 'exhale' ? 'A onda vai...' : '...'}
            </div>
        </div>
    );
}
