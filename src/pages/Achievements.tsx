/**
 * Achievements - Página de Conquistas/Perfil
 * Mostra XP, nível, streak, badges e histórico
 */
import { motion } from 'motion/react';
import { 
  Trophy, Flame, Zap, Star, Target, Heart, 
  Sparkles, Crown, Medal, Award, Clock, TrendingUp,
  ChevronRight, Lock
} from 'lucide-react';
import { useUserPreferences, LEVEL_THRESHOLDS, getXPToNextLevel } from '@/hooks/useUserPreferences';
import { ResponsiveNav } from '@/components/shared/ResponsiveNav';
import { BatatuMascot } from '@/components/BatatuMascot';

// Definição dos badges disponíveis
const ALL_BADGES = [
  { id: 'first_breath', name: 'Primeiro Respiro', icon: Sparkles, description: 'Complete sua primeira sessão', xpRequired: 0 },
  { id: 'streak_3', name: 'Em Chamas', icon: Flame, description: '3 dias seguidos', xpRequired: 0 },
  { id: 'streak_7', name: 'Semana Zen', icon: Trophy, description: '7 dias seguidos', xpRequired: 0 },
  { id: 'level_5', name: 'Mestre Iniciante', icon: Star, description: 'Alcance nível 5', xpRequired: 0 },
  { id: 'level_10', name: 'Guru da Calma', icon: Crown, description: 'Alcance nível 10', xpRequired: 0 },
  { id: 'sessions_10', name: 'Dedicado', icon: Target, description: 'Complete 10 sessões', xpRequired: 0 },
  { id: 'sessions_50', name: 'Comprometido', icon: Medal, description: 'Complete 50 sessões', xpRequired: 0 },
  { id: 'xp_1000', name: 'Mil Pontos', icon: Zap, description: 'Acumule 1000 XP', xpRequired: 1000 },
  { id: 'xp_5000', name: 'Lendário', icon: Award, description: 'Acumule 5000 XP', xpRequired: 5000 },
];

export default function Achievements() {
  const { preferences, getXPProgress } = useUserPreferences();
  const xpProgress = getXPProgress();
  
  // Determinar quais badges foram desbloqueados
  const unlockedBadgeIds = new Set(preferences.unlockedBadges);
  
  // Calcular badges automáticos baseado em condições
  const earnedBadges = ALL_BADGES.filter(badge => {
    if (unlockedBadgeIds.has(badge.id)) return true;
    if (badge.id === 'first_breath' && preferences.sessionsCompleted >= 1) return true;
    if (badge.id === 'streak_3' && preferences.currentStreak >= 3) return true;
    if (badge.id === 'streak_7' && preferences.currentStreak >= 7) return true;
    if (badge.id === 'level_5' && preferences.level >= 5) return true;
    if (badge.id === 'level_10' && preferences.level >= 10) return true;
    if (badge.id === 'sessions_10' && preferences.sessionsCompleted >= 10) return true;
    if (badge.id === 'sessions_50' && preferences.sessionsCompleted >= 50) return true;
    if (badge.id === 'xp_1000' && preferences.totalXP >= 1000) return true;
    if (badge.id === 'xp_5000' && preferences.totalXP >= 5000) return true;
    return false;
  });
  
  const earnedBadgeIds = new Set(earnedBadges.map(b => b.id));

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'var(--xp-glow)', top: '-10%', right: '-10%' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: 'var(--streak-glow)', bottom: '10%', left: '-10%' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24 md:pb-8 md:pt-20 relative z-10 max-w-2xl mx-auto w-full">
        
        {/* Profile Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="relative inline-block mb-4">
            <div 
              className="absolute inset-0 rounded-full blur-2xl animate-glow-pulse"
              style={{ background: 'var(--primary-glow)', transform: 'scale(1.4)' }}
            />
            <BatatuMascot size="md" mood="happy" persona={preferences.persona} />
            
            {/* Level badge */}
            <motion.div 
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <span className="text-white font-bold text-sm">{preferences.level}</span>
            </motion.div>
          </div>
          
          <h1 className="font-gaming text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            {preferences.userName || 'Respirador'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Nível {preferences.level} • {preferences.sessionsCompleted} sessões
          </p>
        </motion.div>

        {/* XP Progress Card */}
        <motion.div 
          className="card-gaming p-5 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>
                  {preferences.totalXP.toLocaleString()} XP
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {xpProgress.current} / {xpProgress.needed} para nível {preferences.level + 1}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-gaming font-bold" style={{ color: 'var(--color-primary)' }}>
                Lv.{preferences.level}
              </span>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="h-3 bg-[var(--color-muted)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress.progress * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              style={{ boxShadow: '0 0 10px var(--xp-glow)' }}
            />
          </div>
          
          {/* Level milestones */}
          <div className="flex justify-between mt-2 px-1">
            {[1, 3, 5, 7, 10].map((lvl) => (
              <div 
                key={lvl} 
                className={`text-xs font-medium ${preferences.level >= lvl ? 'text-[var(--color-primary)]' : 'text-[var(--muted-text)]'}`}
              >
                {lvl}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Streak */}
          <div className="card-gaming p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <p className="font-gaming text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {preferences.currentStreak}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Dias seguidos</p>
          </div>
          
          {/* Sessions */}
          <div className="card-gaming p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="font-gaming text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {preferences.sessionsCompleted}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sessões</p>
          </div>
          
          {/* Badges */}
          <div className="card-gaming p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <p className="font-gaming text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {earnedBadges.length}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Conquistas</p>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-gaming text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <Trophy className="w-5 h-5 text-[var(--color-primary)]" />
            Conquistas
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {ALL_BADGES.map((badge, index) => {
              const isUnlocked = earnedBadgeIds.has(badge.id);
              const Icon = badge.icon;
              
              return (
                <motion.div
                  key={badge.id}
                  className={`card-gaming p-4 text-center relative overflow-hidden ${
                    isUnlocked ? '' : 'opacity-50'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: isUnlocked ? 1 : 0.5 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glow for unlocked */}
                  {isUnlocked && (
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ background: 'var(--gradient-gaming)' }}
                    />
                  )}
                  
                  <div className={`relative w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                      : 'bg-[var(--color-muted)]'
                  }`}>
                    {isUnlocked ? (
                      <Icon className="w-6 h-6 text-white" />
                    ) : (
                      <Lock className="w-5 h-5 text-[var(--muted-text)]" />
                    )}
                  </div>
                  
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>
                    {badge.name}
                  </p>
                  <p className="text-[10px] mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {badge.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity (placeholder) */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-gaming text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
            Atividade Recente
          </h2>
          
          <div className="card-gaming p-4">
            {preferences.sessionsCompleted > 0 ? (
              <div className="space-y-3">
                {preferences.lastSessionDate && (
                  <div className="flex items-center justify-between p-3 bg-[var(--color-muted)]/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                          Última sessão
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {new Date(preferences.lastSessionDate).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="badge-xp">
                      +50 XP
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-[var(--color-muted)]/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                        Total de sessões
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {preferences.sessionsCompleted} exercícios completados
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--muted-text)]" />
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[var(--muted-text)]" />
                </div>
                <p className="font-medium" style={{ color: 'var(--text)' }}>
                  Nenhuma sessão ainda
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Complete seu primeiro exercício para começar!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Navigation */}
      <ResponsiveNav />
    </div>
  );
}
