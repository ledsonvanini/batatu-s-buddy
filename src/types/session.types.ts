/**
 * Types relacionados às sessões de exercícios
 */

export type Contexto =
    | 'dia_tenso'
    | 'entrevista'
    | 'sem_sono'
    | 'crush'
    | 'familia'
    | 'neutro';

export type Momento = 'intro' | 'durante' | 'recompensa';

export type ExerciseType = 'circle' | 'balloon' | 'bubbles' | 'wave';

export type SessionPhase = 'intro' | 'exercise' | 'feedback' | 'reward';

export type FeedbackValue = 'better' | 'same' | 'worse';

export interface ContextoInfo {
    id: Contexto;
    label: string;
    emoji: string;
    description: string;
    suggestedScenario: ScenarioType;
}

export type ScenarioType = 'parque' | 'quarto_noite' | 'quarto_dia' | 'praia' | 'chuvoso';

export interface ExerciseConfig {
    id: ExerciseType;
    name: string;
    description: string;
    durationSeconds: number;
    cyclesRequired: number;
}
