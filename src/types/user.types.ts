/**
 * Types relacionados ao usuário e preferências
 */

export type Persona = 'empolgado' | 'ouvinte' | 'conselheiro';

export interface UserPreferences {
    userName: string;
    persona: Persona;
    hasCompletedOnboarding: boolean;
    currentStreak: number;
    lastSessionDate: string | null;
    totalSessions: number;
    totalXP: number;
    level: number;
    unlockedBadges: string[];
    /** Volume de 0 a 1 */
    volume: number;
    /** Som habilitado */
    soundEnabled: boolean;
    /** Tema dark/light */
    theme: 'light' | 'dark' | 'system';
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
    userName: '',
    persona: 'empolgado',
    hasCompletedOnboarding: false,
    currentStreak: 0,
    lastSessionDate: null,
    totalSessions: 0,
    totalXP: 0,
    level: 1,
    unlockedBadges: [],
    volume: 0.7,
    soundEnabled: true,
    theme: 'system',
};
