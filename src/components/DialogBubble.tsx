import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

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
    <div
      className={cn(
        'relative bg-card rounded-3xl px-6 py-4 shadow-soft animate-pop max-w-sm',
        className
      )}
    >
      {/* Tail pointing to mascot */}
      {showTail && (
        <div 
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-0 h-0",
            tailPosition === 'top' && "-top-3 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-card",
            tailPosition === 'bottom' && "-bottom-3 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-card"
          )}
        />
      )}
      
      <p className="text-lg font-medium text-foreground leading-relaxed text-center">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-5 bg-primary/60 ml-1 animate-pulse rounded-sm" />
        )}
      </p>
    </div>
  );
}

export default DialogBubble;
