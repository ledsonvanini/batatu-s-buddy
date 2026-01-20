/**
 * ExpandingCircle - Exercício de respiração com visual gaming
 * Alto contraste, glow effects, visual imersivo
 */
import { useBreathing } from '@/hooks/useBreathing';
import { useGameSounds } from '@/hooks/useGameSounds';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

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

  // Play sounds on phase change
  useEffect(() => {
    if (phase !== lastPhase.current) {
      if (phase === 'inhale') inhale();
      else if (phase === 'exhale') exhale();
      lastPhase.current = phase;
    }
  }, [phase, inhale, exhale]);

  // Calcula escala baseada na fase
  const getScale = () => {
    if (phase === 'inhale') return 1 + (progress * 0.8);
    if (phase === 'hold-in') return 1.8;
    if (phase === 'exhale') return 1.8 - (progress * 0.8);
    return 1;
  };

  const instruction = () => {
    switch (phase) {
      case 'inhale': return 'INSPIRE';
      case 'hold-in': return 'SEGURE';
      case 'exhale': return 'SOLTE';
      default: return 'PREPARE';
    }
  };

  const getGradient = () => {
    if (phase === 'inhale') return 'from-cyan-400 via-blue-500 to-purple-600';
    if (phase === 'hold-in') return 'from-purple-500 via-pink-500 to-orange-500';
    if (phase === 'exhale') return 'from-orange-400 via-amber-500 to-yellow-400';
    return 'from-slate-400 to-slate-600';
  };

  const scale = getScale();

  return (
    <div className="relative w-full h-[320px] flex flex-col items-center justify-center bg-slate-900 rounded-3xl overflow-hidden">
      {/* Background pulse */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${
            phase === 'inhale' ? 'rgba(56, 189, 248, 0.3)' :
            phase === 'exhale' ? 'rgba(251, 191, 36, 0.3)' :
            'rgba(168, 85, 247, 0.3)'
          } 0%, transparent 70%)`,
          transform: `scale(${scale * 1.5})`,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Outer ring glow */}
      <motion.div
        className={`absolute w-40 h-40 rounded-full bg-gradient-to-br ${getGradient()} blur-2xl opacity-40`}
        animate={{ scale: scale * 1.3 }}
        transition={{ duration: 0.1 }}
      />

      {/* Main circle */}
      <motion.div
        className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${getGradient()} shadow-2xl flex items-center justify-center`}
        animate={{ scale }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        style={{
          boxShadow: `
            0 0 60px ${phase === 'inhale' ? 'rgba(56, 189, 248, 0.6)' :
            phase === 'exhale' ? 'rgba(251, 191, 36, 0.5)' :
            'rgba(168, 85, 247, 0.5)'},
            inset 0 2px 20px rgba(255,255,255,0.3)
          `
        }}
      >
        {/* Inner circle */}
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <span className="text-white font-gaming font-bold text-lg tracking-wider">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Instruction label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        >
          <span className="font-gaming font-bold text-white tracking-widest text-sm">
            {instruction()}
          </span>
        </motion.div>
      </div>

      {/* Phase indicator dots */}
      <div className="absolute top-6 flex gap-3">
        {['inhale', 'hold-in', 'exhale', 'hold-out'].map((p, i) => (
          <div
            key={p}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              phase === p 
                ? 'bg-white scale-150 shadow-lg shadow-white/50' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
