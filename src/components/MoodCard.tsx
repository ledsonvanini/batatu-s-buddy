/**
 * MoodCard - Card gaming para seleção de mood
 */
import { cn } from '@/lib/utils';
import { CloudRain, Mic, Moon, Heart, Users, Sparkles, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { Contexto } from '@/data/phrases';
import { CONTEXTOS_INFO } from '@/data/phrases';

interface MoodCardProps {
  contexto: Contexto;
  onClick: (contexto: Contexto) => void;
  selected?: boolean;
  className?: string;
}

// Mapeamento de contexto para visual gaming
const contextoTheme: Record<Contexto, {
  Icon: LucideIcon;
  gradient: string;
  iconColor: string;
  glowColor: string;
}> = {
  dia_tenso: {
    Icon: CloudRain,
    gradient: 'from-indigo-500 to-purple-600',
    iconColor: 'text-indigo-400',
    glowColor: 'shadow-indigo-500/30',
  },
  entrevista: {
    Icon: Mic,
    gradient: 'from-violet-500 to-fuchsia-600',
    iconColor: 'text-violet-400',
    glowColor: 'shadow-violet-500/30',
  },
  sem_sono: {
    Icon: Moon,
    gradient: 'from-slate-500 to-slate-700',
    iconColor: 'text-slate-300',
    glowColor: 'shadow-slate-500/30',
  },
  crush: {
    Icon: Heart,
    gradient: 'from-rose-500 to-pink-600',
    iconColor: 'text-rose-400',
    glowColor: 'shadow-rose-500/30',
  },
  familia: {
    Icon: Users,
    gradient: 'from-emerald-500 to-teal-600',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/30',
  },
  neutro: {
    Icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600',
    iconColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/30',
  },
};

export function MoodCard({ contexto, onClick, selected, className }: MoodCardProps) {
  const info = CONTEXTOS_INFO[contexto];
  const theme = contextoTheme[contexto];
  const Icon = theme.Icon;

  return (
    <motion.button
      onClick={() => onClick(contexto)}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'mood-card group relative',
        selected && 'ring-2 ring-offset-2',
        className
      )}
      style={{
        ['--tw-ring-color' as string]: selected ? 'var(--primary)' : 'transparent',
      }}
    >
      {/* Glow effect on hover */}
      <div 
        className={cn(
          'absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10',
          `bg-gradient-to-br ${theme.gradient}`
        )}
      />

      {/* Icon container */}
      <div className={cn(
        'w-14 h-14 rounded-2xl flex items-center justify-center mb-3',
        'bg-gradient-to-br transition-transform group-hover:scale-110',
        theme.gradient,
        'shadow-lg',
        theme.glowColor
      )}>
        <Icon className="w-7 h-7 text-white drop-shadow-md" />
      </div>

      {/* Label */}
      <span className="font-bold text-sm leading-tight text-center" style={{ color: 'var(--text)' }}>
        {info.label}
      </span>
    </motion.button>
  );
}

export default MoodCard;
