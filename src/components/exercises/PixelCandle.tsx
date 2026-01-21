/**
 * PixelCandle - Chama de vela estilo gaming
 * Visual com glow dinâmico
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function PixelCandle({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 3000,
    holdInTime: 1000,
    exhaleTime: 4000,
    holdOutTime: 1000,
    onCycleComplete,
  });

  const getFlameScale = () => {
    switch (phase) {
      case 'inhale': return 1 + (progress * 0.5);
      case 'hold-in': return 1.5;
      case 'exhale': return 1.5 - (progress * 0.8);
      case 'hold-out': return 0.7;
      default: return 1;
    }
  };

  const phaseColors = {
    'inhale': { flame: '#22d3ee', inner: '#a5f3fc', glow: 'rgba(34,211,238,0.6)' },
    'hold-in': { flame: '#a78bfa', inner: '#ddd6fe', glow: 'rgba(167,139,250,0.6)' },
    'exhale': { flame: '#fbbf24', inner: '#fef3c7', glow: 'rgba(251,191,36,0.8)' },
    'hold-out': { flame: '#94a3b8', inner: '#e2e8f0', glow: 'rgba(148,163,184,0.3)' },
  };
  
  const colors = phaseColors[phase];
  const flameScale = getFlameScale();

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="flex flex-col items-center justify-center w-full h-56">
        
        {/* Candle container */}
        <div className="relative">
          {/* Flame */}
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-12 origin-bottom"
            style={{
              background: `radial-gradient(ellipse at 50% 80%, ${colors.inner} 0%, ${colors.flame} 50%, transparent 100%)`,
              borderRadius: '50% 50% 40% 40% / 80% 80% 40% 40%',
              boxShadow: `0 0 ${30 + flameScale * 20}px ${colors.glow}`,
            }}
            animate={{ 
              scale: flameScale,
              x: ['-50%', '-48%', '-52%', '-50%'],
            }}
            transition={{ 
              scale: { duration: 0.1 },
              x: { duration: 0.3, repeat: Infinity },
            }}
          >
            {/* Inner flame */}
            <div 
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 rounded-full"
              style={{ 
                background: `linear-gradient(180deg, ${colors.inner} 0%, ${colors.flame} 100%)`,
              }}
            />
          </motion.div>
          
          {/* Wick */}
          <div className="w-1 h-4 bg-slate-600 mx-auto -mt-4 rounded-t" />
          
          {/* Candle body */}
          <div 
            className="w-16 h-24 rounded-lg mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
              boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            {/* Wax drips */}
            <motion.div
              className="absolute -top-1 left-2 w-3 h-6 rounded-b-full bg-white/60"
              animate={{ height: [24, 28, 24] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-1 right-3 w-2 h-4 rounded-b-full bg-white/50"
              animate={{ height: [16, 20, 16] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
        
        {/* Instruction */}
        <div className="mt-6 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
          <span className="text-sm font-medium text-white/80">
            {phase === 'exhale' ? 'Sopre devagar...' : 'Respire...'}
          </span>
        </div>
      </div>
    </GameExerciseWrapper>
  );
}

export default PixelCandle;
