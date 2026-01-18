import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { preferences, isLoaded } = useUserPreferences();
  const [mascotMood, setMascotMood] = useState<'neutral' | 'happy' | 'excited'>('neutral');

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <BatatuMascot size="lg" breathing />
      </div>
    );
  }

  if (preferences.hasCompletedOnboarding) {
    navigate('/home');
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Mascot */}
        <div 
          className="mb-6 animate-slide-up"
          onMouseEnter={() => setMascotMood('happy')}
          onMouseLeave={() => setMascotMood('neutral')}
        >
          <BatatuMascot 
            size="xl" 
            mood={mascotMood}
            onClick={() => setMascotMood('excited')}
          />
        </div>

        {/* Dialog bubble */}
        <div className="animate-slide-up-delay mb-8">
          <DialogBubble 
            message="Oi! Eu sou o Batatu, seu companheirinho de autocuidado. Bora cuidar de você um pouquinho? 💚"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
            Batatu
          </h1>
          <p className="text-lg text-muted-foreground max-w-xs mx-auto">
            Micro-momentos de calma para dias cheios
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button 
            variant="hero" 
            size="xl" 
            className="w-full group"
            onClick={() => navigate('/onboarding')}
          >
            <Sparkles className="w-5 h-5" />
            Começar agora
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="hero-secondary" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Já tenho conta
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-muted-foreground text-center max-w-xs animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Heart className="inline w-3 h-3 mr-1 text-primary" />
          Para autocuidado leve. Não substitui profissionais de saúde.
        </p>
      </main>
    </div>
  );
}
