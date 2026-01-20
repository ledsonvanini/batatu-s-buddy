/**
 * GameCard - Wrapper visual para jogos de respiração
 * Estilo gaming imersivo com alto contraste
 */
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GameCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'dark' | 'light' | 'gradient';
  className?: string;
}

export function GameCard({ 
  children, 
  title, 
  subtitle,
  variant = 'dark',
  className = '' 
}: GameCardProps) {
  const variants = {
    dark: 'bg-slate-900 text-white',
    light: 'bg-white text-slate-900 dark:bg-slate-800 dark:text-white',
    gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
  };
  
  return (
    <motion.div
      className={`
        relative rounded-3xl overflow-hidden
        border-2 border-white/10
        shadow-2xl
        ${variants[variant]}
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h3 className="font-gaming font-bold text-xl mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm opacity-70">{subtitle}</p>
            )}
          </div>
        )}
        
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-3xl" />
    </motion.div>
  );
}
