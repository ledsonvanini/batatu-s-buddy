import { cn } from '@/lib/utils';
import type { Persona } from '@/data/phrases';
import { PERSONAS_INFO } from '@/data/phrases';

interface PersonaSelectorProps {
  selected: Persona;
  onSelect: (persona: Persona) => void;
  className?: string;
}

export function PersonaSelector({ selected, onSelect, className }: PersonaSelectorProps) {
  return (
    <div className={cn('grid gap-4', className)}>
      {(Object.keys(PERSONAS_INFO) as Persona[]).map((persona) => {
        const info = PERSONAS_INFO[persona];
        const isSelected = selected === persona;
        
        return (
          <button
            key={persona}
            onClick={() => onSelect(persona)}
            className={cn(
              'relative p-5 rounded-2xl border-2 text-left transition-all duration-300',
              'hover:scale-[1.02] active:scale-[0.98]',
              isSelected
                ? persona === 'empolgado'
                  ? 'border-primary bg-primary/10 shadow-glow-orange'
                  : persona === 'ouvinte'
                  ? 'border-secondary bg-secondary/10 shadow-glow-blue'
                  : 'border-accent bg-accent/10 shadow-glow-green'
                : 'border-border bg-card hover:border-muted-foreground/30'
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{info.emoji}</span>
              <div>
                <h3 className={cn(
                  'font-bold text-lg',
                  isSelected
                    ? persona === 'empolgado'
                      ? 'text-primary'
                      : persona === 'ouvinte'
                      ? 'text-secondary'
                      : 'text-accent'
                    : 'text-foreground'
                )}>
                  {info.nome}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {info.descricao}
                </p>
              </div>
            </div>
            
            {isSelected && (
              <div className="absolute top-3 right-3">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm',
                  persona === 'empolgado' && 'bg-primary',
                  persona === 'ouvinte' && 'bg-secondary',
                  persona === 'conselheiro' && 'bg-accent',
                )}>
                  ✓
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default PersonaSelector;
