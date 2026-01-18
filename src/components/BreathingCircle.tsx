import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import type { Persona } from '@/data/phrases';

interface BreathingCircleProps {
  persona: Persona;
  isActive?: boolean;
  onCycleComplete?: () => void;
  className?: string;
}

const breathingConfig = {
  empolgado: { inhale: 3, hold: 2, exhale: 4, total: 9000 },
  ouvinte: { inhale: 4, hold: 0, exhale: 4, total: 8000 },
  conselheiro: { inhale: 4, hold: 2, exhale: 4, total: 10000 },
};

type Phase = 'inhale' | 'hold' | 'exhale';

export function BreathingCircle({
  persona,
  isActive = true,
  onCycleComplete,
  className,
}: BreathingCircleProps) {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const config = breathingConfig[persona];

  const phaseLabels = {
    inhale: 'Inspira...',
    hold: 'Segura...',
    exhale: 'Solta...',
  };

  useEffect(() => {
    if (!isActive) return;

    const runCycle = () => {
      setPhase('inhale');
      
      setTimeout(() => {
        if (config.hold > 0) {
          setPhase('hold');
          setTimeout(() => {
            setPhase('exhale');
          }, config.hold * 1000);
        } else {
          setPhase('exhale');
        }
      }, config.inhale * 1000);

      setTimeout(() => {
        setCycleCount(prev => prev + 1);
        onCycleComplete?.();
      }, config.total);
    };

    runCycle();
    const interval = setInterval(runCycle, config.total);

    return () => clearInterval(interval);
  }, [isActive, config, onCycleComplete]);

  const scale = phase === 'inhale' || phase === 'hold' ? 1 : 0.7;
  const transitionDuration = 
    phase === 'inhale' ? config.inhale :
    phase === 'hold' ? config.hold :
    config.exhale;

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className="relative">
        {/* Outer glow */}
        <div
          className={cn(
            'absolute inset-0 rounded-full blur-3xl opacity-30 transition-transform',
            persona === 'empolgado' && 'bg-primary',
            persona === 'ouvinte' && 'bg-secondary',
            persona === 'conselheiro' && 'bg-accent',
          )}
          style={{
            transform: `scale(${scale * 1.2})`,
            transition: `transform ${transitionDuration}s ease-in-out`,
          }}
        />
        
        {/* Main breathing circle */}
        <div
          className={cn(
            'relative w-48 h-48 rounded-full flex items-center justify-center',
            'bg-gradient-to-br shadow-lg',
            persona === 'empolgado' && 'from-primary to-primary/80',
            persona === 'ouvinte' && 'from-secondary to-secondary/80',
            persona === 'conselheiro' && 'from-accent to-accent/80',
          )}
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${transitionDuration}s ease-in-out`,
          }}
        >
          {/* Inner circle */}
          <div
            className={cn(
              'w-32 h-32 rounded-full flex items-center justify-center',
              'bg-gradient-to-br',
              persona === 'empolgado' && 'from-primary/40 to-primary/20',
              persona === 'ouvinte' && 'from-secondary/40 to-secondary/20',
              persona === 'conselheiro' && 'from-accent/40 to-accent/20',
            )}
          >
            <span className="text-white/90 text-4xl font-bold">
              {cycleCount}
            </span>
          </div>
        </div>
      </div>

      {/* Phase label */}
      <p className={cn(
        'text-xl font-semibold animate-fade-in',
        persona === 'empolgado' && 'text-primary',
        persona === 'ouvinte' && 'text-secondary',
        persona === 'conselheiro' && 'text-accent',
      )}>
        {phaseLabels[phase]}
      </p>
    </div>
  );
}

export default BreathingCircle;
