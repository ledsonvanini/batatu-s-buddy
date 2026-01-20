/**
 * useUserPreferences - Hook para gerenciar preferências e progresso do usuário
 * Sistema de XP, streaks, níveis e conquistas
 */
import { useState, useEffect, useCallback } from 'react';
import type { Persona } from '@/data/phrases';

export interface UserPreferences {
  userName: string;
  persona: Persona;
  hasCompletedOnboarding: boolean;
  // Gamification
  totalXP: number;
  level: number;
  currentStreak: number;
  sessionsCompleted: number;
  lastSessionDate: string | null;
  // Audio
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0-1
  // Unlocks
  unlockedGames: string[];
  unlockedBadges: string[];
}

// XP por ação
export const XP_REWARDS = {
  SESSION_COMPLETE: 50,
  STREAK_BONUS: 25, // Por dia de streak
  FEEDBACK_BETTER: 20,
  FEEDBACK_SAME: 10,
  FIRST_SESSION: 100,
  BUBBLE_GAME_WIN: 30,
};

// Níveis: XP necessário
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  800,    // Level 5
  1200,   // Level 6
  1700,   // Level 7
  2300,   // Level 8
  3000,   // Level 9
  4000,   // Level 10
];

const DEFAULT_PREFERENCES: UserPreferences = {
  userName: '',
  persona: 'empolgado',
  hasCompletedOnboarding: false,
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  sessionsCompleted: 0,
  lastSessionDate: null,
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  unlockedGames: ['rollercoaster', 'circle', 'balloon'],
  unlockedBadges: [],
};

const STORAGE_KEY = 'batatu_preferences';

// Helper para calcular nível baseado em XP
function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

// XP até próximo nível
export function getXPToNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const level = calculateLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 1000;
  
  const current = xp - currentThreshold;
  const needed = nextThreshold - currentThreshold;
  const progress = Math.min(current / needed, 1);
  
  return { current, needed, progress };
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null); // Para animações
  const [leveledUp, setLeveledUp] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults for new fields
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch {
        setPreferences(DEFAULT_PREFERENCES);
      }
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = useCallback((prefs: UserPreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, ...updates };
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, [savePreferences]);

  // Adicionar XP com animação e level up check
  const addXP = useCallback((amount: number, reason?: string) => {
    setPreferences(prev => {
      const newXP = prev.totalXP + amount;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newXP);
      
      // Check for level up
      if (newLevel > oldLevel) {
        setLeveledUp(true);
        setTimeout(() => setLeveledUp(false), 3000);
      }
      
      // Trigger XP animation
      setXpGained(amount);
      setTimeout(() => setXpGained(null), 2000);
      
      const newPrefs = {
        ...prev,
        totalXP: newXP,
        level: newLevel,
      };
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, [savePreferences]);

  // Completar sessão com XP e streak
  const completeSession = useCallback((feedback?: 'better' | 'same' | 'worse') => {
    const today = new Date().toISOString().split('T')[0];
    
    setPreferences(prev => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = prev.lastSessionDate === yesterday;
      const isSameDay = prev.lastSessionDate === today;
      
      // Calcular XP ganho
      let xpEarned = XP_REWARDS.SESSION_COMPLETE;
      
      // Bonus de primeira sessão
      if (prev.sessionsCompleted === 0) {
        xpEarned += XP_REWARDS.FIRST_SESSION;
      }
      
      // Bonus de feedback
      if (feedback === 'better') xpEarned += XP_REWARDS.FEEDBACK_BETTER;
      else if (feedback === 'same') xpEarned += XP_REWARDS.FEEDBACK_SAME;
      
      // Streak
      const newStreak = isSameDay ? prev.currentStreak : (isConsecutive ? prev.currentStreak + 1 : 1);
      
      // Bonus de streak
      if (newStreak > 1 && !isSameDay) {
        xpEarned += XP_REWARDS.STREAK_BONUS * Math.min(newStreak, 7);
      }
      
      const newXP = prev.totalXP + xpEarned;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newXP);
      
      // Check level up
      if (newLevel > oldLevel) {
        setLeveledUp(true);
        setTimeout(() => setLeveledUp(false), 3000);
      }
      
      // XP animation
      setXpGained(xpEarned);
      setTimeout(() => setXpGained(null), 2000);
      
      const newPrefs = {
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1,
        currentStreak: newStreak,
        lastSessionDate: today,
        totalXP: newXP,
        level: newLevel,
      };
      
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, [savePreferences]);

  // Desbloquear jogo
  const unlockGame = useCallback((gameId: string) => {
    setPreferences(prev => {
      if (prev.unlockedGames.includes(gameId)) return prev;
      const newPrefs = {
        ...prev,
        unlockedGames: [...prev.unlockedGames, gameId],
      };
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, [savePreferences]);

  // Desbloquear badge
  const unlockBadge = useCallback((badgeId: string) => {
    setPreferences(prev => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const newPrefs = {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
      savePreferences(newPrefs);
      return newPrefs;
    });
  }, [savePreferences]);

  const resetPreferences = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  return {
    preferences,
    isLoaded,
    xpGained,
    leveledUp,
    updatePreferences,
    addXP,
    completeSession,
    unlockGame,
    unlockBadge,
    resetPreferences,
    getXPProgress: () => getXPToNextLevel(preferences.totalXP),
  };
}
