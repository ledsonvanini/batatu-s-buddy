import { useState, useEffect, useCallback } from 'react';
import type { Persona } from '@/data/phrases';

export interface UserPreferences {
  userName: string;
  persona: Persona;
  hasCompletedOnboarding: boolean;
  sessionsCompleted: number;
  currentStreak: number;
  lastSessionDate: string | null;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  userName: '',
  persona: 'empolgado',
  hasCompletedOnboarding: false,
  sessionsCompleted: 0,
  currentStreak: 0,
  lastSessionDate: null,
};

const STORAGE_KEY = 'batatu_preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        setPreferences(DEFAULT_PREFERENCES);
      }
    }
    setIsLoaded(true);
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      return newPrefs;
    });
  }, []);

  const completeSession = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setPreferences(prev => {
      const isConsecutive = prev.lastSessionDate === 
        new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const newPrefs = {
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1,
        currentStreak: isConsecutive ? prev.currentStreak + 1 : 1,
        lastSessionDate: today,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
      return newPrefs;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  return {
    preferences,
    isLoaded,
    updatePreferences,
    completeSession,
    resetPreferences,
  };
}
