/**
 * StreakDisplay - Exibe streak com estilo gaming
 */
import { motion } from 'motion/react';
import { Flame, Calendar } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface StreakDisplayProps {
  variant?: 'badge' | 'full';
  className?: string;
}

export function StreakDisplay({ variant = 'badge', className = '' }: StreakDisplayProps) {
  const { preferences } = useUserPreferences();
  const streak = preferences.currentStreak;
  
  // Determinar "heat level" baseado no streak
  const getHeatLevel = () => {
    if (streak >= 30) return 'legendary';
    if (streak >= 14) return 'hot';
    if (streak >= 7) return 'warm';
    if (streak >= 3) return 'starting';
    return 'cold';
  };
  
  const heatLevel = getHeatLevel();
  
  const heatColors = {
    legendary: 'from-purple-500 to-pink-500',
    hot: 'from-orange-500 to-red-500',
    warm: 'from-yellow-500 to-orange-500',
    starting: 'from-amber-400 to-yellow-500',
    cold: 'from-gray-400 to-gray-500',
  };
  
  if (variant === 'badge') {
    if (streak === 0) return null;
    
    return (
      <motion.div 
        className={`badge-streak ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Flame className="w-4 h-4 fill-current" />
        <span>{streak}</span>
      </motion.div>
    );
  }
  
  // Full variant
  return (
    <div className={`bg-[var(--gradient-card)] rounded-2xl p-6 border border-[var(--color-border)] ${className}`}>
      <div className="flex items-center gap-4">
        {/* Flame Icon with glow */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${heatColors[heatLevel]} flex items-center justify-center shadow-lg relative`}>
          <Flame className="w-8 h-8 text-white fill-white" />
          
          {/* Glow effect for high streaks */}
          {streak >= 7 && (
            <div className="absolute inset-0 rounded-2xl bg-orange-500/30 blur-xl animate-pulse" />
          )}
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-[var(--text-secondary)] mb-1">Sequência atual</p>
          <p className="font-gaming font-bold text-3xl">
            {streak} {streak === 1 ? 'dia' : 'dias'}
          </p>
          
          {/* Motivational text */}
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {streak === 0 && 'Comece sua sequência hoje!'}
            {streak >= 1 && streak < 3 && 'Bom começo! Continue assim 💪'}
            {streak >= 3 && streak < 7 && 'Está pegando fogo! 🔥'}
            {streak >= 7 && streak < 14 && 'Uma semana inteira! Incrível! 🌟'}
            {streak >= 14 && streak < 30 && 'Duas semanas! Você é dedicado! 🏆'}
            {streak >= 30 && 'Lendário! Um mês de consistência! 👑'}
          </p>
        </div>
      </div>
      
      {/* Weekly visualization */}
      <div className="mt-4 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => {
            const isActive = i < Math.min(streak, 7);
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? `bg-gradient-to-br ${heatColors[heatLevel]} text-white`
                    : 'bg-[var(--color-muted)] text-[var(--muted-text)]'
                }`}
              >
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][i]}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
