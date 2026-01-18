import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface DialogBubbleProps {
  message: string;
  className?: string;
  typing?: boolean;
  typingSpeed?: number;
}

export function DialogBubble({
  message,
  className,
  typing = true,
  typingSpeed = 30,
}: DialogBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(typing);

  useEffect(() => {
    if (!typing) {
      setDisplayedText(message);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(prev => prev + message[index]);
        index++;
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
        'dialog-bubble max-w-sm animate-pop',
        className
      )}
    >
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-5 bg-primary/60 ml-1 animate-pulse rounded-sm" />
        )}
      </p>
    </div>
  );
}

export default DialogBubble;
