/**
 * FlowerBloom - Flor geométrica estilo gaming
 * Mandala que abre e fecha com glow
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

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
    if (phase === 'hold-in') return 45 + (progress * 5);
    if (phase === 'exhale') return 50 - (progress * 45);
    return 5;
  };

  const getBloom = () => {
    if (phase === 'inhale') return progress;
    if (phase === 'hold-in') return 1;
    if (phase === 'exhale') return 1 - progress;
    return 0;
  };

  const phaseColors = {
    'inhale': { petal: '#22d3ee', center: '#fbbf24', glow: 'rgba(34,211,238,0.4)' },
    'hold-in': { petal: '#a78bfa', center: '#f472b6', glow: 'rgba(167,139,250,0.4)' },
    'exhale': { petal: '#fbbf24', center: '#fb923c', glow: 'rgba(251,191,36,0.4)' },
    'hold-out': { petal: '#94a3b8', center: '#64748b', glow: 'rgba(148,163,184,0.2)' },
  };
  
  const colors = phaseColors[phase];
  const petals = [0, 60, 120, 180, 240, 300];
  const scale = getBloom();

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="flex flex-col items-center justify-center w-full h-56 relative">
        <motion.div
          className="relative w-40 h-40"
          animate={{ rotate: getRotation() }}
          transition={{ duration: 0.1 }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: colors.glow }}
            animate={{ scale: 0.8 + scale * 0.4 }}
          />
          
          {/* Petals */}
          {petals.map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 origin-bottom"
              style={{
                width: '24px',
                height: '60px',
                borderRadius: '50% 50% 30% 30%',
                background: `linear-gradient(180deg, ${colors.petal} 0%, ${colors.petal}80 100%)`,
                boxShadow: `0 0 15px ${colors.glow}`,
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
              animate={{ 
                scaleY: 0.2 + (scale * 0.8),
                opacity: 0.5 + (scale * 0.5),
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
          
          {/* Inner petals (smaller layer) */}
          {petals.map((angle) => (
            <motion.div
              key={`inner-${angle}`}
              className="absolute top-1/2 left-1/2 origin-bottom"
              style={{
                width: '16px',
                height: '40px',
                borderRadius: '50% 50% 30% 30%',
                background: `linear-gradient(180deg, white 0%, ${colors.petal}60 100%)`,
                transform: `translate(-50%, -100%) rotate(${angle + 30}deg)`,
                opacity: 0.6,
              }}
              animate={{ scaleY: 0.3 + (scale * 0.7) }}
              transition={{ duration: 0.1 }}
            />
          ))}

          {/* Center */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full z-10"
            style={{
              background: `radial-gradient(circle at 30% 30%, white, ${colors.center})`,
              boxShadow: `0 0 20px ${colors.glow}`,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </GameExerciseWrapper>
  );
}

export default FlowerBloom;
