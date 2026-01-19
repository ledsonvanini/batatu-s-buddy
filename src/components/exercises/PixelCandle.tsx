/**
 * PixelCandle - Chama de vela em pixel art que cresce e diminui
 * Estética retro-game
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';

export function PixelCandle({ persona, onCycleComplete }: BreathingGameProps) {
    const { phase, progress } = useBreathing({
        inhaleTime: 3000,
        holdInTime: 1000,
        exhaleTime: 4000, // Expirar lentamente na vela
        holdOutTime: 1000,
        onCycleComplete,
    });

    // Calculate flame size
    const getFlameScale = () => {
        if (phase === 'inhale') return 1 + (progress * 0.5); // Cresce
        if (phase === 'hold-in') return 1.5;
        if (phase === 'exhale') return 1.5 - (progress * 0.8); // Diminui bastante
        return 0.7; // Quase apagando
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px] relative bg-slate-900 rounded-3xl border border-slate-700 shadow-inner">

            {/* Container da Vela */}
            <div className="relative mt-20">
                {/* Chama (Pixel Art Style com box-shadows ou divs) */}
                <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-8 h-8 bg-orange-500 transition-transform duration-100 ease-linear origin-bottom"
                    style={{
                        transform: `translateX(-50%) scale(${getFlameScale()})`,
                        boxShadow: `
              0 0 20px 5px rgba(249, 115, 22, 0.6),
              inset 0 0 10px rgba(255, 255, 0, 0.8)
            `,
                        borderRadius: '50% 50% 30% 30% / 80% 80% 20% 20%'
                    }}
                >
                    {/* Inner core */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-5 bg-yellow-200 rounded-full opacity-80" />
                </div>

                {/* Pavio */}
                <div className="w-1 h-3 bg-slate-800 mx-auto -mt-1" />

                {/* Corpo da Vela */}
                <div className="w-16 h-24 bg-slate-200 rounded-sm mx-auto shadow-md flex justify-center">
                    {/* Cera escorrendo */}
                    <div className="w-2 h-8 bg-slate-300 rounded-b-full ml-4 absolute top-3" />
                </div>
            </div>

            <div className="mt-8 text-slate-400 font-pixel text-xs tracking-widest uppercase">
                {phase === 'exhale' ? 'Sopre devagar...' : 'Respire...'}
            </div>
        </div>
    );
}
