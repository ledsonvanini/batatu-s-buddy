/**
 * Configuração de gamificação: XP, níveis, badges
 */
import type { Badge, Level } from '@/types';

// XP por ação
export const XP_VALUES = {
    SESSION_COMPLETE: 10,
    SESSION_NO_PAUSE: 5,
    FIRST_OF_DAY: 15,
    STREAK_MAINTAINED: 20,
    BADGE_EARNED: 50,
} as const;

// Níveis de amizade com o Batatu
export const LEVELS: Level[] = [
    { level: 1, name: 'Conhecidos', xpRequired: 0, description: 'Acabamos de nos conhecer!' },
    { level: 2, name: 'Colegas', xpRequired: 100, description: 'Já estamos nos entendendo!' },
    { level: 3, name: 'Amigos', xpRequired: 300, description: 'Você é meu amigo!' },
    { level: 4, name: 'Melhores Amigos', xpRequired: 600, description: 'Parceiros de verdade!' },
    { level: 5, name: 'Companheiros', xpRequired: 1000, description: 'Juntos para sempre!' },
];

// Badges disponíveis
export const BADGES: Badge[] = [
    {
        id: 'primeira_chama',
        name: 'Primeira Chama',
        description: 'Complete sua primeira sessão',
        icon: '🔥',
        requirement: { type: 'sessions_count', count: 1 },
        xpReward: 50,
    },
    {
        id: 'semana_ouro',
        name: 'Semana de Ouro',
        description: 'Mantenha um streak de 7 dias',
        icon: '🏆',
        requirement: { type: 'streak_days', days: 7 },
        xpReward: 100,
    },
    {
        id: 'coruja_noturna',
        name: 'Coruja Noturna',
        description: 'Faça um exercício após as 22h',
        icon: '🦉',
        requirement: { type: 'time_of_day', hour: 'night' },
        xpReward: 30,
    },
    {
        id: 'madrugador',
        name: 'Madrugador',
        description: 'Faça um exercício antes das 7h',
        icon: '☀️',
        requirement: { type: 'time_of_day', hour: 'morning' },
        xpReward: 30,
    },
    {
        id: 'estourador',
        name: 'Estourador',
        description: 'Estoure 50 bolhas no jogo',
        icon: '🫧',
        requirement: { type: 'bubbles_popped', count: 50 },
        xpReward: 40,
    },
    {
        id: 'dedicado',
        name: 'Dedicado',
        description: 'Complete 10 sessões',
        icon: '💪',
        requirement: { type: 'sessions_count', count: 10 },
        xpReward: 75,
    },
    {
        id: 'veterano',
        name: 'Veterano',
        description: 'Acumule 500 XP',
        icon: '⭐',
        requirement: { type: 'total_xp', xp: 500 },
        xpReward: 100,
    },
];

// Calcular nível baseado no XP
export function getLevelFromXP(xp: number): Level {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].xpRequired) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

// Calcular progresso para o próximo nível (0-100%)
export function getProgressToNextLevel(xp: number): number {
    const currentLevel = getLevelFromXP(xp);
    const currentLevelIndex = LEVELS.findIndex(l => l.level === currentLevel.level);

    if (currentLevelIndex === LEVELS.length - 1) {
        return 100; // Nível máximo
    }

    const nextLevel = LEVELS[currentLevelIndex + 1];
    const xpInCurrentLevel = xp - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;

    return Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForNext) * 100));
}
