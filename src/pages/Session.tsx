/**
 * Session - Tela de exercício v3.1
 * Inclui os 10 jogos de respiração premium
 */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import {
  X, Shuffle, ThumbsUp, Minus, ThumbsDown, Check,
  TrendingUp, Circle, Cloud, Box, Clock, Waves, Flame, Flower, Star, Triangle
} from 'lucide-react';
import type { Contexto } from '@/data/phrases';
import { getRandomPhrase, CONTEXTOS_INFO } from '@/data/phrases';

// Components
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { SceneryBackground } from '@/components/scenery';
import { ThemeToggle } from '@/components/shared';

// Games
import {
  RollerCoasterBreathing,
  ExpandingCircle,
  BalloonJourney,
  BoxBreathing,
  Relax478,
  OceanWave,
  PixelCandle,
  FlowerBloom,
  StarFocus,
  TriangleBalance
} from '@/components/exercises';

type SessionPhase = 'intro' | 'exercise' | 'feedback' | 'reward';
type ExerciseType =
  | 'rollercoaster'
  | 'circle'
  | 'balloon'
  | 'box'
  | 'relax478'
  | 'wave'
  | 'candle'
  | 'flower'
  | 'star'
  | 'triangle';

const exerciseTypes: ExerciseType[] = [
  'rollercoaster', 'circle', 'balloon', 'box', 'relax478',
  'wave', 'candle', 'flower', 'star', 'triangle'
];

const exerciseConfig: Record<ExerciseType, { name: string; Icon: any }> = {
  rollercoaster: { name: 'Montanha Russa', Icon: TrendingUp },
  circle: { name: 'Círculo Pulsante', Icon: Circle },
  balloon: { name: 'Jornada do Balão', Icon: Cloud },
  box: { name: 'Respiração Quadrada', Icon: Box },
  relax478: { name: 'Relax 4-7-8', Icon: Clock },
  wave: { name: 'Onda do Mar', Icon: Waves },
  candle: { name: 'Vela Pixel', Icon: Flame },
  flower: { name: 'Flor Desabrochando', Icon: Flower },
  star: { name: 'Foco Estelar', Icon: Star },
  triangle: { name: 'Equilíbrio Triangular', Icon: Triangle },
};

