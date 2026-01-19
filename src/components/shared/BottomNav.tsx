/**
 * BottomNav - Navegação inferior estilo PWA/app nativo
 * Navegação mínima: Home, Jogar (exercícios), Perfil
 */
import { Home, Gamepad2, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavItem = {
    id: 'home' | 'play' | 'profile';
    label: string;
    icon: typeof Home;
    path: string;
};

const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Início', icon: Home, path: '/home' },
    { id: 'play', label: 'Jogar', icon: Gamepad2, path: '/play' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
];

export function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            className="BottomNav fixed bottom-0 left-0 right-0 z-50 
        bg-[var(--color-card)] border-t border-[var(--color-border)]
        safe-area-inset-bottom"
            role="navigation"
            aria-label="Menu principal"
        >
            <div className="flex items-center justify-around h-16 max-w-md mx-auto">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200
                ${active
                                    ? 'text-[var(--color-primary)] scale-105'
                                    : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                                }`}
                            aria-current={active ? 'page' : undefined}
                            aria-label={item.label}
                        >
                            <Icon
                                className={`w-6 h-6 transition-transform ${active ? 'scale-110' : ''}`}
                                strokeWidth={active ? 2.5 : 2}
                            />
                            <span className={`text-xs font-medium ${active ? 'font-bold' : ''}`}>
                                {item.label}
                            </span>

                            {/* Indicator dot for active state */}
                            {active && (
                                <span className="absolute -bottom-1 w-1 h-1 bg-[var(--color-primary)] rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
