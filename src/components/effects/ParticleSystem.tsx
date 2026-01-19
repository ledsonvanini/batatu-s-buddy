/**
 * ParticleSystem - Sistema de partículas para fundos imersivos
 * Tipos: fireflies, snow, bubbles, stars, light
 */
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type ParticleType = 'fireflies' | 'snow' | 'bubbles' | 'stars' | 'light';

interface ParticleSystemProps {
    type: ParticleType;
    density?: 'low' | 'medium' | 'high';
    className?: string;
}

const particleConfigs: Record<ParticleType, { count: number; color: string; size: string; animation: string }> = {
    fireflies: { count: 20, color: '#fcd34d', size: '4px', animation: 'float-glow 6s ease-in-out infinite' },
    snow: { count: 50, color: '#ffffff', size: '3px', animation: 'fall 8s linear infinite' },
    bubbles: { count: 25, color: '#93c5fd', size: '8px', animation: 'rise 10s ease-in-out infinite' },
    stars: { count: 40, color: '#ffffff', size: '2px', animation: 'twinkle 3s ease-in-out infinite' },
    light: { count: 15, color: '#fbbf24', size: '6px', animation: 'pulse-glow 4s ease-in-out infinite' },
};

const densityMultiplier = { low: 0.5, medium: 1, high: 1.5 };

export function ParticleSystem({ type, density = 'medium', className }: ParticleSystemProps) {
    const config = particleConfigs[type];
    const count = Math.floor(config.count * densityMultiplier[density]);

    return (
        <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
            {Array.from({ length: count }).map((_, i) => (
                <Particle
                    key={i}
                    type={type}
                    config={config}
                    index={i}
                />
            ))}
        </div>
    );
}

function Particle({
    type,
    config,
    index,
}: {
    type: ParticleType;
    config: typeof particleConfigs.fireflies;
    index: number;
}) {
    const style = {
        left: `${Math.random() * 100}%`,
        top: type === 'bubbles' ? '100%' : type === 'snow' ? '-5%' : `${Math.random() * 100}%`,
        width: config.size,
        height: config.size,
        backgroundColor: config.color,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
        opacity: 0.4 + Math.random() * 0.6,
    };

    return (
        <div
            className={cn(
                'absolute rounded-full',
                type === 'fireflies' && 'shadow-[0_0_8px_2px_#fcd34d]',
                type === 'bubbles' && 'border border-blue-300/50',
                type === 'light' && 'shadow-[0_0_12px_4px_#fbbf24]',
            )}
            style={style}
        />
    );
}

// CSS para animações (adicionar ao index.css)
export const particleStyles = `
@keyframes float-glow {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
  25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
  50% { transform: translateY(-10px) translateX(-5px); opacity: 0.6; }
  75% { transform: translateY(-30px) translateX(15px); opacity: 1; }
}

@keyframes fall {
  0% { transform: translateY(-10px) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
}

@keyframes rise {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; box-shadow: 0 0 8px 2px currentColor; }
  50% { opacity: 0.8; box-shadow: 0 0 20px 8px currentColor; }
}
`;
