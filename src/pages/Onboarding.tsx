/**
 * Onboarding - Fluxo de entrada gaming style
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { PersonaSelector } from '@/components/PersonaSelector';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { ArrowRight, ArrowLeft, Zap, Gamepad2, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Persona } from '@/data/phrases';

type Step = 'name' | 'persona' | 'tutorial';

const tutorialSteps = [
  { text: "Você escolhe como está se sentindo.", icon: Gamepad2 },
  { text: "A gente faz um exercício curtinho juntos.", icon: Zap },
  { text: "Eu te acompanho e guardo seu progresso! 🎮", icon: Trophy },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updatePreferences } = useUserPreferences();
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [persona, setPersona] = useState<Persona>('empolgado');
  const [tutorialStep, setTutorialStep] = useState(0);

  const handleNameSubmit = () => {
    if (name.trim()) {
      setStep('persona');
    }
  };

  const handlePersonaSubmit = () => {
    setStep('tutorial');
  };

  const handleTutorialNext = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      updatePreferences({
        userName: name.trim(),
        persona,
        hasCompletedOnboarding: true,
      });
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step === 'persona') setStep('name');
    else if (step === 'tutorial') {
      setTutorialStep(0);
      setStep('persona');
    }
  };

  const getDialogMessage = () => {
    if (step === 'name') return 'E aí! Como posso te chamar? 😎';
    if (step === 'persona') return `Show, ${name}! Agora escolhe meu estilo:`;
    if (step === 'tutorial') return tutorialSteps[tutorialStep].text;
    return '';
  };

  return (
    <div 
      className="min-h-screen flex flex-col overflow-hidden relative"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'var(--primary-glow)', top: '10%', left: '-10%' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'var(--secondary-glow)', bottom: '20%', right: '-15%' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <main className="flex-1 flex flex-col items-center px-6 py-8 relative z-10">
        {/* Back button */}
        {step !== 'name' && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="absolute top-6 left-6 p-2 rounded-full glass hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          </motion.button>
        )}

        {/* Progress dots */}
        <div className="flex gap-3 mb-8 mt-4">
          {['name', 'persona', 'tutorial'].map((s, i) => (
            <motion.div
              key={s}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: step === s ? '2rem' : '0.5rem',
                background: step === s ? 'var(--primary)' : 'var(--border)',
              }}
              layoutId={`progress-${i}`}
            />
          ))}
        </div>

        {/* Mascot with glow */}
        <motion.div 
          className="relative mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-2xl animate-glow-pulse"
            style={{ background: 'var(--primary-glow)', transform: 'scale(1.3)' }}
          />
          <BatatuMascot 
            size="lg" 
            persona={persona}
            mood={step === 'tutorial' ? 'excited' : 'happy'}
          />
        </motion.div>

        {/* Dialog */}
        <motion.div 
          className="mb-8"
          key={`${step}-${tutorialStep}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
        >
          <DialogBubble 
            message={getDialogMessage()}
            tailPosition="top"
          />
        </motion.div>

        {/* Content based on step */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {step === 'name' && (
              <motion.div 
                key="name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder="Seu nome ou apelido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className="h-14 text-lg text-center rounded-2xl font-medium"
                  style={{
                    background: 'var(--surface)',
                    border: '2px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  maxLength={20}
                />
                <button 
                  className="btn-gaming w-full"
                  onClick={handleNameSubmit}
                  disabled={!name.trim()}
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 'persona' && (
              <motion.div 
                key="persona"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <PersonaSelector
                  selected={persona}
                  onSelect={setPersona}
                />
                <button 
                  className="btn-gaming w-full"
                  onClick={handlePersonaSubmit}
                >
                  Esse é o meu estilo!
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 'tutorial' && (
              <motion.div 
                key="tutorial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Tutorial step icons */}
                <div className="flex justify-center gap-4">
                  {tutorialSteps.map((item, i) => {
                    const StepIcon = item.icon;
                    const isActive = i <= tutorialStep;
                    return (
                      <motion.div
                        key={i}
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: isActive ? 'var(--primary)' : 'var(--muted)',
                        }}
                        animate={{ scale: i === tutorialStep ? 1.1 : 1 }}
                      >
                        <StepIcon 
                          className="w-6 h-6" 
                          style={{ color: isActive ? 'white' : 'var(--muted-text)' }}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <button 
                  className="btn-gaming w-full"
                  onClick={handleTutorialNext}
                >
                  {tutorialStep < tutorialSteps.length - 1 ? 'Próximo' : 'Bora começar! 🚀'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
