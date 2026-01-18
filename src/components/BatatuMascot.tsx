import { cn } from '@/lib/utils';
import batatuNeutral from '@/assets/batatu-mascot.png';
import batatuHappy from '@/assets/batatu-happy.png';
import batatuSad from '@/assets/batatu-sad.png';
import type { Persona } from '@/data/phrases';

export type BatatuMood = 'neutral' | 'happy' | 'relaxed' | 'sleepy' | 'excited' | 'sad';

interface BatatuMascotProps {
  persona?: Persona;
  mood?: BatatuMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  breathing?: boolean;
  className?: string;
  position?: 'center' | 'left' | 'right' | 'bottom-left' | 'bottom-right';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
};

const positionClasses = {
  center: '',
  left: '-ml-4',
  right: '-mr-4',
  'bottom-left': 'fixed bottom-20 left-4 z-50',
  'bottom-right': 'fixed bottom-20 right-4 z-50',
};

const moodAnimations = {
  neutral: '',
  happy: 'animate-bounce-soft',
  relaxed: 'animate-float',
  sleepy: 'animate-breathe-slow opacity-90',
  excited: 'animate-wiggle',
  sad: 'opacity-90',
};

// Mapeamento de mood para imagem
const getMoodImage = (mood: BatatuMood) => {
  switch (mood) {
    case 'excited':
    case 'happy':
      return batatuHappy;
    case 'sad':
    case 'sleepy':
      return batatuSad;
    default:
      return batatuNeutral;
  }
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
  position = 'center',
  className,
  onClick,
}: BatatuMascotProps) {
  const breathingClass = breathing ? {
    empolgado: 'animate-breathe-fast',
    ouvinte: 'animate-breathe-slow',
    conselheiro: 'animate-breathe',
  }[persona] : '';

  const currentImage = getMoodImage(mood);

  return (
    <div
      className={cn(
        'rive-container relative flex items-center justify-center transition-all duration-300',
        sizeClasses[size],
        positionClasses[position],
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
        src={currentImage}
        alt="Batatu, seu companheirinho de autocuidado"
        className={cn(
          'relative z-10 w-full h-full object-contain drop-shadow-lg transition-all duration-300',
          breathingClass,
          moodAnimations[mood],
        )}
      />
      
      {/* Indicador de mood (opcional - visual feedback) */}
      {mood === 'excited' && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="text-2xl animate-bounce">✨</span>
        </div>
      )}
      {mood === 'happy' && (
        <div className="absolute -top-2 -right-2 z-20">
          <span className="text-xl animate-pop">🎉</span>
        </div>
      )}
    </div>
  );
}

export default BatatuMascot;
