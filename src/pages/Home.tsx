/**
 * Home - Tela principal PWA mobile-first v3
 * BottomNav com 4 itens, sem scroll, ajustes de layout
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { MoodCard } from '@/components/MoodCard';
import { BubbleGame } from '@/components/BubbleGame';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { ThemeToggle } from '@/components/shared';
import { Flame, Home as HomeIcon, Gamepad2, User, Settings } from 'lucide-react';
import type { Contexto } from '@/data/phrases';

const moods: Contexto[] = ['dia_tenso', 'entrevista', 'sem_sono', 'crush'];

const IDLE_TIMEOUT = 120000;

export default function Home() {
  const navigate = useNavigate();
  const { preferences } = useUserPreferences();
  const [selectedMood, setSelectedMood] = useState<Contexto | null>(null);
  const [showBubbleGame, setShowBubbleGame] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const greeting = getGreeting();
  // Simplified greeting
  const welcomeMessage = `${greeting}!`;

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setShowBubbleGame(true), IDLE_TIMEOUT);
  };

  useEffect(() => {
    resetIdleTimer();
    const handleActivity = () => resetIdleTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  const handleMoodSelect = (contexto: Contexto) => {
    setSelectedMood(contexto);
    setTimeout(() => navigate(`/session/${contexto}`), 200);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[var(--color-background)]">
      {/* Bubble Game Overlay */}
      {showBubbleGame && (
        <BubbleGame
          persona={preferences.persona}
          onClose={() => { setShowBubbleGame(false); resetIdleTimer(); }}
        />
      )}

      {/* Header - Minimalista */}
      <header className="flex items-center justify-between px-5 py-4 safe-top z-10">
        <div className="flex items-center gap-2">
          {preferences.currentStreak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary-light)] rounded-full shadow-sm">
              <Flame className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
              <span className="text-sm font-bold text-[var(--color-text)]">
                {preferences.currentStreak}
              </span>
            </div>
          )}
        </div>

        <ThemeToggle />
      </header>

      {/* Main Content - Centralizado, sem scroll */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 w-full max-w-md mx-auto relative z-0">

        {/* Batatu Positioned slightly higher */}
        <div className="mb-4 animate-float">
          <BatatuMascot
            size="md"
            persona={preferences.persona}
            mood="happy"
          />
        </div>

        {/* Message */}
        <div className="mb-8 w-full max-w-[280px]">
          <DialogBubble
            message={welcomeMessage}
            typingSpeed={40}
            tailPosition="top"
          />
        </div>

        {/* Grid - 2x2 Clean */}
        <div className="w-full grid grid-cols-2 gap-4">
          {moods.map((mood) => (
            <MoodCard
              key={mood}
              contexto={mood}
              onClick={handleMoodSelect}
              selected={selectedMood === mood}
            />
          ))}
        </div>
      </main>

      {/* Bottom Nav - 4 Items */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] safe-bottom z-20">
        <div className="flex items-center justify-between px-6 py-2 max-w-md mx-auto">
          <NavItem
            icon={HomeIcon}
            label="Início"
            active
            onClick={() => { }}
          />
          <NavItem
            icon={Gamepad2}
            label="Jogar"
            onClick={() => navigate('/play')}
          />
          <NavItem
            icon={User}
            label="Perfil"
            onClick={() => navigate('/profile')}
          />
          <NavItem
            icon={Settings}
            label="Ajustes"
            onClick={() => navigate('/settings')}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick
}: {
  icon: typeof HomeIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200
        ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]'}
      `}
    >
      <Icon className={`w-6 h-6 stroke-[2px]`} />
      <span className="text-[10px] font-medium tracking-wide">
        {label}
      </span>
    </button>
  );
}
