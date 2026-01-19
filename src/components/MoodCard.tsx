/**
 * MoodCard - Card compacto sem classes hardcoded de cor
 * Usa variáveis CSS globais para tema
 */
import { cn } from '@/lib/utils';
import { CloudRain, Mic, Moon, Heart, Users, Sparkles, type LucideIcon } from 'lucide-react';
import type { Contexto } from '@/data/phrases';
import { CONTEXTOS_INFO } from '@/data/phrases';

interface MoodCardProps {
  contexto: Contexto;
  onClick: (contexto: Contexto) => void;
  selected?: boolean;
  className?: string;
}

// Mapeamento de contexto para visual (apenas cores de ícone/bg do ícone)
const contextoTheme: Record<Contexto, {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}> = {
  dia_tenso: {
    Icon: CloudRain,
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
  },
  entrevista: {
    Icon: Mic,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-300',
  },
  sem_sono: {
    Icon: Moon,
    iconBg: 'bg-slate-100 dark:bg-slate-800/50',
    iconColor: 'text-slate-600 dark:text-slate-300',
  },
  crush: {
    Icon: Heart,
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-300',
  },
  familia: {
    Icon: Users,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
  },
  neutro: {
    Icon: Sparkles,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
};

export function MoodCard({ contexto, onClick, selected, className }: MoodCardProps) {
  const info = CONTEXTOS_INFO[contexto];
  const theme = contextoTheme[contexto];
  const Icon = theme.Icon;

  return (
    <button
      onClick={() => onClick(contexto)}
      className={cn(
        'mood-card group', // CSS class controla layout e cores base
        selected && 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]',
        className
      )}
    >
      {/* Icon + Label */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Icon box */}
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
          theme.iconBg
        )}>
          <Icon className={cn('w-7 h-7', theme.iconColor)} />
        </div>

        {/* Label only, no emoji */}
        <span className="font-semibold text-sm text-[var(--color-text)] leading-tight">
          {info.label}
        </span>
      </div>
    </button>
  );
}

export default MoodCard;
