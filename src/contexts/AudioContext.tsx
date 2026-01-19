/**
 * AudioContext - Gerenciamento global de áudio
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AudioState } from '@/types';

interface AudioContextValue extends AudioState {
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    setCurrentAmbient: (ambient: string | null) => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
    children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
    const [state, setState] = useState<AudioState>({
        masterVolume: 0.7,
        isMuted: false,
        currentAmbient: null,
    });

    const setVolume = useCallback((volume: number) => {
        setState(prev => ({ ...prev, masterVolume: Math.max(0, Math.min(1, volume)) }));
    }, []);

    const toggleMute = useCallback(() => {
        setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const setCurrentAmbient = useCallback((ambient: string | null) => {
        setState(prev => ({ ...prev, currentAmbient: ambient }));
    }, []);

    return (
        <AudioContext.Provider
            value={{
                ...state,
                setVolume,
                toggleMute,
                setCurrentAmbient
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudioContext() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudioContext must be used within AudioProvider');
    }
    return context;
}
