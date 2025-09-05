
"use client";

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  startAnimation?: boolean;
}

export function TypingAnimation({ text, className, speed = 50, startAnimation = false }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startAnimation) {
      let i = 0;
      setIsAnimating(true);
      timer = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(timer);
          setIsAnimating(false);
        }
      }, speed);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [text, speed, startAnimation]);

  return (
    <h1 className={className}>
      {displayedText}
      {isAnimating && <span className="inline-block w-[2px] h-full bg-primary animate-ping ml-1" />}
    </h1>
  );
}
