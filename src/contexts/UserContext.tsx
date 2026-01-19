/**
 * UserContext - Gerenciamento global do usuário e gamificação
 */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserPreferences, Persona } from '@/types';
import { DEFAULT_USER_PREFERENCES } from '@/types';
import { getLevelFromXP, XP_VALUES } from '@/config';

const STORAGE_KEY = 'batatu-preferences';

interface UserContextValue {
    preferences: UserPreferences;
    updatePreferences: (updates: Partial<UserPreferences>) => void;
    addXP: (amount: number, reason: string) => void;
    completeSession: () => void;
    unlockBadge: (badgeId: string) => void;
    setPersona: (persona: Persona) => void;
    resetProgress: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function loadPreferences(): UserPreferences {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...DEFAULT_USER_PREFERENCES, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Failed to load preferences:', e);
    }
    return DEFAULT_USER_PREFERENCES;
}

function savePreferences(preferences: UserPreferences) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
        console.error('Failed to save preferences:', e);
    }
}

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [preferences, setPreferences] = useState<UserPreferences>(loadPreferences);

    // Salvar no localStorage quando mudar
    useEffect(() => {
        savePreferences(preferences);
    }, [preferences]);

    const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
        setPreferences(prev => ({ ...prev, ...updates }));
    }, []);

    const addXP = useCallback((amount: number, _reason: string) => {
        setPreferences(prev => {
            const newXP = prev.totalXP + amount;
            const newLevel = getLevelFromXP(newXP);
            return {
                ...prev,
                totalXP: newXP,
                level: newLevel.level,
            };
        });
    }, []);

    const completeSession = useCallback(() => {
        const today = new Date().toDateString();

        setPreferences(prev => {
            const isFirstOfDay = prev.lastSessionDate !== today;
            const isConsecutiveDay = prev.lastSessionDate === new Date(Date.now() - 86400000).toDateString();

            let xpGain = XP_VALUES.SESSION_COMPLETE;
            if (isFirstOfDay) xpGain += XP_VALUES.FIRST_OF_DAY;
            if (isConsecutiveDay) xpGain += XP_VALUES.STREAK_MAINTAINED;

            const newXP = prev.totalXP + xpGain;
            const newLevel = getLevelFromXP(newXP);

            return {
                ...prev,
                totalSessions: prev.totalSessions + 1,
                totalXP: newXP,
                level: newLevel.level,
                lastSessionDate: today,
                currentStreak: isConsecutiveDay || isFirstOfDay ? prev.currentStreak + 1 : 1,
            };
        });
    }, []);

    const unlockBadge = useCallback((badgeId: string) => {
        setPreferences(prev => {
            if (prev.unlockedBadges.includes(badgeId)) return prev;

            const newXP = prev.totalXP + XP_VALUES.BADGE_EARNED;
            const newLevel = getLevelFromXP(newXP);

            return {
                ...prev,
                unlockedBadges: [...prev.unlockedBadges, badgeId],
                totalXP: newXP,
                level: newLevel.level,
            };
        });
    }, []);

    const setPersona = useCallback((persona: Persona) => {
        setPreferences(prev => ({ ...prev, persona }));
    }, []);

    const resetProgress = useCallback(() => {
        setPreferences(DEFAULT_USER_PREFERENCES);
    }, []);

    return (
        <UserContext.Provider
            value={{
                preferences,
                updatePreferences,
                addXP,
                completeSession,
                unlockBadge,
                setPersona,
                resetProgress,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
}
