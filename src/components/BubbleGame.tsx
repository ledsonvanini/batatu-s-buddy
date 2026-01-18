import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { BatatuMascot } from './BatatuMascot';
import type { Persona } from '@/data/phrases';
import { X } from 'lucide-react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

interface BubbleGameProps {
  persona: Persona;
  onClose: () => void;
}

const bubbleColorOptions = [
  'bg-primary/70',
  'bg-secondary/70',
  'bg-accent/70',
  'bg-pink-400/70',
  'bg-yellow-400/70',
];

export function BubbleGame({ persona, onClose }: BubbleGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [batatuMood, setBatatuMood] = useState<'sad' | 'happy' | 'excited'>('sad');

  const spawnBubble = useCallback(() => {
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: 10 + Math.random() * 80,
      y: 100 + Math.random() * 20,
      size: 40 + Math.random() * 30,
      speed: 2 + Math.random() * 3,
      color: bubbleColorOptions[Math.floor(Math.random() * bubbleColorOptions.length)],
    };
    
    setBubbles(prev => [...prev, newBubble]);
  }, []);

  const popBubble = useCallback((id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= 10) {
        setBatatuMood('excited');
      } else if (newScore >= 5) {
        setBatatuMood('happy');
      }
      return newScore;
    });
  }, []);

  // Spawn bubbles periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (bubbles.length < 8) {
        spawnBubble();
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [bubbles.length, spawnBubble]);

  // Move bubbles up
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBubbles(prev => 
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -20) // Remove bubbles that went off screen
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-900/90 to-purple-900/90 backdrop-blur-sm overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Header */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-white/20 rounded-full px-4 py-2">
          <span className="text-white font-bold text-lg">Bolhas: {score}</span>
        </div>
      </div>

      {/* Batatu no fundo (precisa de ajuda!) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <BatatuMascot 
          persona={persona} 
          mood={batatuMood}
          size="lg"
          breathing={false}
        />
        <p className="text-center text-white/80 text-sm mt-2 animate-bounce">
          {batatuMood === 'sad' && 'Me ajuda a estourar as bolhas! 🫧'}
          {batatuMood === 'happy' && 'Isso! Continue! 🎉'}
          {batatuMood === 'excited' && 'Você é incrível! ✨'}
        </p>
      </div>

      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <button
          key={bubble.id}
          onClick={() => popBubble(bubble.id)}
          className={cn(
            'absolute rounded-full transition-all duration-100 cursor-pointer',
            'hover:scale-110 active:scale-75',
            bubble.color,
          )}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Bubble shine */}
          <div className="absolute top-2 left-3 w-3 h-3 bg-white/50 rounded-full" />
        </button>
      ))}

      {/* Victory message */}
      {score >= 15 && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50">
          <div className="bg-card rounded-3xl p-8 text-center animate-pop">
            <span className="text-4xl mb-4 block">🎊</span>
            <h2 className="text-2xl font-bold text-foreground mb-2">Você salvou o Batatu!</h2>
            <p className="text-muted-foreground mb-4">Incrível! Você estourou {score} bolhas!</p>
            <button
              onClick={onClose}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90"
            >
              Voltar ao app
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BubbleGame;
