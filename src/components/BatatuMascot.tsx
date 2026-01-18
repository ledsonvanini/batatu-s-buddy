import { cn } from '@/lib/utils';
import batatuImage from '@/assets/batatu-mascot.png';
import type { Persona } from '@/data/phrases';

export type BatatuMood = 'neutral' | 'happy' | 'relaxed' | 'sleepy' | 'excited' | 'sad';

interface BatatuMascotProps {
  persona?: Persona;
  mood?: BatatuMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  breathing?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
};

const personaFilters = {
  empolgado: 'hue-rotate(0deg) saturate(1.2)',
  ouvinte: 'hue-rotate(180deg) saturate(0.9)',
  conselheiro: 'hue-rotate(120deg) saturate(1.1)',
};

const moodAnimations = {
  neutral: '',
  happy: 'animate-bounce-soft',
  relaxed: 'animate-float',
  sleepy: 'animate-breathe-slow opacity-90',
  excited: 'animate-wiggle',
  sad: 'opacity-80',
};

/**
 * BatatuMascot - Componente preparado para integração com Rive
 * 
 * Quando o Rive for integrado, substitua o conteúdo por:
 * <Rive src="/animations/batatu.riv" stateMachines="..." />
 * 
 * Props como mood e persona podem controlar inputs do Rive.
 */
export function BatatuMascot({
  persona = 'empolgado',
  mood = 'neutral',
  size = 'lg',
  breathing = true,
  className,
  onClick,
}: BatatuMascotProps) {
  const breathingClass = breathing ? {
    empolgado: 'animate-breathe-fast',
    ouvinte: 'animate-breathe-slow',
    conselheiro: 'animate-breathe',
  }[persona] : '';

  return (
    <div
      className={cn(
        'rive-container relative flex items-center justify-center transition-all duration-300',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-105',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Glow effect baseado na persona */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-2xl opacity-30 transition-opacity',
          persona === 'empolgado' && 'bg-primary',
          persona === 'ouvinte' && 'bg-secondary',
          persona === 'conselheiro' && 'bg-accent',
        )}
      />
      
      {/* Imagem do Batatu - será substituída por Rive */}
      <img
        src={batatuImage}
        alt="Batatu, seu companheirinho de autocuidado"
        className={cn(
          'relative z-10 w-full h-full object-contain drop-shadow-lg',
          breathingClass,
          moodAnimations[mood],
        )}
        style={{
          filter: personaFilters[persona],
        }}
      />
      
      {/* Indicador de mood (opcional - visual feedback) */}
      {mood === 'excited' && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="text-2xl animate-bounce">✨</span>
        </div>
      )}
      {mood === 'happy' && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="text-xl animate-pop">😊</span>
        </div>
      )}
    </div>
  );
}

export default BatatuMascot;
