/**
 * PhaseBackground - Fundos por fase/cenário
 */
import { cn } from '@/lib/utils';
import { ParticleSystem } from './ParticleSystem';
import type { ReactNode } from 'react';

export type PhaseType = 'forest' | 'ocean' | 'mountain' | 'sunset' | 'night';

interface PhaseBackgroundProps {
    phase: PhaseType;
    children?: ReactNode;
    className?: string;
}

const phaseConfigs: Record<PhaseType, {
    gradient: string;
    particles: Parameters<typeof ParticleSystem>[0]['type'];
    darkGradient: string;
}> = {
    forest: {
        gradient: 'from-emerald-100 via-green-50 to-emerald-100',
        darkGradient: 'from-emerald-950 via-green-900 to-emerald-950',
        particles: 'fireflies',
    },
    ocean: {
        gradient: 'from-cyan-100 via-blue-50 to-sky-100',
        darkGradient: 'from-cyan-950 via-blue-900 to-sky-950',
        particles: 'bubbles',
    },
    mountain: {
        gradient: 'from-slate-100 via-blue-50 to-indigo-100',
        darkGradient: 'from-slate-900 via-blue-950 to-indigo-950',
        particles: 'snow',
    },
    sunset: {
        gradient: 'from-orange-100 via-amber-50 to-yellow-100',
        darkGradient: 'from-orange-950 via-amber-900 to-yellow-950',
        particles: 'light',
    },
    night: {
        gradient: 'from-indigo-200 via-purple-100 to-violet-200',
        darkGradient: 'from-indigo-950 via-purple-900 to-violet-950',
        particles: 'stars',
    },
};

export function PhaseBackground({ phase, children, className }: PhaseBackgroundProps) {
    const config = phaseConfigs[phase];

    return (
        <div
            className={cn(
                'relative min-h-screen bg-gradient-to-b transition-colors duration-1000',
                config.gradient,
                'dark:' + config.darkGradient.split(' ').join(' dark:'),
                className
            )}
        >
            {/* SVG decorativo de fundo */}
            <PhaseDecoration phase={phase} />

            {/* Sistema de partículas */}
            <ParticleSystem type={config.particles} density="medium" />

            {/* Conteúdo */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

function PhaseDecoration({ phase }: { phase: PhaseType }) {
    switch (phase) {
        case 'forest':
            return (
                <svg
                    className="absolute bottom-0 left-0 right-0 h-32 text-emerald-200/50 dark:text-emerald-800/30"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 C150,0 350,120 600,60 C850,0 1050,120 1200,60 L1200,120 L0,120 Z"
                        fill="currentColor"
                    />
                </svg>
            );
        case 'ocean':
            return (
                <svg
                    className="absolute bottom-0 left-0 right-0 h-24 text-blue-300/40 dark:text-blue-800/30"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z"
                        fill="currentColor"
                    >
                        <animate attributeName="d"
                            values="M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z;
                      M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z;
                      M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z"
                            dur="8s" repeatCount="indefinite"
                        />
                    </path>
                </svg>
            );
        case 'mountain':
            return (
                <svg
                    className="absolute bottom-0 left-0 right-0 h-40 text-slate-300/40 dark:text-slate-800/30"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path d="M0,120 L200,40 L400,80 L600,20 L800,60 L1000,30 L1200,70 L1200,120 Z" fill="currentColor" />
                </svg>
            );
        default:
            return null;
    }
}
