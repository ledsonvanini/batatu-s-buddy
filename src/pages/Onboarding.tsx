import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { PersonaSelector } from '@/components/PersonaSelector';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Persona } from '@/data/phrases';
import { PERSONAS_INFO } from '@/data/phrases';

type Step = 'name' | 'persona' | 'tutorial';

const tutorialSteps = [
  "Você escolhe como está se sentindo.",
  "A gente faz um exercício curtinho juntos.",
  "Eu te acompanho e guardo seu progresso! 🎮"
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
    if (step === 'name') return 'Opa! Como posso te chamar? 🙂';
    if (step === 'persona') return `Legal, ${name}! Agora escolhe como você quer que eu seja:`;
    if (step === 'tutorial') return tutorialSteps[tutorialStep];
    return '';
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <main className="flex-1 flex flex-col items-center px-6 py-8 relative z-10">
        {/* Back button */}
        {step !== 'name' && (
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </button>
        )}

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {['name', 'persona', 'tutorial'].map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === s ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Mascot */}
        <div className="mb-6">
          <BatatuMascot 
            size="lg" 
            persona={persona}
            mood={step === 'tutorial' ? 'happy' : 'neutral'}
          />
        </div>

        {/* Dialog - bubble comes from Batatu */}
        <div className="mb-8">
          <DialogBubble 
            message={getDialogMessage()}
            key={`${step}-${tutorialStep}`}
            tailPosition="top"
          />
        </div>

        {/* Content based on step */}
        <div className="w-full max-w-sm">
          {step === 'name' && (
            <div className="space-y-4 animate-fade-in">
              <Input
                type="text"
                placeholder="Seu nome ou apelido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="h-14 text-lg text-center rounded-2xl border-2 focus:border-primary"
                maxLength={20}
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleNameSubmit}
                disabled={!name.trim()}
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'persona' && (
            <div className="space-y-6 animate-fade-in">
              <PersonaSelector
                selected={persona}
                onSelect={setPersona}
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handlePersonaSubmit}
              >
                Esse é o meu estilo!
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'tutorial' && (
            <div className="space-y-6 animate-fade-in">
              {/* Tutorial step indicator */}
              <div className="flex justify-center gap-3">
                {tutorialSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-1 rounded-full transition-colors ${
                      i <= tutorialStep ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleTutorialNext}
              >
                {tutorialStep < tutorialSteps.length - 1 ? 'Próximo' : 'Bora começar!'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
