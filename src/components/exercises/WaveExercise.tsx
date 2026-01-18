import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import type { Persona } from '@/data/phrases';

interface WaveExerciseProps {
  persona: Persona;
  isActive?: boolean;
  onCycleComplete?: () => void;
  className?: string;
}

const waveColors = {
  empolgado: 'from-primary/60 to-primary/20',
  ouvinte: 'from-secondary/60 to-secondary/20',
  conselheiro: 'from-accent/60 to-accent/20',
};

export function WaveExercise({
  persona,
  isActive = true,
  onCycleComplete,
  className,
}: WaveExerciseProps) {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [waveHeight, setWaveHeight] = useState(20);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const runCycle = () => {
      setPhase('inhale');
      setWaveHeight(80);
      
      setTimeout(() => {
        setPhase('exhale');
        setWaveHeight(20);
      }, 4000);

      setTimeout(() => {
        setCycleCount(prev => prev + 1);
        onCycleComplete?.();
      }, 8000);
    };

    runCycle();
    const interval = setInterval(runCycle, 8500);

    return () => clearInterval(interval);
  }, [isActive, onCycleComplete]);

  const phaseLabels = {
    inhale: 'A onda sobe... 🌊',
    exhale: 'A onda desce...',
  };

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      {/* Wave container */}
      <div className="relative w-64 h-48 rounded-3xl bg-card/30 overflow-hidden border border-muted">
        {/* Water waves */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-[4s] ease-in-out',
            waveColors[persona],
          )}
          style={{ height: `${waveHeight}%` }}
        >
          {/* Wave pattern */}
          <svg
            className="absolute -top-4 left-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,60 600,0 900,60 C1200,120 1200,0 1200,0 L1200,120 L0,120 Z"
              className={cn(
                'transition-all duration-1000',
                persona === 'empolgado' && 'fill-primary/40',
                persona === 'ouvinte' && 'fill-secondary/40',
                persona === 'conselheiro' && 'fill-accent/40',
              )}
            />
          </svg>
        </div>

        {/* Cycle counter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            'text-5xl font-bold z-10',
            persona === 'empolgado' && 'text-primary',
            persona === 'ouvinte' && 'text-secondary',
            persona === 'conselheiro' && 'text-accent',
          )}>
            {cycleCount}
          </span>
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

export default WaveExercise;
