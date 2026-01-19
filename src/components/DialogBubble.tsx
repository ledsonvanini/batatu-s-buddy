/**
 * DialogBubble - Balão de diálogo gaming com typing effect
 */
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface DialogBubbleProps {
  message: string;
  className?: string;
  typing?: boolean;
  typingSpeed?: number;
  showTail?: boolean;
  tailPosition?: 'bottom' | 'top';
}

export function DialogBubble({
  message,
  className,
  typing = true,
  typingSpeed = 30,
  showTail = true,
  tailPosition = 'bottom',
}: DialogBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(typing);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!typing) {
      setDisplayedText(message);
      return;
    }

    setDisplayedText('');
    indexRef.current = 0;
    setIsTyping(true);

    const interval = setInterval(() => {
      if (indexRef.current < message.length) {
        const currentChar = message.charAt(indexRef.current);
        setDisplayedText(prev => prev + currentChar);
        indexRef.current++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message, typing, typingSpeed]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        'dialog-bubble',
        tailPosition === 'top' && 'tail-top',
        tailPosition === 'bottom' && 'tail-bottom',
        className
      )}
    >
      <p className="text-base font-medium leading-relaxed text-center" style={{ color: 'var(--text)' }}>
        {displayedText}
        {isTyping && (
          <motion.span 
            className="inline-block w-[3px] h-5 ml-1 rounded-sm"
            style={{ background: 'var(--primary)' }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </p>
    </motion.div>
  );
}

export default DialogBubble;
