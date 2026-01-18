import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BatatuMascot } from '@/components/BatatuMascot';
import { PersonaSelector } from '@/components/PersonaSelector';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { ArrowLeft, Trash2, Flame, Target } from 'lucide-react';
import { PERSONAS_INFO } from '@/data/phrases';

export default function Settings() {
  const navigate = useNavigate();
  const { preferences, updatePreferences, resetPreferences } = useUserPreferences();

  const handleReset = () => {
    if (confirm('Tem certeza que quer resetar tudo? Você vai perder seu progresso.')) {
      resetPreferences();
      navigate('/');
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Header */}
      <header className="flex items-center gap-4 px-6 pt-6">
        <button
          onClick={() => navigate('/home')}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-muted-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Configurações</h1>
      </header>

      <main className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Profile section */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <BatatuMascot 
              size="sm" 
              persona={preferences.persona}
              mood="happy"
            />
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {preferences.userName || 'Usuário'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {PERSONAS_INFO[preferences.persona].nome} {PERSONAS_INFO[preferences.persona].emoji}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-4 shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Sessões</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {preferences.sessionsCompleted}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Sequência</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {preferences.currentStreak} dias
              </p>
            </div>
          </div>
        </section>

        {/* Persona selector */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Personalidade do Batatu
          </h3>
          <PersonaSelector
            selected={preferences.persona}
            onSelect={(persona) => updatePreferences({ persona })}
          />
        </section>

        {/* Danger zone */}
        <section className="pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            Zona de perigo
          </h3>
          <Button
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
            onClick={handleReset}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Resetar tudo
          </Button>
        </section>
      </main>
    </div>
  );
}
