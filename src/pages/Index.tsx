/**
 * Index - Tela de boas-vindas gaming/imersiva
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Sparkles, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Index() {
  const navigate = useNavigate();
  const { preferences, isLoaded } = useUserPreferences();
  const [mascotMood, setMascotMood] = useState<'neutral' | 'happy' | 'excited'>('neutral');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-hero)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BatatuMascot size="lg" breathing />
        </motion.div>
      </div>
    );
  }

  if (preferences.hasCompletedOnboarding) {
    navigate('/home');
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col overflow-hidden relative"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'var(--primary-glow)', top: '10%', left: '-10%' }}
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--secondary-glow)', top: '30%', right: '-15%' }}
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'var(--accent-glow)', bottom: '10%', left: '20%' }}
          animate={{ 
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--text) 1px, transparent 1px),
            linear-gradient(90deg, var(--text) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {showContent && (
          <>
            {/* Mascot with glow effect */}
            <motion.div 
              className="relative mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setMascotMood('happy')}
              onMouseLeave={() => setMascotMood('neutral')}
            >
              {/* Glow behind mascot */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl animate-glow-pulse"
                style={{ background: 'var(--primary-glow)', transform: 'scale(1.2)' }}
              />
              <BatatuMascot 
                size="xl" 
                mood={mascotMood}
                onClick={() => setMascotMood('excited')}
              />
            </motion.div>

            {/* Dialog bubble */}
            <motion.div 
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DialogBubble 
                message="E aí! Sou o Batatu, seu parceiro de autocuidado. Bora relaxar juntos? 💚"
                tailPosition="top"
              />
            </motion.div>

            {/* Title */}
            <motion.div 
              className="text-center mb-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="font-gaming text-5xl md:text-6xl font-bold mb-3">
                <span className="text-gradient">Batatu</span>
              </h1>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                Micro-momentos de calma para dias cheios ✨
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="w-full max-w-sm space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button 
                className="btn-gaming w-full group"
                onClick={() => navigate('/onboarding')}
              >
                <Sparkles className="w-5 h-5" />
                Começar agora
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                className="btn-gaming btn-gaming-secondary w-full"
                onClick={() => navigate('/home')}
              >
                <Zap className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                Já tenho conta
              </button>
            </motion.div>

            {/* Footer note */}
            <motion.p 
              className="mt-10 text-xs text-center max-w-xs"
              style={{ color: 'var(--muted-text)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              💚 Para autocuidado leve. Não substitui profissionais de saúde.
            </motion.p>
          </>
        )}
      </main>
    </div>
  );
}
