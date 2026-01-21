/**
 * OceanWave - Onda do mar estilo gaming relaxante
 * Visual imersivo com gradientes e partículas
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function OceanWave({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 2000,
    exhaleTime: 5000,
    holdOutTime: 1000,
    onCycleComplete,
  });

  // Altura da onda baseada na fase
  const getWaveHeight = () => {
    switch (phase) {
      case 'inhale': return 30 + progress * 50; // 30% -> 80%
      case 'hold-in': return 80 + Math.sin(Date.now() / 300) * 3; // Leve flutuação
      case 'exhale': return 80 - progress * 50; // 80% -> 30%
      case 'hold-out': return 30;
      default: return 30;
    }
  };

  const waveHeight = getWaveHeight();
  
  // Cores da água
  const waterColors = {
    'inhale': { top: '#22d3ee', bottom: '#0891b2' },
    'hold-in': { top: '#a78bfa', bottom: '#7c3aed' },
    'exhale': { top: '#fbbf24', bottom: '#d97706' },
    'hold-out': { top: '#94a3b8', bottom: '#64748b' },
  };
  
  const colors = waterColors[phase];

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="relative w-full h-64 overflow-hidden rounded-2xl">
        {/* Sky gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(15,23,42,0.8) 0%, 
              rgba(30,41,59,0.6) 50%, 
              ${colors.top}30 100%
            )`,
          }}
        />
        
        {/* Moon/Sun */}
        <motion.div
          className="absolute top-8 right-12 w-12 h-12 rounded-full"
          style={{
            background: phase === 'exhale' 
              ? 'radial-gradient(circle, #fef3c7 0%, #fbbf24 100%)'
              : 'radial-gradient(circle, #e2e8f0 0%, #94a3b8 100%)',
            boxShadow: phase === 'exhale'
              ? '0 0 40px rgba(251,191,36,0.5)'
              : '0 0 30px rgba(148,163,184,0.3)',
          }}
          animate={{ y: phase === 'inhale' ? [0, -5, 0] : 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Stars (visible except exhale) */}
        {phase !== 'exhale' && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${10 + (i % 3) * 15}%`,
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
        
        {/* Water container */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-300"
          style={{ height: `${waveHeight}%` }}
        >
          {/* Wave gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${colors.top} 0%, ${colors.bottom} 100%)`,
            }}
          />
          
          {/* Wave crest SVG */}
          <svg 
            className="absolute -top-6 left-0 w-[200%] h-8"
            viewBox="0 0 1200 32"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,16 Q150,0 300,16 T600,16 T900,16 T1200,16 V32 H0 Z"
              fill={colors.top}
              animate={{ x: [-600, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          
          {/* Bubbles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{ left: `${20 + i * 15}%` }}
              initial={{ bottom: '10%', opacity: 0 }}
              animate={{ 
                bottom: '90%', 
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
              }}
            />
          ))}
          
          {/* Foam line */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-white/40 blur-sm"
          />
        </div>
        
        {/* Reflection shimmer */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/2 h-1/3 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </GameExerciseWrapper>
  );
}

export default OceanWave;
