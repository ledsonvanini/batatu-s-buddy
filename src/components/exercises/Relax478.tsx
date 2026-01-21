/**
 * Relax478 - Exercício 4-7-8 estilo gaming
 * Visual com timer grande e anéis pulsantes
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function Relax478({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 7000,
    exhaleTime: 8000,
    holdOutTime: 0,
    onCycleComplete,
  });

  const getTimer = () => {
    const total = phase === 'inhale' ? 4 : phase === 'hold-in' ? 7 : 8;
    return Math.ceil(total - (progress * total));
  };

  const phaseColors = {
    'inhale': { main: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    'hold-in': { main: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
    'exhale': { main: '#fbbf24', glow: 'rgba(251,191,36,0.5)' },
    'hold-out': { main: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  };
  
  const colors = phaseColors[phase];
  const phaseLabels = {
    'inhale': 'INSPIRA',
    'hold-in': 'SEGURA',
    'exhale': 'SOLTA',
    'hold-out': 'PAUSA',
  };

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="relative flex flex-col items-center justify-center w-full h-56">
        
        {/* Pulsing rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border-2"
            style={{
              width: `${80 + ring * 40}px`,
              height: `${80 + ring * 40}px`,
              borderColor: colors.main,
              opacity: 0.2,
            }}
            animate={{
              scale: phase === 'inhale' 
                ? 1 + (progress * 0.2)
                : phase === 'exhale'
                ? 1.2 - (progress * 0.2)
                : 1.2,
              opacity: 0.1 + (ring * 0.05),
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
        
        {/* Central timer */}
        <motion.div
          className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.main}, ${colors.main}80)`,
            boxShadow: `0 0 40px ${colors.glow}`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {/* Timer number */}
          <span 
            className="text-5xl font-black text-white"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {getTimer()}
          </span>
          
          {/* Phase label */}
          <span className="text-xs font-bold uppercase tracking-widest text-white/80 mt-1">
            {phaseLabels[phase]}
          </span>
        </motion.div>
        
        {/* Phase indicators - 4-7-8 */}
        <div className="absolute bottom-4 flex gap-4 items-end">
          {[
            { label: '4', active: phase === 'inhale', desc: 'Inspira' },
            { label: '7', active: phase === 'hold-in', desc: 'Segura' },
            { label: '8', active: phase === 'exhale', desc: 'Solta' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                style={{
                  backgroundColor: item.active ? colors.main : 'rgba(255,255,255,0.1)',
                  color: item.active ? 'white' : 'rgba(255,255,255,0.5)',
                  boxShadow: item.active ? `0 0 20px ${colors.glow}` : 'none',
                }}
                animate={{ scale: item.active ? 1.1 : 1 }}
              >
                {item.label}
              </motion.div>
              <span className="text-[10px] text-white/50 mt-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </GameExerciseWrapper>
  );
}

export default Relax478;
