/**
 * ExpandingCircle - Exercício de respiração estilo gaming premium
 * Alto contraste, glow dinâmico, partículas
 */
import { useBreathing } from '@/hooks/useBreathing';
import { useGameSounds } from '@/hooks/useGameSounds';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function ExpandingCircle({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 2000,
    exhaleTime: 4000,
    holdOutTime: 1000,
    onCycleComplete,
  });

  const { inhale, exhale } = useGameSounds();
  const lastPhase = useRef(phase);

  useEffect(() => {
    if (phase !== lastPhase.current) {
      if (phase === 'inhale') inhale();
      else if (phase === 'exhale') exhale();
      lastPhase.current = phase;
    }
  }, [phase, inhale, exhale]);

  const getScale = () => {
    switch (phase) {
      case 'inhale': return 0.5 + progress * 0.5;
      case 'hold-in': return 1.0;
      case 'exhale': return 1.0 - progress * 0.5;
      case 'hold-out': return 0.5;
      default: return 0.5;
    }
  };

  const scale = getScale();
  
  const phaseColors = {
    'inhale': { main: '#22d3ee', glow: 'rgba(34,211,238,0.6)', ring: '#06b6d4' },
    'hold-in': { main: '#a78bfa', glow: 'rgba(167,139,250,0.6)', ring: '#8b5cf6' },
    'exhale': { main: '#fbbf24', glow: 'rgba(251,191,36,0.6)', ring: '#f59e0b' },
    'hold-out': { main: '#94a3b8', glow: 'rgba(148,163,184,0.4)', ring: '#64748b' },
  };
  
  const colors = phaseColors[phase];

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="relative flex items-center justify-center w-full h-56">
        
        {/* Outer rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border-2"
            style={{
              width: `${100 + ring * 50}px`,
              height: `${100 + ring * 50}px`,
              borderColor: colors.ring,
              opacity: 0.15 + (ring * 0.05),
            }}
            animate={{
              scale: scale * (1 + ring * 0.05),
              opacity: phase === 'inhale' ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
        
        {/* Main circle */}
        <motion.div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: '140px',
            height: '140px',
            background: `radial-gradient(circle at 30% 30%, ${colors.main}, ${colors.ring})`,
            boxShadow: `
              0 0 ${20 + scale * 40}px ${colors.glow},
              inset 0 0 30px rgba(255,255,255,0.2)
            `,
          }}
          animate={{ 
            scale,
            rotate: phase === 'hold-in' ? [0, 5, 0, -5, 0] : 0,
          }}
          transition={{ 
            duration: phase === 'hold-in' ? 2 : 0.3,
            repeat: phase === 'hold-in' ? Infinity : 0,
          }}
        >
          {/* Inner shine */}
          <div className="absolute top-3 left-4 w-8 h-8 rounded-full bg-white/30 blur-sm" />
          
          {/* Progress text */}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-2xl">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </motion.div>
        
        {/* Floating particles on inhale */}
        {phase === 'inhale' && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: colors.main,
              boxShadow: `0 0 8px ${colors.glow}`,
            }}
            initial={{ 
              x: (Math.random() - 0.5) * 200,
              y: 100,
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              x: (Math.random() - 0.5) * 50,
              y: 0,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </GameExerciseWrapper>
  );
}

export default ExpandingCircle;
