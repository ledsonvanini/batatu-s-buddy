/**
 * NarrativeGuide - Sistema de diálogo narrativo do Batatu durante exercícios
 * Sincroniza falas com as fases de respiração
 */
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BatatuMascot } from '@/components/BatatuMascot';
import { DialogBubble } from '@/components/DialogBubble';
import type { Persona, Contexto } from '@/data/phrases';

type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out' | 'idle';

interface NarrativeGuideProps {
  persona: Persona;
  contexto?: Contexto;
  phase: BreathPhase;
  cycleCount: number;
  isActive?: boolean;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  size?: 'sm' | 'md';
}

// Frases por fase de respiração
const PHASE_MESSAGES: Record<BreathPhase, Record<Persona, string[]>> = {
  inhale: {
    empolgado: [
      'Puxa o ar com força! 💪',
      'Enche o pulmão!',
      'Inspira... sente a energia entrando!',
      'Puxa como se fosse seu último fôlego de coragem!',
    ],
    ouvinte: [
      'Inspira devagar...',
      'Deixa o ar entrar com calma...',
      'Sente o ar preenchendo você...',
      'Respira... você está seguro aqui.',
    ],
    conselheiro: [
      'Inspira pelo nariz...',
      'Puxa o ar, conta mentalmente...',
      'Enche o peito de ar limpo.',
      'Foco na entrada do ar.',
    ],
  },
  'hold-in': {
    empolgado: [
      'Segura aí! 🔒',
      'Mantém o ar dentro...',
      'Aguenta firme!',
      'Pausa... sente a energia!',
    ],
    ouvinte: [
      'Segura um pouquinho...',
      'Fica aqui comigo...',
      'Pausa suave...',
      'Só mais um instante...',
    ],
    conselheiro: [
      'Retém o ar...',
      'Mantém a pausa...',
      'Controle é a chave.',
      'Segura... estabiliza.',
    ],
  },
  exhale: {
    empolgado: [
      'Solta tudo! 🌊',
      'Joga fora o peso!',
      'Deixa ir... libera!',
      'Expira como se soltasse todo o estresse!',
    ],
    ouvinte: [
      'Solta devagar...',
      'Deixa ir com calma...',
      'Libera suavemente...',
      'O ar leva embora o que não precisa mais...',
    ],
    conselheiro: [
      'Expira pela boca...',
      'Solta controlado...',
      'Esvazia os pulmões...',
      'Libera o ar lentamente.',
    ],
  },
  'hold-out': {
    empolgado: [
      'Pausa rápida! ⏸️',
      'Espera um tiquinho...',
      'Antes de puxar de novo...',
      'Quase lá!',
    ],
    ouvinte: [
      'Descansa um segundo...',
      'Fica na pausa...',
      'Momento de silêncio...',
      'Só existe agora.',
    ],
    conselheiro: [
      'Pausa antes de recomeçar...',
      'Espera... e prepara.',
      'Mantém vazio um instante.',
      'Reset... e vai de novo.',
    ],
  },
  idle: {
    empolgado: [
      'Bora começar! 🚀',
      'Preparado?',
      'Quando quiser!',
    ],
    ouvinte: [
      'Estou aqui com você.',
      'No seu tempo...',
      'Respira comigo.',
    ],
    conselheiro: [
      'Foco na respiração.',
      'Vamos lá.',
      'Atenção plena.',
    ],
  },
};

// Mensagens de incentivo por ciclo
const CYCLE_MESSAGES: Record<Persona, string[]> = {
  empolgado: [
    'Primeiro ciclo! Tá indo bem! 🎯',
    'Segundo! Mantém o ritmo! 💪',
    'Terceiro! Você é craque! 🌟',
    'Último ciclo! Bora fechar com chave de ouro! 🏆',
  ],
  ouvinte: [
    'Um ciclo... você está conseguindo.',
    'Dois ciclos... continue assim.',
    'Três ciclos... quase lá.',
    'Último ciclo... orgulho de você.',
  ],
  conselheiro: [
    'Ciclo 1 completo. Continue.',
    'Ciclo 2. Bom progresso.',
    'Ciclo 3. Mantenha o foco.',
    'Ciclo final. Termine forte.',
  ],
};

// Helper para pegar mensagem aleatória
function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Determinar mood do Batatu baseado na fase
function getMoodForPhase(phase: BreathPhase): 'happy' | 'relaxed' | 'thinking' | 'excited' {
  switch (phase) {
    case 'inhale': return 'happy';
    case 'hold-in': return 'thinking';
    case 'exhale': return 'relaxed';
    case 'hold-out': return 'thinking';
    default: return 'happy';
  }
}

export function NarrativeGuide({
  persona,
  phase,
  cycleCount,
  isActive = true,
  position = 'bottom-left',
  size = 'sm',
}: NarrativeGuideProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [showCycleMessage, setShowCycleMessage] = useState(false);
  const [lastCycle, setLastCycle] = useState(-1);
  
  // Atualizar mensagem quando a fase muda
  useEffect(() => {
    if (!isActive) return;
    
    const messages = PHASE_MESSAGES[phase]?.[persona] || PHASE_MESSAGES.idle[persona];
    setCurrentMessage(getRandomMessage(messages));
  }, [phase, persona, isActive]);
  
  // Mostrar mensagem de ciclo quando completa
  useEffect(() => {
    if (cycleCount > lastCycle && cycleCount > 0 && cycleCount <= 4) {
      setLastCycle(cycleCount);
      setShowCycleMessage(true);
      
      // Esconder após 2 segundos
      const timer = setTimeout(() => {
        setShowCycleMessage(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [cycleCount, lastCycle]);
  
  const cycleMessage = useMemo(() => {
    if (cycleCount > 0 && cycleCount <= 4) {
      return CYCLE_MESSAGES[persona][cycleCount - 1];
    }
    return '';
  }, [cycleCount, persona]);
  
  const mood = getMoodForPhase(phase);
  
  // Position classes
  const positionClasses = {
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
  };
  
  const bubblePosition = position.includes('top') ? 'bottom' : 'top';
  
  if (!isActive) return null;
  
  return (
    <div className={`absolute ${positionClasses[position]} z-20 pointer-events-none`}>
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cycle completion message overlay */}
        <AnimatePresence>
          {showCycleMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm rounded-full shadow-lg">
                {cycleMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Batatu mascot */}
        <motion.div
          animate={{
            scale: phase === 'inhale' ? [1, 1.05, 1] : phase === 'exhale' ? [1, 0.95, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BatatuMascot 
            size={size} 
            persona={persona} 
            mood={mood}
          />
        </motion.div>
        
        {/* Dialog bubble with phase instruction */}
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[180px]"
        >
          <div 
            className={`
              px-3 py-2 rounded-2xl text-xs font-medium text-center
              bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm
              shadow-lg border border-black/5
              ${bubblePosition === 'top' ? 'dialog-bubble tail-top' : 'dialog-bubble tail-bottom'}
            `}
            style={{ color: 'var(--text)' }}
          >
            {currentMessage}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NarrativeGuide;
