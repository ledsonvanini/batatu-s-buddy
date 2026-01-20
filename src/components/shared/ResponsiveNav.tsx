/**
 * ResponsiveNav - Navegação responsiva
 * Mobile: Bottom nav + Hamburger menu
 * Desktop: Sidebar ou Top nav
 */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Settings, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useGameSounds } from '@/hooks/useGameSounds';

type NavItem = {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Início', icon: Home, path: '/home' },
  { id: 'play', label: 'Jogar', icon: Gamepad2, path: '/play' },
  { id: 'achievements', label: 'Conquistas', icon: Trophy, path: '/achievements' },
  { id: 'settings', label: 'Ajustes', icon: Settings, path: '/settings' },
];

export function ResponsiveNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences, updatePreferences } = useUserPreferences();
  const { click } = useGameSounds();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleNavigate = (path: string) => {
    click();
    navigate(path);
    setMobileMenuOpen(false);
  };
  
  const toggleSound = () => {
    click();
    updatePreferences({ soundEnabled: !preferences.soundEnabled });
  };
  
  return (
    <>
      {/* Mobile Bottom Nav - Apenas 3 itens principais */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={isActive(item.path)}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
          
          {/* Menu button */}
          <button
            onClick={() => { click(); setMobileMenuOpen(true); }}
            className="nav-item"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
            <span className="text-[10px] font-semibold">Menu</span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-72 bg-[var(--surface)] z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                <span className="font-gaming font-bold text-lg">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-[var(--color-muted)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Nav Items */}
              <div className="flex-1 p-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? 'bg-[var(--primary-glow)] text-[var(--color-primary)]'
                        : 'hover:bg-[var(--color-muted)]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Settings Quick Access */}
              <div className="p-4 border-t border-[var(--color-border)] space-y-4">
                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-muted)] transition-colors"
                >
                  <span className="font-medium">Som</span>
                  {preferences.soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-[var(--color-primary)]" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-[var(--muted-text)]" />
                  )}
                </button>
                
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-3">
                  <span className="font-medium">Tema</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Desktop Top Nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <div className="font-gaming font-bold text-xl text-gradient">
            Batatu
          </div>
          
          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-[var(--primary-glow)] text-[var(--color-primary)]'
                    : 'hover:bg-[var(--color-muted)] text-[var(--text-secondary)]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl hover:bg-[var(--color-muted)] transition-colors"
            >
              {preferences.soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5 text-[var(--muted-text)]" />
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavButton({
  item,
  active,
  onClick
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-item relative ${active ? 'active' : ''}`}
    >
      <item.icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-semibold">{item.label}</span>
      
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--color-primary)]"
        />
      )}
    </button>
  );
}
