/**
 * TriangleBalance - Triângulo equilátero estilo gaming
 * Respiração triangular 4-4-4
 */
import { useBreathing } from '@/hooks/useBreathing';
import type { BreathingGameProps } from '@/types/games';
import { motion } from 'motion/react';
import { GameExerciseWrapper } from './GameExerciseWrapper';

export function TriangleBalance({ persona, onCycleComplete }: BreathingGameProps) {
  const { phase, progress } = useBreathing({
    inhaleTime: 4000,
    holdInTime: 4000,
    exhaleTime: 4000,
    holdOutTime: 0,
    onCycleComplete,
  });

  const totalLength = 500;

  const getDashoffset = () => {
    let totalProgress = 0;
    if (phase === 'inhale') totalProgress = progress * 0.333;
    else if (phase === 'hold-in') totalProgress = 0.333 + (progress * 0.333);
    else if (phase === 'exhale') totalProgress = 0.666 + (progress * 0.333);
    return totalLength - (totalProgress * totalLength);
  };

  // Get dot position along the triangle
  const getDotPosition = () => {
    let t = 0;
    if (phase === 'inhale') t = progress * 0.333;
    else if (phase === 'hold-in') t = 0.333 + (progress * 0.333);
    else if (phase === 'exhale') t = 0.666 + (progress * 0.333);
    
    // Triangle vertices: BL(20,160), Top(100,20), BR(180,160)
    const p = t * 3;
    if (p < 1) {
      // BL to Top
      return { x: 20 + (100 - 20) * p, y: 160 + (20 - 160) * p };
    } else if (p < 2) {
      // Top to BR
      const pp = p - 1;
      return { x: 100 + (180 - 100) * pp, y: 20 + (160 - 20) * pp };
    } else {
      // BR to BL
      const pp = p - 2;
      return { x: 180 + (20 - 180) * pp, y: 160 };
    }
  };

  const phaseColors = {
    'inhale': { main: '#22d3ee', glow: 'rgba(34,211,238,0.6)' },
    'hold-in': { main: '#a78bfa', glow: 'rgba(167,139,250,0.6)' },
    'exhale': { main: '#fbbf24', glow: 'rgba(251,191,36,0.6)' },
    'hold-out': { main: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  };
  
  const colors = phaseColors[phase];
  const dotPos = getDotPosition();
  
  const phaseLabels = {
    'inhale': 'INSPIRA',
    'hold-in': 'SEGURA',
    'exhale': 'EXPIRA',
    'hold-out': 'PAUSA',
  };

  return (
    <GameExerciseWrapper phase={phase} progress={progress}>
      <div className="flex flex-col items-center justify-center w-full h-56">
        <div className="relative w-52 h-52">
          <svg width="100%" height="100%" viewBox="0 0 200 180" className="overflow-visible">
            {/* Glow filter */}
            <defs>
              <filter id="triGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Base triangle */}
            <path
              d="M 20 160 L 100 20 L 180 160 Z"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
            />

            {/* Progress triangle */}
            <motion.path
              d="M 20 160 L 100 20 L 180 160 Z"
              fill="none"
              stroke={colors.main}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={totalLength}
              strokeDashoffset={getDashoffset()}
              filter="url(#triGlow)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />

            {/* Vertex markers */}
            {[
              { x: 20, y: 160, active: phase === 'inhale', label: '4s' },
              { x: 100, y: 20, active: phase === 'hold-in', label: '4s' },
              { x: 180, y: 160, active: phase === 'exhale', label: '4s' },
            ].map((v, i) => (
              <g key={i}>
                <motion.circle
                  cx={v.x}
                  cy={v.y}
                  r={v.active ? 10 : 6}
                  fill={v.active ? colors.main : 'rgba(255,255,255,0.2)'}
                  animate={{ scale: v.active ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: v.active ? Infinity : 0 }}
                  filter={v.active ? 'url(#triGlow)' : undefined}
                />
              </g>
            ))}

            {/* Moving dot */}
            <motion.circle
              cx={dotPos.x}
              cy={dotPos.y}
              r="8"
              fill="white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          </svg>

          {/* Center label */}
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span 
              className="text-lg font-bold uppercase tracking-widest"
              style={{ color: colors.main, textShadow: `0 0 10px ${colors.glow}` }}
            >
              {phaseLabels[phase]}
            </span>
          </div>
        </div>
      </div>
    </GameExerciseWrapper>
  );
}

export default TriangleBalance;
