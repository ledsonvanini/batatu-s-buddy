/**
 * BoxBreathing - Exercício de respiração quadrada
 * Visual: Um quadrado de neon que se desenha progressivamente
 * Fases: Inspira (Topo), Segura (Direita), Expira (Baixo), Segura (Esquerda)
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { cn } from '@/lib/utils';

export function BoxBreathing({ persona, onCycleComplete }: BreathingGameProps) {
    // Box breathing padrão: 4-4-4-4
    const { phase, progress } = useBreathing({
        inhaleTime: 4000,
        holdInTime: 4000,
        exhaleTime: 4000,
        holdOutTime: 4000,
        onCycleComplete,
    });

    const getSize = () => 200; // Tamanho do quadrado
    const strokeWidth = 6;
    const perimeter = getSize() * 4;

    // Calcula quanto do quadrado desenhar
    const getStrokeDashoffset = () => {
        // Total perimeter is 800
        // Inhale (Top): 0 -> 200 drawn
        // Hold (Right): 200 -> 400 drawn
        // Exhale (Bottom): 400 -> 600 drawn
        // Hold (Left): 600 -> 800 drawn

        const sideParams = {
            'inhale': 0,
            'hold-in': 1,
            'exhale': 2,
            'hold-out': 3,
        };

        const sideIndex = sideParams[phase || 'inhale'];
        const currentSideProgress = progress * getSize();
        const totalDrawn = (sideIndex * getSize()) + currentSideProgress;

        return perimeter - totalDrawn;
    };

    const getDotPosition = () => {
        const s = getSize();
        const p = progress * s;
        // Coordenadas baseadas na fase (Topo -> Direita -> Baixo -> Esquerda)
        switch (phase) {
            case 'inhale': return { x: p, y: 0 };
            case 'hold-in': return { x: s, y: p };
            case 'exhale': return { x: s - p, y: s };
            case 'hold-out': return { x: 0, y: s - p };
            default: return { x: 0, y: 0 };
        }
    };

    const dot = getDotPosition();

    return (
        <div className="flex flex-col items-center justify-center w-full h-[320px] relative">
            <div className="relative" style={{ width: getSize(), height: getSize() }}>
                {/* SVG Container */}
                <svg
                    width={getSize()}
                    height={getSize()}
                    className="overflow-visible transform -rotate-90 origin-center" // Começa do topo esquerda? Não, svg rect começa topo esquerda. Rotate corrige direção?
                // Box breathing usually starts Top-Left go Top-Right (Inhale), Right-Down (Hold), Down-Left (Exhale), Left-Up (Hold)
                // Default rect path: M 0 0 H 200 V 200 H 0 Z 
                >
                    {/* Track (Fundo fraco) */}
                    <rect
                        x="0" y="0"
                        width={getSize()} height={getSize()}
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth={strokeWidth}
                        rx="12"
                        className="opacity-30"
                    />

                    {/* Progress Line */}
                    <rect
                        x="0" y="0"
                        width={getSize()} height={getSize()}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth={strokeWidth}
                        rx="12"
                        strokeLinecap="round"
                        strokeDasharray={perimeter}
                        strokeDashoffset={getStrokeDashoffset()}
                        className="transition-[stroke-dashoffset] duration-100 ease-linear drop-shadow-glow"
                    />
                </svg>

                {/* Dot Seguindo o caminho (sem rotate no container para não bugar coordenadas) */}
                {/* Precisamos ajustar as coordenadas do dot pois o SVG do rect desenha clockwise starting top-left */}
                <div
                    className="absolute w-4 h-4 bg-white rounded-full shadow-md border-2 border-[var(--color-primary)] transition-all duration-75 z-10"
                    style={{
                        left: dot.x - 8,
                        top: dot.y - 8,
                        boxShadow: '0 0 10px var(--color-primary)'
                    }}
                />

                {/* Labels Centrais */}
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">
                        {Math.ceil(4 - (progress * 4))}s
                    </span>
                    <span className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-medium">
                        {phase?.replace('-', ' ')}
                    </span>
                </div>
            </div>
        </div>
    );
}
