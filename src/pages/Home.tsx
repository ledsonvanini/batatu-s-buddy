import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { MoodCard } from '@/components/MoodCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Settings, Flame } from 'lucide-react';
import type { Contexto } from '@/data/phrases';
import { getRandomPhrase } from '@/data/phrases';

const moods: Contexto[] = ['dia_tenso', 'entrevista', 'sem_sono', 'crush', 'familia', 'neutro'];

export default function Home() {
  const navigate = useNavigate();
  const { preferences } = useUserPreferences();
  const [selectedMood, setSelectedMood] = useState<Contexto | null>(null);

  const greeting = getGreeting();
  const welcomeMessage = `${greeting}, ${preferences.userName || 'você'}! Como você está agora?`;

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  const handleMoodSelect = (contexto: Contexto) => {
    setSelectedMood(contexto);
    // Navigate to session after a brief delay
    setTimeout(() => {
      navigate(`/session/${contexto}`);
    }, 300);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          {preferences.currentStreak > 0 && (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{preferences.currentStreak}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Settings className="w-6 h-6 text-muted-foreground" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-6 overflow-y-auto">
        {/* Mascot */}
        <div className="mb-4">
          <BatatuMascot 
            size="md" 
            persona={preferences.persona}
            mood="happy"
          />
        </div>

        {/* Greeting */}
        <div className="mb-8">
          <DialogBubble 
            message={welcomeMessage}
            typingSpeed={25}
          />
        </div>

        {/* Mood selection */}
        <div className="w-full max-w-md space-y-3">
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
    </div>
  );
}
