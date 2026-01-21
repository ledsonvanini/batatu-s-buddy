/**
 * BalloonJourney - Balão subindo estilo gaming
 * Visual imersivo com céu dinâmico
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function BalloonJourney({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 1000,
    exhaleTime: 4000,
    holdOutTime: 1000,
    onCycleComplete,
  });

  // Altura do balão (em %)
  const getHeight = () => {
    switch (phase) {
      case 'inhale': return 20 + (progress * 60);
      case 'hold-in': return 80 + (Math.sin(Date.now() / 200) * 2);
      case 'exhale': return 80 - (progress * 60);
      case 'hold-out': return 20;
      default: return 20;
    }
  };

  const phaseColors = {
    'inhale': { balloon: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    'hold-in': { balloon: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
    'exhale': { balloon: '#fbbf24', glow: 'rgba(251,191,36,0.5)' },
    'hold-out': { balloon: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  };
  
  const colors = phaseColors[phase];
  const height = getHeight();

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="relative w-full h-56 overflow-hidden">
        {/* Clouds */}
        {[
          { x: '10%', y: '20%', size: 60, opacity: 0.3 },
          { x: '70%', y: '15%', size: 80, opacity: 0.4 },
          { x: '40%', y: '60%', size: 50, opacity: 0.2 },
          { x: '85%', y: '50%', size: 40, opacity: 0.25 },
        ].map((cloud, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 blur-md"
            style={{
              left: cloud.x,
              top: cloud.y,
              width: cloud.size,
              height: cloud.size * 0.5,
              opacity: cloud.opacity,
            }}
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity }}
          />
        ))}
        
        {/* Balloon */}
        <motion.div
          className="absolute left-1/2 flex flex-col items-center"
          style={{ bottom: `${height}%` }}
          animate={{ x: '-50%' }}
        >
          {/* Balloon body */}
          <motion.svg 
            width="60" 
            height="75" 
            viewBox="0 0 60 75"
            style={{ filter: `drop-shadow(0 0 15px ${colors.glow})` }}
          >
            {/* Main balloon */}
            <ellipse 
              cx="30" 
              cy="28" 
              rx="26" 
              ry="28" 
              fill={colors.balloon}
            />
            {/* Highlight */}
            <ellipse 
              cx="20" 
              cy="18" 
              rx="8" 
              ry="10" 
              fill="rgba(255,255,255,0.4)"
            />
            {/* Knot */}
            <path 
              d="M26 56 L30 62 L34 56 L30 58 Z" 
              fill={colors.balloon}
            />
            {/* String */}
            <path 
              d="M30 62 Q32 68 28 74" 
              stroke="rgba(255,255,255,0.5)" 
              strokeWidth="2" 
              fill="none"
            />
          </motion.svg>
          
          {/* Wind trails on ascent */}
          {phase === 'inhale' && [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -bottom-4 w-1 h-6 rounded-full bg-white/20"
              style={{ left: `${40 + i * 10}%` }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, 20, 40],
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
        
        {/* Ground indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent" />
      </div>
    </GameExerciseWrapper>
  );
}

export default BalloonJourney;
