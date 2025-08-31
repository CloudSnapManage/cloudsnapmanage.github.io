"use client";

import { useState, useEffect } from 'react';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-0 h-96 w-96 rounded-full 
                 transition-transform duration-300 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%)',
        filter: 'blur(100px)',
      }}
    />
  );
}
