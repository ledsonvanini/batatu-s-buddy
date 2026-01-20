/**
 * XPDisplay - Componente para exibir XP, nível e progresso
 * Estilo gaming com animações
 */
import { motion, AnimatePresence } from 'motion/react';
import { Zap, TrendingUp, Star } from 'lucide-react';
import { useUserPreferences, getXPToNextLevel } from '@/hooks/useUserPreferences';

interface XPDisplayProps {
  variant?: 'full' | 'compact' | 'badge';
  showLevel?: boolean;
  className?: string;
}

export function XPDisplay({ variant = 'badge', showLevel = true, className = '' }: XPDisplayProps) {
  const { preferences, xpGained, leveledUp } = useUserPreferences();
  const xpProgress = getXPToNextLevel(preferences.totalXP);
  
  // Badge variant (compact para header)
  if (variant === 'badge') {
    return (
      <div className={`relative ${className}`}>
        <motion.div 
          className="badge-xp"
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-4 h-4" />
          <span>{preferences.totalXP}</span>
        </motion.div>
        
        {/* XP Gain Animation */}
        <AnimatePresence>
          {xpGained && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 text-[var(--xp)] font-bold text-sm whitespace-nowrap"
            >
              +{xpGained} XP
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showLevel && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--secondary-glow)] rounded-full">
            <Star className="w-4 h-4 text-[var(--color-secondary)]" />
            <span className="font-bold text-sm">Nv.{preferences.level}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[var(--xp)]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">{preferences.totalXP} XP</span>
            <div className="w-20 h-1.5 bg-[var(--color-muted)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--xp)] to-[var(--color-primary)]"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress.progress * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Full variant (para tela de perfil)
  return (
    <div className={`bg-[var(--gradient-card)] rounded-2xl p-6 border border-[var(--color-border)] ${className}`}>
      {/* Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center shadow-lg">
            <span className="text-white font-gaming font-bold text-xl">{preferences.level}</span>
          </div>
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Nível</p>
            <p className="font-gaming font-bold text-2xl">Nível {preferences.level}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-[var(--text-secondary)]">Total XP</p>
          <p className="font-bold text-xl text-[var(--xp)]">{preferences.totalXP}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Próximo nível</span>
          <span className="font-medium">{xpProgress.current}/{xpProgress.needed} XP</span>
        </div>
        
        <div className="h-3 bg-[var(--color-muted)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--xp)] to-[var(--color-primary)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress.progress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
      
      {/* Level Up Celebration */}
      <AnimatePresence>
        {leveledUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-2" />
              </motion.div>
              <p className="font-gaming font-bold text-2xl text-white">Level Up!</p>
              <p className="text-[var(--color-primary)]">Nível {preferences.level}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
