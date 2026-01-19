/**
 * Types relacionados à gamificação
 */

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: BadgeRequirement;
    xpReward: number;
}

export type BadgeRequirement =
    | { type: 'sessions_count'; count: number }
    | { type: 'streak_days'; days: number }
    | { type: 'time_of_day'; hour: 'morning' | 'night' }
    | { type: 'exercise_type'; exerciseId: string; count: number }
    | { type: 'bubbles_popped'; count: number }
    | { type: 'total_xp'; xp: number };

export interface Level {
    level: number;
    name: string;
    xpRequired: number;
    description: string;
}

export interface GamificationState {
    xp: number;
    level: number;
    streak: number;
    badges: string[];
    streakFreezeCount: number;
    lastActivityDate: string | null;
}

export interface XPEvent {
    type: 'session_complete' | 'first_of_day' | 'streak_maintained' | 'badge_earned';
    amount: number;
    description: string;
}
