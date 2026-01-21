/**
 * BoxBreathing - Respiração quadrada estilo gaming neon
 * Quadrado que desenha progressivamente com glow
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function BoxBreathing({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 4000,
    exhaleTime: 4000,
    holdOutTime: 4000,
    onCycleComplete,
  });

  const size = 180;
  const strokeWidth = 6;
  const perimeter = size * 4;
  
  // Calcular quanto do quadrado está desenhado
  const getStrokeDashoffset = () => {
    let totalProgress = 0;
    switch (phase) {
      case 'inhale': totalProgress = progress * 0.25; break;
      case 'hold-in': totalProgress = 0.25 + progress * 0.25; break;
      case 'exhale': totalProgress = 0.5 + progress * 0.25; break;
      case 'hold-out': totalProgress = 0.75 + progress * 0.25; break;
    }
    return perimeter * (1 - totalProgress);
  };

  // Posição do dot que percorre o quadrado
  const getDotPosition = () => {
    let t = 0;
    switch (phase) {
      case 'inhale': t = progress * 0.25; break;
      case 'hold-in': t = 0.25 + progress * 0.25; break;
      case 'exhale': t = 0.5 + progress * 0.25; break;
      case 'hold-out': t = 0.75 + progress * 0.25; break;
    }
    
    const p = t * 4;
    const half = size / 2;
    
    if (p < 1) return { x: -half + size * p, y: -half }; // Top
    if (p < 2) return { x: half, y: -half + size * (p - 1) }; // Right
    if (p < 3) return { x: half - size * (p - 2), y: half }; // Bottom
    return { x: -half, y: half - size * (p - 3) }; // Left
  };

  const dotPos = getDotPosition();
  
  const phaseColors = {
    'inhale': '#22d3ee',
    'hold-in': '#a78bfa',
    'exhale': '#fbbf24',
    'hold-out': '#94a3b8',
  };
  
  const color = phaseColors[phase];

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="relative flex items-center justify-center">
        <svg 
          width={size + 60} 
          height={size + 60} 
          viewBox={`${-size/2 - 30} ${-size/2 - 30} ${size + 60} ${size + 60}`}
        >
          {/* Glow filter */}
          <defs>
            <filter id="boxGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Background square */}
          <rect
            x={-size/2}
            y={-size/2}
            width={size}
            height={size}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            rx={12}
          />
          
          {/* Progress square */}
          <motion.rect
            x={-size/2}
            y={-size/2}
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={perimeter}
            strokeDashoffset={getStrokeDashoffset()}
            rx={12}
            filter="url(#boxGlow)"
            style={{ transition: 'stroke 0.3s' }}
          />
          
          {/* Corner markers */}
          {[
            { x: -size/2, y: -size/2 },
            { x: size/2, y: -size/2 },
            { x: size/2, y: size/2 },
            { x: -size/2, y: size/2 },
          ].map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={6}
              fill="rgba(255,255,255,0.2)"
              stroke={color}
              strokeWidth={2}
            />
          ))}
          
          {/* Moving dot */}
          <motion.circle
            cx={dotPos.x}
            cy={dotPos.y}
            r={12}
            fill={color}
            filter="url(#boxGlow)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          
          {/* Inner dot */}
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
            r={5}
            fill="white"
          />
        </svg>
        
        {/* Center timer */}
        <div className="absolute flex flex-col items-center">
          <span 
            className="text-4xl font-black"
            style={{ color, textShadow: `0 0 20px ${color}` }}
          >
            {Math.ceil(4 - progress * 4)}
          </span>
        </div>
      </div>
    </GameExerciseWrapper>
  );
}

export default BoxBreathing;
