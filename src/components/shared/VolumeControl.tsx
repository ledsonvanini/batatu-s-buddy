/**
 * VolumeControl - Controle de volume com slider e mute
 */
import { useAudioContext } from '@/contexts';
import { Volume2, VolumeX } from 'lucide-react';

export function VolumeControl() {
    const { masterVolume, isMuted, setVolume, toggleMute } = useAudioContext();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-[var(--color-muted)] transition-colors"
                aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
                title={isMuted ? 'Ativar som' : 'Silenciar'}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                ) : (
                    <Volume2 className="w-5 h-5 text-[var(--color-foreground)]" />
                )}
            </button>

            {!isMuted && (
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={masterVolume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-[var(--color-muted)] rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:bg-[var(--color-primary)]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer"
                    aria-label="Volume"
                />
            )}
        </div>
    );
}