export default function Session() {
  const navigate = useNavigate();
  const { contexto } = useParams<{ contexto: Contexto }>();
  const { preferences, completeSession } = useUserPreferences();

  const [phase, setPhase] = useState<SessionPhase>('intro');
  const [cycleCount, setCycleCount] = useState(0);
  const [feedback, setFeedback] = useState<'better' | 'same' | 'worse' | null>(null);
  const [exerciseType, setExerciseType] = useState<ExerciseType>('rollercoaster');

  const currentContexto = (contexto as Contexto) || 'neutro';
  const contextoInfo = CONTEXTOS_INFO[currentContexto];

  const getMessage = (momento: 'intro' | 'durante' | 'recompensa') => {
    return getRandomPhrase(preferences.persona, currentContexto, momento);
  };

  const introMessage = useMemo(() => getMessage('intro'), []);
  const rewardMessage = useMemo(() => getMessage('recompensa'), []);

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => setPhase('exercise'), 3500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleCycleComplete = () => {
    setCycleCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 4) {
        setTimeout(() => setPhase('feedback'), 800);
      }
      return newCount;
    });
  };

  const handleFeedback = (value: 'better' | 'same' | 'worse') => {
    setFeedback(value);
    completeSession();
    setPhase('reward');
  };

  const handleClose = () => navigate('/home');

  const handleChangeExercise = () => {
    const currentIndex = exerciseTypes.indexOf(exerciseType);
    const nextIndex = (currentIndex + 1) % exerciseTypes.length;
    setExerciseType(exerciseTypes[nextIndex]);
    setCycleCount(0);
  };

  const handleContinue = () => {
    setCycleCount(0);
    setPhase('exercise');
    setFeedback(null);
  };

  const renderExercise = () => {
    const commonProps = {
      persona: preferences.persona,
      onCycleComplete: handleCycleComplete,
    };

    switch (exerciseType) {
      case 'rollercoaster': return <RollerCoasterBreathing {...commonProps} />;
      case 'circle': return <ExpandingCircle {...commonProps} />;
      case 'balloon': return <BalloonJourney {...commonProps} />;
      case 'box': return <BoxBreathing {...commonProps} />;
      case 'relax478': return <Relax478 {...commonProps} />;
      case 'wave': return <OceanWave {...commonProps} />;
      case 'candle': return <PixelCandle {...commonProps} />;
      case 'flower': return <FlowerBloom {...commonProps} />;
      case 'star': return <StarFocus {...commonProps} />;
      case 'triangle': return <TriangleBalance {...commonProps} />;
      default: return <RollerCoasterBreathing {...commonProps} />;
    }
  };

  const exerciseInfo = exerciseConfig[exerciseType];

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative">
      <SceneryBackground contexto={currentContexto} className="absolute inset-0 z-0" />

      {/* Header - Fixed & High Contrast */}
      <header className="absolute top-0 left-0 right-0 z-50 safe-top p-4 flex items-center justify-between">
        {/* Context Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm border border-black/5">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            {contextoInfo.label}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleClose}
            className="btn-icon"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-lg mx-auto relative z-10">

        {/* === INTRO PHASE === */}
        {phase === 'intro' && (
          <div className="flex flex-col items-center animate-fade-in">
            <BatatuMascot size="lg" persona={preferences.persona} mood="happy" />
            <div className="mt-6">
              <DialogBubble message={introMessage} tailPosition="top" />
            </div>
          </div>
        )}

        {/* === EXERCISE PHASE === */}
        {phase === 'exercise' && (
          <div className="flex flex-col items-center w-full animate-slide-up">

            {/* Exercise Controls - Always Visible */}
            <div className="flex items-center gap-3 mb-8 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-full backdrop-blur-sm shadow-sm border border-black/5">
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-light)] rounded-full text-[var(--color-primary)]">
                <exerciseInfo.Icon className="w-4 h-4" />
                <span className="text-xs font-bold">{exerciseInfo.name}</span>
              </div>
              <button
                onClick={handleChangeExercise}
                className="flex items-center gap-1.5 px-3 py-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Trocar</span>
              </button>
            </div>

            {/* Exercise Component Container */}
            <div className="w-full relative min-h-[320px] flex items-center justify-center">
              {/* Batatu Behind/Corner */}
              <div className="absolute bottom-[-20px] left-[-10px] scale-75 z-0 opacity-90 transition-opacity hover:opacity-100">
                <BatatuMascot size="sm" persona={preferences.persona} mood="relaxed" />
              </div>

              {/* The Exercise */}
              <div className="z-10 w-full">
                {renderExercise()}
              </div>
            </div>

            {/* Progress Dots */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="progress-dots">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`progress-dot ${i < cycleCount ? 'active' : ''}`} />
                ))}
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest opacity-70">
                Ciclo {cycleCount + 1}/4
              </span>
            </div>
          </div>
        )}

        {/* === FEEDBACK PHASE === */}
        {phase === 'feedback' && (
          <div className="flex flex-col items-center animate-slide-up bg-white/90 dark:bg-slate-800/90 p-8 rounded-[32px] shadow-xl backdrop-blur-md">
            <h3 className="text-xl font-bold mb-6 text-center">Como se sente?</h3>

            <div className="flex gap-4">
              <button onClick={() => handleFeedback('worse')} className="flex flex-col items-center gap-2 group p-2">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <ThumbsDown className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
                </div>
                <span className="text-xs font-medium text-slate-500">Pior</span>
              </button>

              <button onClick={() => handleFeedback('same')} className="flex flex-col items-center gap-2 group p-2">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Minus className="w-6 h-6 text-slate-400 group-hover:text-slate-600" />
                </div>
                <span className="text-xs font-medium text-slate-500">Igual</span>
              </button>

              <button onClick={() => handleFeedback('better')} className="flex flex-col items-center gap-2 group p-2">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ThumbsUp className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-xs font-bold text-[var(--color-primary)]">Melhor</span>
              </button>
            </div>
          </div>
        )}

        {/* === REWARD PHASE === */}
        {phase === 'reward' && (
          <div className="flex flex-col items-center animate-slide-up w-full max-w-xs">
            <div className="animate-bounce-soft mb-4">
              <BatatuMascot size="xl" persona={preferences.persona} mood="excited" />
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-bold mb-2">
              <Check className="w-4 h-4" />
              <span>Mandou bem!</span>
            </div>

            <div className="text-[var(--color-primary)] font-black text-2xl mb-6">
              +50 XP
            </div>

            <div className="mb-8 w-full">
              <DialogBubble message={rewardMessage} tailPosition="top" />
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={handleContinue}
                className="btn btn-cta w-full animate-pulse-glow"
              >
                Mais uma rodada?
              </button>

              <button
                onClick={handleClose}
                className="btn btn-ghost w-full"
              >
                Voltar pro início
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
