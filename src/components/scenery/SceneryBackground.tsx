/**
 * SceneryBackground - Backgrounds SVG imersivos por contexto
 * Camadas parallax para efeito de profundidade
 */
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import type { Contexto } from '@/types';

type SceneryType = 'mountains' | 'night' | 'beach' | 'forest' | 'neutral';

interface SceneryBackgroundProps {
    scenery?: SceneryType;
    contexto?: Contexto;
    children?: ReactNode;
    className?: string;
}

// Mapear contexto para cenário
const contextoToScenery: Record<Contexto, SceneryType> = {
    dia_tenso: 'mountains',
    entrevista: 'mountains',
    sem_sono: 'night',
    crush: 'beach',
    familia: 'forest',
    neutro: 'neutral',
};

export function SceneryBackground({
    scenery,
    contexto,
    children,
    className
}: SceneryBackgroundProps) {
    const activeScenery = scenery || (contexto ? contextoToScenery[contexto] : 'neutral');

    return (
        <div className={cn('relative min-h-screen', className)}>
            {/* Background layers */}
            <div className="scenery-base">
                <SceneryLayer scenery={activeScenery} />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

function SceneryLayer({ scenery }: { scenery: SceneryType }) {
    switch (scenery) {
        case 'mountains':
            return <MountainsScenery />;
        case 'night':
            return <NightScenery />;
        case 'beach':
            return <BeachScenery />;
        case 'forest':
            return <ForestScenery />;
        default:
            return <NeutralScenery />;
    }
}

// =====================
// MOUNTAINS - Tensão
// =====================
function MountainsScenery() {
    return (
        <>
            {/* Sky gradient */}
            <div
                className="scenery-layer"
                style={{
                    background: 'linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 40%, #a5b4fc 100%)',
                }}
            />
            <div className="dark:block hidden scenery-layer" style={{
                background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 40%, #3730a3 100%)',
            }} />

            {/* Clouds */}
            <svg className="scenery-layer opacity-40" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <ellipse cx="150" cy="100" rx="80" ry="30" fill="white" opacity="0.6" />
                <ellipse cx="600" cy="80" rx="100" ry="35" fill="white" opacity="0.5" />
                <ellipse cx="400" cy="150" rx="60" ry="25" fill="white" opacity="0.4" />
            </svg>

            {/* Mountains - back layer */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <linearGradient id="mountain-back" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,600 L0,400 L100,300 L200,380 L350,220 L500,350 L650,200 L800,320 L800,600 Z"
                    fill="url(#mountain-back)"
                />
            </svg>

            {/* Mountains - front layer */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <linearGradient id="mountain-front" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.7" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,600 L0,450 L150,350 L300,450 L450,300 L600,400 L750,320 L800,380 L800,600 Z"
                    fill="url(#mountain-front)"
                />
            </svg>
        </>
    );
}

// =====================
// NIGHT - Sono
// =====================
function NightScenery() {
    const stars = Array.from({ length: 50 }, (_, i) => ({
        cx: Math.random() * 800,
        cy: Math.random() * 400,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 3,
    }));

    return (
        <>
            {/* Night sky */}
            <div
                className="scenery-layer"
                style={{
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 30%, #312e81 70%, #4338ca 100%)',
                }}
            />

            {/* Stars */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                {stars.map((star, i) => (
                    <circle
                        key={i}
                        cx={star.cx}
                        cy={star.cy}
                        r={star.r}
                        fill="white"
                        opacity={star.opacity}
                        style={{
                            animation: `twinkle 3s ease-in-out ${star.delay}s infinite`,
                        }}
                    />
                ))}

                {/* Moon */}
                <circle cx="650" cy="100" r="40" fill="#fef3c7" />
                <circle cx="660" cy="95" r="35" fill="#0f172a" />
            </svg>

            {/* Gentle hills */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <path
                    d="M0,600 L0,480 Q200,420 400,480 Q600,540 800,450 L800,600 Z"
                    fill="#1e1b4b"
                    opacity="0.8"
                />
            </svg>
        </>
    );
}

// =====================
// BEACH - Calma
// =====================
function BeachScenery() {
    return (
        <>
            {/* Sky */}
            <div
                className="scenery-layer"
                style={{
                    background: 'linear-gradient(180deg, #fef3c7 0%, #fcd34d 20%, #f97316 50%, #ea580c 100%)',
                }}
            />
            <div className="dark:block hidden scenery-layer" style={{
                background: 'linear-gradient(180deg, #78350f 0%, #92400e 30%, #f97316 70%, #fb923c 100%)',
            }} />

            {/* Sun */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fcd34d" stopOpacity="1" />
                        <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="400" cy="250" r="120" fill="url(#sun-glow)" />
                <circle cx="400" cy="250" r="50" fill="#fef3c7" />
            </svg>

            {/* Ocean */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,600 L0,400 Q200,380 400,420 Q600,460 800,400 L800,600 Z"
                    fill="url(#ocean)"
                />
                {/* Wave lines */}
                <path d="M0,420 Q100,400 200,420 Q300,440 400,420 Q500,400 600,420 Q700,440 800,420"
                    fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <path d="M0,450 Q100,430 200,450 Q300,470 400,450 Q500,430 600,450 Q700,470 800,450"
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </svg>

            {/* Beach/sand */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <path
                    d="M0,600 L0,520 Q400,480 800,520 L800,600 Z"
                    fill="#fcd34d"
                    opacity="0.6"
                />
            </svg>
        </>
    );
}

// =====================
// FOREST - Foco
// =====================
function ForestScenery() {
    return (
        <>
            {/* Sky */}
            <div
                className="scenery-layer"
                style={{
                    background: 'linear-gradient(180deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
                }}
            />
            <div className="dark:block hidden scenery-layer" style={{
                background: 'linear-gradient(180deg, #022c22 0%, #064e3b 50%, #065f46 100%)',
            }} />

            {/* Sun rays */}
            <svg className="scenery-layer opacity-30" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <linearGradient id="ray" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points="300,0 350,400 250,400" fill="url(#ray)" />
                <polygon points="450,0 520,400 380,400" fill="url(#ray)" />
                <polygon points="600,0 680,400 520,400" fill="url(#ray)" />
            </svg>

            {/* Trees - back */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <path d="M50,600 L50,400 L80,350 L50,360 L80,300 L50,310 L70,250 L30,250 L50,310 L20,300 L50,360 L20,350 L50,400 Z"
                    fill="#059669" opacity="0.4" />
                <path d="M200,600 L200,350 L240,280 L200,300 L250,220 L200,240 L230,160 L170,160 L200,240 L150,220 L200,300 L160,280 L200,350 Z"
                    fill="#059669" opacity="0.5" />
                <path d="M650,600 L650,380 L690,320 L650,340 L700,270 L650,290 L680,220 L620,220 L650,290 L600,270 L650,340 L610,320 L650,380 Z"
                    fill="#059669" opacity="0.4" />
                <path d="M750,600 L750,420 L780,370 L750,385 L785,320 L750,340 L775,280 L725,280 L750,340 L715,320 L750,385 L720,370 L750,420 Z"
                    fill="#059669" opacity="0.3" />
            </svg>

            {/* Ground */}
            <svg className="scenery-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice">
                <ellipse cx="400" cy="650" rx="500" ry="120" fill="#10b981" opacity="0.3" />
            </svg>
        </>
    );
}

// =====================
// NEUTRAL - Default
// =====================
function NeutralScenery() {
    return (
        <>
            <div
                className="scenery-layer"
                style={{
                    background: 'linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 100%)',
                }}
            />
        </>
    );
}

// Add to CSS
const twinkleKeyframes = `
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
`;
