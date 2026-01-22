/**
 * RollerCoasterBreathing - Montanha russa estilo gaming
 * Visual imersivo com carrinho animado
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function RollerCoasterBreathing({ persona, onCycleComplete, onPhaseChange }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 2000,
    exhaleTime: 4000,
    holdOutTime: 1000,
    onCycleComplete,
  });

  const pathRef = useRef<SVGPathElement>(null);
  const [dotPos, setDotPos] = useState({ x: 20, y: 160 });
  const lastPhase = useRef(phase);

  const getPhaseProgress = () => {
    if (phase === 'inhale') return progress * 0.4;
    if (phase === 'hold-in') return 0.4 + (progress * 0.1);
    if (phase === 'exhale') return 0.5 + (progress * 0.4);
    return 0.9 + (progress * 0.1);
  };

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const currentLength = getPhaseProgress() * pathLength;
      const point = pathRef.current.getPointAtLength(currentLength);
      setDotPos({ x: point.x, y: point.y });
    }
  }, [phase, progress]);

  // Notify phase changes
  useEffect(() => {
    if (phase !== lastPhase.current) {
      lastPhase.current = phase;
      onPhaseChange?.(phase);
    }
  }, [phase, onPhaseChange]);

  const phaseColors = {
    'inhale': { main: '#22d3ee', glow: 'rgba(34,211,238,0.8)' },
    'hold-in': { main: '#a78bfa', glow: 'rgba(167,139,250,0.8)' },
    'exhale': { main: '#fbbf24', glow: 'rgba(251,191,36,0.8)' },
    'hold-out': { main: '#94a3b8', glow: 'rgba(148,163,184,0.5)' },
  };
  
  const colors = phaseColors[phase];

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="flex flex-col items-center justify-center w-full h-48">
        <svg
          className="w-full max-w-[350px]"
          viewBox="0 0 400 180"
          fill="none"
        >
          {/* Glow filter */}
          <defs>
            <filter id="coasterGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Track background */}
          <path
            d="M 20 160 Q 100 160, 150 80 T 280 80 T 380 160"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Track supports */}
          {[60, 120, 200, 280, 340].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={170}
              x2={x}
              y2={i % 2 === 0 ? 140 : 100}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
          ))}
          
          {/* Main track */}
          <path
            d="M 20 160 Q 100 160, 150 80 T 280 80 T 380 160"
            stroke={colors.main}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#coasterGlow)"
            style={{ opacity: 0.8 }}
          />
          
          {/* Reference path (invisible) */}
          <path
            ref={pathRef}
            d="M 20 160 Q 100 160, 150 80 T 280 80 T 380 160"
            stroke="none"
            fill="none"
          />
          
          {/* Trail particles */}
          {[1, 2, 3, 4].map(i => (
            <motion.circle
              key={i}
              cx={dotPos.x - (i * (phase === 'inhale' ? 8 : phase === 'exhale' ? -8 : 0))}
              cy={dotPos.y}
              r={6 - i}
              fill={colors.main}
              opacity={0.3 - (i * 0.05)}
            />
          ))}
          
          {/* Cart/Dot */}
          <motion.circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="14"
            fill={colors.main}
            filter="url(#coasterGlow)"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          
          {/* Inner dot */}
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="6"
            fill="white"
          />
        </svg>
      </div>
    </GameExerciseWrapper>
  );
}

export default RollerCoasterBreathing;
