/**
 * StarFocus - Estrela de 5 pontas estilo gaming
 * 5 respirações = estrela completa
 */
import { useState, useEffect } from 'react';
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function StarFocus({ persona, onCycleComplete }: BreathingGameProps) {
  const [starProgress, setStarProgress] = useState(0);

  const { phase, progress } = useBreathing({
    inhaleTime: 3000,
    holdInTime: 1000,
    exhaleTime: 3000,
    holdOutTime: 1000,
    onCycleComplete: () => {
      setStarProgress(p => (p + 1) % 6);
      onCycleComplete?.();
    },
  });

  useEffect(() => {
    if (starProgress >= 5) {
      setTimeout(() => setStarProgress(0), 1500);
    }
  }, [starProgress]);

  const pathData = "M100 10 L160 198 L2 80 L198 80 L40 198 Z";
  const totalLength = 1000;

  const getCurrentDashoffset = () => {
    if (starProgress >= 5) return 0;

    const segmentSize = totalLength / 5;
    const completedSegments = starProgress * segmentSize;

    let currentSegmentProgress = 0;
    if (phase === 'inhale') currentSegmentProgress = progress * 0.5;
    else if (phase === 'hold-in') currentSegmentProgress = 0.5;
    else if (phase === 'exhale') currentSegmentProgress = 0.5 + (progress * 0.5);
    else currentSegmentProgress = 1;

    const currentDraw = completedSegments + (currentSegmentProgress * segmentSize);
    return totalLength - currentDraw;
  };

  const phaseColors = {
    'inhale': { main: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    'hold-in': { main: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
    'exhale': { main: '#fbbf24', glow: 'rgba(251,191,36,0.5)' },
    'hold-out': { main: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  };
  
  const colors = phaseColors[phase];

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="flex flex-col items-center justify-center w-full h-56">
        <div className="relative w-44 h-44">
          <svg width="100%" height="100%" viewBox="0 0 200 210">
            {/* Glow filter */}
            <defs>
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Base track */}
            <path
              d={pathData}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
            />

            {/* Progress line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={colors.main}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLength}
              strokeDashoffset={getCurrentDashoffset()}
              filter="url(#starGlow)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />

            {/* Fill when complete */}
            <motion.path
              d={pathData}
              fill={colors.main}
              initial={{ opacity: 0 }}
              animate={{ opacity: starProgress >= 5 ? 0.4 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Center counter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            {starProgress < 5 ? (
              <div className="flex flex-col items-center">
                <span 
                  className="text-3xl font-black"
                  style={{ color: colors.main, textShadow: `0 0 15px ${colors.glow}` }}
                >
                  {starProgress}/5
                </span>
              </div>
            ) : (
              <motion.span 
                className="text-5xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                ⭐
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </GameExerciseWrapper>
  );
}

export default StarFocus;
