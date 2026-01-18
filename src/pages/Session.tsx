import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { BreathingCircle } from '@/components/BreathingCircle';
import { BalloonExercise } from '@/components/exercises/BalloonExercise';
import { BubblesExercise } from '@/components/exercises/BubblesExercise';
import { WaveExercise } from '@/components/exercises/WaveExercise';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { X, ThumbsUp, Meh, ThumbsDown, Shuffle } from 'lucide-react';
import type { Contexto, Momento } from '@/data/phrases';
import { getRandomPhrase, CONTEXTOS_INFO } from '@/data/phrases';

type SessionPhase = 'intro' | 'exercise' | 'feedback' | 'reward';
type ExerciseType = 'circle' | 'balloon' | 'bubbles' | 'wave';

const exerciseTypes: ExerciseType[] = ['circle', 'balloon', 'bubbles', 'wave'];

const exerciseNames: Record<ExerciseType, string> = {
  circle: 'Círculo de respiração',
  balloon: 'Inflar balão 🎈',
  bubbles: 'Bolhas de sabão 🫧',
  wave: 'Ondas do mar 🌊',
};

export default function Session() {
  const navigate = useNavigate();
  const { contexto } = useParams<{ contexto: Contexto }>();
  const { preferences, completeSession } = useUserPreferences();
  const [phase, setPhase] = useState<SessionPhase>('intro');
  const [cycleCount, setCycleCount] = useState(0);
  const [feedback, setFeedback] = useState<'better' | 'same' | 'worse' | null>(null);
  const [exerciseType, setExerciseType] = useState<ExerciseType>(() => 
    exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)]
  );

  const currentContexto = (contexto as Contexto) || 'neutro';
  const contextoInfo = CONTEXTOS_INFO[currentContexto];

  const getMessage = (momento: Momento) => {
    return getRandomPhrase(preferences.persona, currentContexto, momento);
  };

  const [introMessage] = useState(() => getMessage('intro'));
  const [duringMessage] = useState(() => getMessage('durante'));
  const [rewardMessage] = useState(() => getMessage('recompensa'));

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => setPhase('exercise'), 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleCycleComplete = () => {
    setCycleCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 4) {
        setTimeout(() => setPhase('feedback'), 1000);
      }
      return newCount;
    });
  };

  const handleFeedback = (value: 'better' | 'same' | 'worse') => {
    setFeedback(value);
    completeSession();
    setPhase('reward');
  };

  const handleClose = () => {
    navigate('/home');
  };

  const handleChangeExercise = () => {
    const currentIndex = exerciseTypes.indexOf(exerciseType);
    const nextIndex = (currentIndex + 1) % exerciseTypes.length;
    setExerciseType(exerciseTypes[nextIndex]);
    setCycleCount(0);
  };

  const getMascotMood = () => {
    if (phase === 'reward') return 'excited';
    if (phase === 'exercise') return 'relaxed';
    return 'happy';
  };

  const renderExercise = () => {
    const commonProps = {
      persona: preferences.persona,
      onCycleComplete: handleCycleComplete,
    };

    switch (exerciseType) {
      case 'balloon':
        return <BalloonExercise {...commonProps} />;
      case 'bubbles':
        return <BubblesExercise {...commonProps} />;
      case 'wave':
        return <WaveExercise {...commonProps} />;
      default:
        return <BreathingCircle {...commonProps} />;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">{contextoInfo.emoji}</span>
          <span className="font-semibold text-foreground">{contextoInfo.label}</span>
        </div>
        <button
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Intro Phase */}
        {phase === 'intro' && (
          <div className="flex flex-col items-center animate-fade-in">
            <BatatuMascot 
              size="lg" 
              persona={preferences.persona}
              mood="happy"
            />
            <div className="mt-6">
              <DialogBubble message={introMessage} tailPosition="top" />
            </div>
          </div>
        )}

        {/* Exercise Phase */}
        {phase === 'exercise' && (
          <div className="flex flex-col items-center animate-fade-in">
            {/* Batatu em posição lateral */}
            <div className="relative w-full flex justify-center mb-4">
              <div className="absolute -left-4 top-0">
                <BatatuMascot 
                  size="sm" 
                  persona={preferences.persona}
                  mood="relaxed"
                />
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-2">
                  {exerciseNames[exerciseType]}
                </span>
                <button
                  onClick={handleChangeExercise}
                  className="flex items-center gap-1 text-xs text-primary hover:underline mb-4"
                >
                  <Shuffle className="w-3 h-3" />
                  Trocar exercício
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <DialogBubble 
                message={duringMessage} 
                typing={false}
                tailPosition="top"
              />
            </div>

            {renderExercise()}

            <p className="mt-6 text-muted-foreground text-sm">
              {cycleCount < 4 ? `${4 - cycleCount} respirações restantes` : 'Finalizando...'}
            </p>
          </div>
        )}

        {/* Feedback Phase */}
        {phase === 'feedback' && (
          <div className="flex flex-col items-center animate-fade-in">
            <BatatuMascot 
              size="lg" 
              persona={preferences.persona}
              mood="happy"
            />
            
            <div className="mt-6 mb-8">
              <DialogBubble 
                message="Como você está se sentindo agora?"
                tailPosition="top"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleFeedback('worse')}
                className="flex-col h-auto py-4 px-6"
              >
                <ThumbsDown className="w-8 h-8 mb-2 text-muted-foreground" />
                <span className="text-sm">Pior</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleFeedback('same')}
                className="flex-col h-auto py-4 px-6"
              >
                <Meh className="w-8 h-8 mb-2 text-muted-foreground" />
                <span className="text-sm">Igual</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleFeedback('better')}
                className="flex-col h-auto py-4 px-6"
              >
                <ThumbsUp className="w-8 h-8 mb-2 text-primary" />
                <span className="text-sm">Melhor</span>
              </Button>
            </div>
          </div>
        )}

        {/* Reward Phase */}
        {phase === 'reward' && (
          <div className="flex flex-col items-center animate-fade-in">
            <BatatuMascot 
              size="xl" 
              persona={preferences.persona}
              mood="excited"
            />
            
            <div className="mt-6 mb-8">
              <DialogBubble message={rewardMessage} tailPosition="top" />
            </div>

            <div className="space-y-3 w-full max-w-sm">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleClose}
              >
                Valeu, Batatu! 💚
              </Button>
              
              {feedback !== 'better' && (
                <Button
                  variant="hero-secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setCycleCount(0);
                    setPhase('exercise');
                  }}
                >
                  Quero tentar mais uma vez
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
