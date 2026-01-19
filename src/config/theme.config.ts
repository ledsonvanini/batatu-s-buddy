/**
 * Configuração de temas e cores por persona
 */
import type { Persona, ScenarioType } from '@/types';

export interface PersonaTheme {
    primary: string;
    primaryLight: string;
    glow: string;
    gradient: string;
}

export const PERSONA_THEMES: Record<Persona, PersonaTheme> = {
    empolgado: {
        primary: 'hsl(25, 95%, 53%)',
        primaryLight: 'hsl(30, 100%, 65%)',
        glow: 'hsl(25, 95%, 53%, 0.4)',
        gradient: 'linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(40, 95%, 55%) 100%)',
    },
    ouvinte: {
        primary: 'hsl(217, 91%, 70%)',
        primaryLight: 'hsl(250, 85%, 75%)',
        glow: 'hsl(217, 91%, 70%, 0.4)',
        gradient: 'linear-gradient(135deg, hsl(217, 91%, 70%) 0%, hsl(250, 85%, 75%) 100%)',
    },
    conselheiro: {
        primary: 'hsl(160, 84%, 39%)',
        primaryLight: 'hsl(168, 80%, 50%)',
        glow: 'hsl(160, 84%, 39%, 0.4)',
        gradient: 'linear-gradient(135deg, hsl(160, 84%, 39%) 0%, hsl(168, 80%, 50%) 100%)',
    },
};

export interface ScenarioConfig {
    id: ScenarioType;
    name: string;
    bgGradient: string;
    ambientSound: string | null;
    timeOfDay: 'day' | 'night' | 'any';
}

export const SCENARIOS: Record<ScenarioType, ScenarioConfig> = {
    parque: {
        id: 'parque',
        name: 'Parque',
        bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)',
        ambientSound: 'forest',
        timeOfDay: 'day',
    },
    quarto_noite: {
        id: 'quarto_noite',
        name: 'Quarto (Noite)',
        bgGradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        ambientSound: 'night',
        timeOfDay: 'night',
    },
    quarto_dia: {
        id: 'quarto_dia',
        name: 'Quarto (Dia)',
        bgGradient: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
        ambientSound: null,
        timeOfDay: 'day',
    },
    praia: {
        id: 'praia',
        name: 'Praia',
        bgGradient: 'linear-gradient(180deg, #0ea5e9 0%, #fef3c7 100%)',
        ambientSound: 'waves',
        timeOfDay: 'any',
    },
    chuvoso: {
        id: 'chuvoso',
        name: 'Dia Chuvoso',
        bgGradient: 'linear-gradient(180deg, #64748b 0%, #94a3b8 100%)',
        ambientSound: 'rain',
        timeOfDay: 'any',
    },
};

// Mapear contexto para cenário sugerido
export function getScenarioForContext(
    contexto: string,
    hour: number = new Date().getHours()
): ScenarioType {
    const isNight = hour >= 22 || hour < 6;

    switch (contexto) {
        case 'sem_sono':
        case 'familia':
            return 'quarto_noite';
        case 'crush':
        case 'entrevista':
            return isNight ? 'quarto_noite' : 'quarto_dia';
        case 'dia_tenso':
            return 'parque';
        default:
            return isNight ? 'quarto_noite' : 'parque';
    }
}
