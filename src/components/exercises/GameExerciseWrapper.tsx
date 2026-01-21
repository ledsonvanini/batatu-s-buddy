/**
 * GameExerciseWrapper - Container imersivo para exercícios de respiração
 * Alto contraste, glow dinâmico, visual de jogo
 */
import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PhaseType = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

interface GameExerciseWrapperProps {
  children: ReactNode;
  phase?: PhaseType;
  progress?: number;
  className?: string;
}

const phaseColors = {
  'inhale': {
    bg: 'from-cyan-900 via-blue-900 to-indigo-900',
    glow: 'shadow-[0_0_60px_rgba(34,211,238,0.4)]',
    border: 'border-cyan-400/30',
    accent: '#22d3ee',
  },
  'hold-in': {
    bg: 'from-purple-900 via-violet-900 to-indigo-900',
    glow: 'shadow-[0_0_60px_rgba(167,139,250,0.4)]',
    border: 'border-violet-400/30',
    accent: '#a78bfa',
  },
  'exhale': {
    bg: 'from-orange-900 via-amber-900 to-yellow-900',
    glow: 'shadow-[0_0_60px_rgba(251,191,36,0.4)]',
    border: 'border-amber-400/30',
    accent: '#fbbf24',
  },
  'hold-out': {
    bg: 'from-slate-800 via-slate-900 to-slate-800',
    glow: 'shadow-[0_0_40px_rgba(148,163,184,0.2)]',
    border: 'border-slate-500/30',
    accent: '#94a3b8',
  },
};

const phaseLabels: Record<PhaseType, string> = {
  'inhale': 'Inspira...',
  'hold-in': 'Segura...',
  'exhale': 'Solta...',
  'hold-out': 'Pausa...',
};

export function GameExerciseWrapper({
  children,
  phase = 'inhale',
  progress = 0,
  className,
}: GameExerciseWrapperProps) {
  const colors = phaseColors[phase];
  
  return (
    <motion.div
      className={cn(
        'relative rounded-3xl overflow-hidden min-h-[320px] w-full',
        'bg-gradient-to-br transition-all duration-500',
        colors.bg,
        colors.glow,
        'border-2',
        colors.border,
        className
      )}
      animate={{
        boxShadow: phase === 'inhale' 
          ? `0 0 ${40 + progress * 40}px rgba(34,211,238,${0.3 + progress * 0.3})`
          : phase === 'exhale'
          ? `0 0 ${80 - progress * 40}px rgba(251,191,36,${0.6 - progress * 0.3})`
          : undefined
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: 100 + '%',
              opacity: 0 
            }}
            animate={{ 
              y: -20 + '%',
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      {/* Inner glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 70%)`,
        }}
      />
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      
      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
        <div className="flex items-center justify-center gap-3">
          {/* Phase indicator dot */}
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.accent }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Phase label */}
          <span className="text-white/90 font-bold text-sm uppercase tracking-widest">
            {phaseLabels[phase]}
          </span>
          
          {/* Progress bar */}
          <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: colors.accent }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-[320px]">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/20 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-16 left-4 w-6 h-6 border-l-2 border-b-2 border-white/20 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-16 right-4 w-6 h-6 border-r-2 border-b-2 border-white/20 rounded-br-xl pointer-events-none" />
    </motion.div>
  );
}

export default GameExerciseWrapper;
