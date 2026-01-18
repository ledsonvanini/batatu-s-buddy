import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import type { Persona } from '@/data/phrases';

interface BubblesExerciseProps {
  persona: Persona;
  isActive?: boolean;
  onCycleComplete?: () => void;
  className?: string;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const bubbleColors = {
  empolgado: 'bg-primary/40',
  ouvinte: 'bg-secondary/40',
  conselheiro: 'bg-accent/40',
};

export function BubblesExercise({
  persona,
  isActive = true,
  onCycleComplete,
  className,
}: BubblesExerciseProps) {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const generateBubbles = useCallback(() => {
    const newBubbles: Bubble[] = [];
    const count = 6 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 60 + Math.random() * 30,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 0.5,
      });
    }
    
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const runCycle = () => {
      setPhase('inhale');
      generateBubbles();
      
      setTimeout(() => {
        setPhase('exhale');
      }, 4000);

      setTimeout(() => {
        setCycleCount(prev => prev + 1);
        onCycleComplete?.();
        setBubbles([]);
      }, 8000);
    };

    runCycle();
    const interval = setInterval(runCycle, 8500);

    return () => clearInterval(interval);
  }, [isActive, onCycleComplete, generateBubbles]);

  const phaseLabels = {
    inhale: 'Inspira... cria bolhas 🫧',
    exhale: 'Solta... solta as bolhas...',
  };

  return (
    <div className={cn('flex flex-col items-center gap-6 relative', className)}>
      {/* Bubble container */}
      <div className="relative w-64 h-64 rounded-full bg-card/50 border-2 border-dashed border-muted overflow-hidden">
        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={cn(
              'absolute rounded-full transition-all duration-[3s] ease-out',
              bubbleColors[persona],
              phase === 'exhale' && 'opacity-0 -translate-y-32'
            )}
            style={{
              left: `${bubble.x}%`,
              top: phase === 'inhale' ? `${bubble.y}%` : '-20%',
              width: bubble.size,
              height: bubble.size,
              transitionDelay: `${bubble.delay}s`,
            }}
          >
            {/* Bubble shine */}
            <div className="absolute top-1 left-2 w-2 h-2 bg-white/60 rounded-full" />
          </div>
        ))}

        {/* Center count */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            'text-5xl font-bold',
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

export default BubblesExercise;
