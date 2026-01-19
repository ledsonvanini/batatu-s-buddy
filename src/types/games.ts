export interface BreathingGameProps {
    /** Persona do usuário para personalização de cores/elementos */
    persona: 'sport' | 'game' | 'nerd' | 'artist';
    /** Callback chamado quando um ciclo completo (inspira -> segura -> expira -> pausa) termina */
    onCycleComplete?: () => void;
    /** Fase atual do exercício controlada pelo hook useBreathing */
    phase?: 'inhale' | 'hold-in' | 'exhale' | 'hold-out';
    /** Progresso atual da fase (0 a 1) */
    progress?: number;
}
