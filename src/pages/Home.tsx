/**
 * Home - Tela principal gaming/imersiva
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { MoodCard } from '@/components/MoodCard';
import { BubbleGame } from '@/components/BubbleGame';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { ThemeToggle } from '@/components/shared';
import { Flame, Home as HomeIcon, Gamepad2, User, Settings, Trophy, Zap } from 'lucide-react';
import { motion } from 'motion/react';
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
  const userName = preferences.userName || 'Amigo';
  const welcomeMessage = `${greeting}, ${userName}! Como você tá hoje?`;

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
    <div 
      className="h-screen w-full flex flex-col overflow-hidden relative"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-50"
          style={{ background: 'var(--primary-glow)', top: '5%', right: '-10%' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: 'var(--secondary-glow)', bottom: '20%', left: '-15%' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Bubble Game Overlay */}
      {showBubbleGame && (
        <BubbleGame
          persona={preferences.persona}
          onClose={() => { setShowBubbleGame(false); resetIdleTimer(); }}
        />
      )}

      {/* Header - Gaming Style */}
      <header className="flex items-center justify-between px-5 py-4 safe-top z-20">
        <div className="flex items-center gap-3">
          {/* Streak Badge */}
          {preferences.currentStreak > 0 && (
            <motion.div 
              className="badge-streak"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>{preferences.currentStreak}</span>
            </motion.div>
          )}
          
          {/* XP Badge (placeholder) */}
          <motion.div 
            className="badge-xp"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
          >
            <Zap className="w-4 h-4" />
            <span>150 XP</span>
          </motion.div>
        </div>

        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-24 w-full max-w-md mx-auto relative z-10">

        {/* Batatu with glow */}
        <motion.div 
          className="relative mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-2xl animate-glow-pulse"
            style={{ background: 'var(--primary-glow)', transform: 'scale(1.3)' }}
          />
          <BatatuMascot
            size="md"
            persona={preferences.persona}
            mood="happy"
          />
        </motion.div>

        {/* Message */}
        <motion.div 
          className="mb-8 w-full max-w-[300px]"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DialogBubble
            message={welcomeMessage}
            typingSpeed={35}
            tailPosition="top"
          />
        </motion.div>

        {/* Mood Grid - Gaming Cards */}
        <motion.div 
          className="w-full grid grid-cols-2 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {moods.map((mood, index) => (
            <motion.div
              key={mood}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <MoodCard
                contexto={mood}
                onClick={handleMoodSelect}
                selected={selectedMood === mood}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Bottom Nav - Gaming Style */}
      <nav className="bottom-nav">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <NavItem icon={HomeIcon} label="Início" active onClick={() => {}} />
          <NavItem icon={Gamepad2} label="Jogar" onClick={() => navigate('/play')} />
          <NavItem icon={Trophy} label="Conquistas" onClick={() => navigate('/profile')} />
          <NavItem icon={Settings} label="Ajustes" onClick={() => navigate('/settings')} />
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
      className={`nav-item relative ${active ? 'active' : ''}`}
    >
      <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-semibold tracking-wide">
        {label}
      </span>
    </button>
  );
}
