/**
 * Configuração dos sons do app
 */
import type { SoundConfig } from '@/types';

export const SOUNDS_CONFIG: Record<string, SoundConfig> = {
    // UI Feedback
    click: {
        id: 'click',
        src: '/sounds/click.mp3',
        category: 'ui',
        volume: 0.5,
    },
    pop: {
        id: 'pop',
        src: '/sounds/pop.mp3',
        category: 'ui',
        volume: 0.6,
    },
    toggle: {
        id: 'toggle',
        src: '/sounds/toggle.mp3',
        category: 'ui',
        volume: 0.4,
    },

    // Success
    success: {
        id: 'success',
        src: '/sounds/success.mp3',
        category: 'feedback',
        volume: 0.7,
    },
    level_up: {
        id: 'level_up',
        src: '/sounds/level-up.mp3',
        category: 'feedback',
        volume: 0.8,
    },
    badge_unlock: {
        id: 'badge_unlock',
        src: '/sounds/badge.mp3',
        category: 'feedback',
        volume: 0.8,
    },

    // Ambient (loop)
    waves: {
        id: 'waves',
        src: '/sounds/ambient/waves.mp3',
        category: 'ambient',
        volume: 0.3,
        loop: true,
    },
    rain: {
        id: 'rain',
        src: '/sounds/ambient/rain.mp3',
        category: 'ambient',
        volume: 0.3,
        loop: true,
    },
    forest: {
        id: 'forest',
        src: '/sounds/ambient/forest.mp3',
        category: 'ambient',
        volume: 0.3,
        loop: true,
    },
    night: {
        id: 'night',
        src: '/sounds/ambient/night.mp3',
        category: 'ambient',
        volume: 0.25,
        loop: true,
    },
};
