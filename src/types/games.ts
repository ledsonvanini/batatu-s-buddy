import type { Persona } from '@/data/phrases';

export type BreathPhaseType = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

export interface BreathingGameProps {
    /** Persona do usuário para personalização de cores/elementos */
    persona: Persona;
    /** Callback chamado quando um ciclo completo (inspira -> segura -> expira -> pausa) termina */
    onCycleComplete?: () => void;
    /** Callback chamado quando a fase de respiração muda */
    onPhaseChange?: (phase: BreathPhaseType) => void;
    /** Fase atual do exercício controlada pelo hook useBreathing */
    phase?: BreathPhaseType;
    /** Progresso atual da fase (0 a 1) */
    progress?: number;
}
