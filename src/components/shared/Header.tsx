/**
 * Header - Cabeçalho minimalista com controles
 */
import { ThemeToggle } from './ThemeToggle';
import { VolumeControl } from './VolumeControl';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    showSettings?: boolean;
    showVolume?: boolean;
    showTheme?: boolean;
    transparent?: boolean;
}

export function Header({
    showSettings = false,
    showVolume = true,
    showTheme = true,
    transparent = false,
}: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header
            className={`Header fixed top-0 left-0 right-0 z-40 
        ${transparent
                    ? 'bg-transparent'
                    : 'bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)]/50'
                }
        safe-area-inset-top`}
        >
            <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
                {/* Left side - Volume */}
                <div className="flex items-center">
                    {showVolume && <VolumeControl />}
                </div>

                {/* Right side - Theme & Settings */}
                <div className="flex items-center gap-1">
                    {showTheme && <ThemeToggle />}

                    {showSettings && (
                        <button
                            onClick={() => navigate('/settings')}
                            className="p-2 rounded-full hover:bg-[var(--color-muted)] transition-colors"
                            aria-label="Configurações"
                            title="Configurações"
                        >
                            <Settings className="w-5 h-5 text-[var(--color-foreground)]" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
