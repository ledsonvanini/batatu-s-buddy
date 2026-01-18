import { cn } from '@/lib/utils';
import { School, Mic, Moon, Heart, Home, HelpCircle } from 'lucide-react';
import type { Contexto } from '@/data/phrases';
import { CONTEXTOS_INFO } from '@/data/phrases';

interface MoodCardProps {
  contexto: Contexto;
  onClick: (contexto: Contexto) => void;
  selected?: boolean;
  className?: string;
}

const iconMap = {
  school: School,
  presentation: Mic,
  moon: Moon,
  heart: Heart,
  home: Home,
  help: HelpCircle,
};

export function MoodCard({ contexto, onClick, selected, className }: MoodCardProps) {
  const info = CONTEXTOS_INFO[contexto];
  const Icon = iconMap[info.icon as keyof typeof iconMap];

  return (
    <button
      onClick={() => onClick(contexto)}
      className={cn(
        'mood-card group text-left w-full',
        selected && 'ring-2 ring-primary border-primary/30 bg-primary/5',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center',
          'bg-gradient-to-br from-primary/20 to-primary/5',
          'group-hover:from-primary/30 group-hover:to-primary/10 transition-colors'
        )}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">{info.emoji}</span>
            <h3 className="font-bold text-foreground text-base truncate">
              {info.label}
            </h3>
          </div>
        </div>
      </div>
    </button>
  );
}

export default MoodCard;
