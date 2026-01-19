/**
 * useBreathing Hook
 * Gerencia o ciclo de respiração e animação suave
 */
import { useState, useEffect, useRef } from 'react';

interface UseBreathingProps {
    inhaleTime: number;
    holdInTime: number;
    exhaleTime: number;
    holdOutTime: number;
    onCycleComplete?: () => void;
}

export function useBreathing({
    inhaleTime,
    holdInTime,
    exhaleTime,
    holdOutTime,
    onCycleComplete
}: UseBreathingProps) {
    const [phase, setPhase] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out'>('inhale');
    const [progress, setProgress] = useState(0);

    const startTimeRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const getPhaseDuration = (p: string) => {
        switch (p) {
            case 'inhale': return inhaleTime;
            case 'hold-in': return holdInTime;
            case 'exhale': return exhaleTime;
            case 'hold-out': return holdOutTime;
            default: return 4000;
        }
    };

    const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const duration = getPhaseDuration(phase);
        const elapsed = timestamp - startTimeRef.current;
        const currentProgress = Math.min(elapsed / duration, 1);

        setProgress(currentProgress);

        if (currentProgress >= 1) {
            // Phase complete, switch to next
            startTimeRef.current = null;

            switch (phase) {
                case 'inhale':
                    setPhase(holdInTime > 0 ? 'hold-in' : 'exhale');
                    break;
                case 'hold-in':
                    setPhase('exhale');
                    break;
                case 'exhale':
                    setPhase(holdOutTime > 0 ? 'hold-out' : 'inhale');
                    if (holdOutTime === 0) onCycleComplete?.(); // Cycle done if no hold-out
                    break;
                case 'hold-out':
                    setPhase('inhale'); // Cycle fully done
                    onCycleComplete?.();
                    break;
            }
        } else {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        // Reset on mount or props change
        setPhase('inhale');
        setProgress(0);
        startTimeRef.current = null;

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [inhaleTime, holdInTime, exhaleTime, holdOutTime]);

    // Restart animation loop when phase changes (to capture new start time)
    useEffect(() => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        startTimeRef.current = null;
        animationFrameRef.current = requestAnimationFrame(animate);
    }, [phase]);

    return { phase, progress };
}
