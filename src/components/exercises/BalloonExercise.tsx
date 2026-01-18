import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import type { Persona } from '@/data/phrases';

interface BalloonExerciseProps {
  persona: Persona;
  isActive?: boolean;
  onCycleComplete?: () => void;
  className?: string;
}

const breathingConfig = {
  empolgado: { inhale: 3, exhale: 4, total: 7000 },
  ouvinte: { inhale: 4, exhale: 4, total: 8000 },
  conselheiro: { inhale: 4, exhale: 5, total: 9000 },
};

type Phase = 'inhale' | 'exhale';

const balloonColors = {
  empolgado: 'from-primary to-orange-400',
  ouvinte: 'from-secondary to-blue-400',
  conselheiro: 'from-accent to-emerald-400',
};

export function BalloonExercise({
  persona,
  isActive = true,
  onCycleComplete,
  className,
}: BalloonExerciseProps) {
  const [phase, setPhase] = useState<Phase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const config = breathingConfig[persona];

  const phaseLabels = {
    inhale: 'Enche o balão! 🎈',
    exhale: 'Solta o ar...',
  };

  useEffect(() => {
    if (!isActive) return;

    const runCycle = () => {
      setPhase('inhale');
      
      setTimeout(() => {
        setPhase('exhale');
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

  const scale = phase === 'inhale' ? 1.3 : 0.7;
  const transitionDuration = phase === 'inhale' ? config.inhale : config.exhale;

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className="relative">
        {/* Balloon */}
        <div
          className={cn(
            'relative w-40 h-52 flex items-center justify-center transition-transform',
          )}
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${transitionDuration}s ease-in-out`,
          }}
        >
          {/* Balloon body */}
          <div
            className={cn(
              'w-full h-40 rounded-full bg-gradient-to-br shadow-lg',
              balloonColors[persona],
            )}
          >
            {/* Shine effect */}
            <div className="absolute top-4 left-6 w-8 h-8 bg-white/30 rounded-full blur-sm" />
            
            {/* Cycle counter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl font-bold drop-shadow-lg">
                {cycleCount}
              </span>
            </div>
          </div>
          
          {/* Balloon knot */}
          <div
            className={cn(
              'absolute -bottom-2 left-1/2 -translate-x-1/2',
              'w-4 h-4 rounded-b-full bg-gradient-to-br',
              balloonColors[persona],
            )}
          />
          
          {/* String */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-muted-foreground/30" />
        </div>
      </div>

      {/* Phase label */}
      <p className={cn(
        'text-xl font-semibold animate-fade-in mt-6',
        persona === 'empolgado' && 'text-primary',
        persona === 'ouvinte' && 'text-secondary',
        persona === 'conselheiro' && 'text-accent',
      )}>
        {phaseLabels[phase]}
      </p>
    </div>
  );
}

export default BalloonExercise;
