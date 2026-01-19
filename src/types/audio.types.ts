/**
 * Types relacionados ao sistema de áudio
 */

export type SoundCategory = 'ui' | 'ambient' | 'feedback' | 'batatu';

export interface SoundConfig {
    id: string;
    src: string;
    category: SoundCategory;
    volume?: number;
    loop?: boolean;
}

export interface AudioState {
    masterVolume: number;
    isMuted: boolean;
    currentAmbient: string | null;
}

export const SOUND_IDS = {
    // UI Feedback
    CLICK: 'click',
    POP: 'pop',
    TOGGLE: 'toggle',

    // Success/Rewards
    SUCCESS: 'success',
    LEVEL_UP: 'level_up',
    BADGE_UNLOCK: 'badge_unlock',

    // Ambient
    WAVES: 'waves',
    RAIN: 'rain',
    FOREST: 'forest',
    NIGHT: 'night',

    // Batatu
    BATATU_HAPPY: 'batatu_happy',
    BATATU_GREETING: 'batatu_greeting',
} as const;

export type SoundId = typeof SOUND_IDS[keyof typeof SOUND_IDS];
