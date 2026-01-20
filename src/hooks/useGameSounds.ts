/**
 * useGameSounds - Hook para sons do jogo
 * Usa a lib use-sound que já está instalada
 */
import { useCallback, useMemo } from 'react';
import useSound from 'use-sound';
import { useUserPreferences } from './useUserPreferences';

// Sons sintéticos usando Web Audio API (não precisa de arquivos externos)
const createOscillator = (
  frequency: number,
  type: OscillatorType = 'sine',
  duration: number = 0.1,
  volume: number = 0.3
) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

// Sons pré-definidos
const SOUNDS = {
  click: () => createOscillator(800, 'sine', 0.05, 0.2),
  pop: () => createOscillator(400, 'sine', 0.08, 0.25),
  success: () => {
    createOscillator(523.25, 'sine', 0.15, 0.3); // C5
    setTimeout(() => createOscillator(659.25, 'sine', 0.15, 0.3), 100); // E5
    setTimeout(() => createOscillator(783.99, 'sine', 0.2, 0.3), 200); // G5
  },
  levelUp: () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => createOscillator(freq, 'sine', 0.2, 0.25), i * 100);
    });
  },
  error: () => createOscillator(200, 'sawtooth', 0.2, 0.15),
  bubblePop: () => createOscillator(600 + Math.random() * 400, 'sine', 0.06, 0.2),
  inhale: () => createOscillator(440, 'sine', 0.3, 0.1),
  exhale: () => createOscillator(330, 'sine', 0.3, 0.1),
  streak: () => {
    [392, 523.25, 659.25].forEach((freq, i) => {
      setTimeout(() => createOscillator(freq, 'triangle', 0.15, 0.2), i * 80);
    });
  },
  xp: () => createOscillator(880, 'sine', 0.1, 0.15),
};

export type SoundType = keyof typeof SOUNDS;

export function useGameSounds() {
  const { preferences } = useUserPreferences();
  
  const playSound = useCallback((sound: SoundType) => {
    if (!preferences.soundEnabled) return;
    
    try {
      const volume = preferences.volume;
      // Ajustar volume não é trivial com Web Audio inline, 
      // mas funciona para feedback básico
      SOUNDS[sound]?.();
    } catch (e) {
      // Silently fail if audio context not available
      console.warn('Audio not available:', e);
    }
  }, [preferences.soundEnabled, preferences.volume]);
  
  // Helpers convenientes
  const click = useCallback(() => playSound('click'), [playSound]);
  const pop = useCallback(() => playSound('pop'), [playSound]);
  const success = useCallback(() => playSound('success'), [playSound]);
  const levelUp = useCallback(() => playSound('levelUp'), [playSound]);
  const bubblePop = useCallback(() => playSound('bubblePop'), [playSound]);
  const inhale = useCallback(() => playSound('inhale'), [playSound]);
  const exhale = useCallback(() => playSound('exhale'), [playSound]);
  const streak = useCallback(() => playSound('streak'), [playSound]);
  const xp = useCallback(() => playSound('xp'), [playSound]);
  
  return {
    playSound,
    click,
    pop,
    success,
    levelUp,
    bubblePop,
    inhale,
    exhale,
    streak,
    xp,
  };
}
