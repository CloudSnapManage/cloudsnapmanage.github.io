
"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

// --- Configuration ---
const LERP_FACTOR = 0.1; // Determines how quickly the scroll catches up. Lower is slower/smoother.
const SCROLL_MULTIPLIER = 1; // Adjusts the overall scroll distance per wheel event.

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
  onScroll?: (scrollTop: number) => void;
}

export function SmoothScroll({ children, className, onScroll }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  // Store scroll positions and animation frame ID in refs to persist between renders
  const scrollData = useRef({
    current: 0,
    target: 0,
    animationFrameId: 0,
  });

  useEffect(() => {
    // This check runs only on the client.
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touchDevice);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); // Prevent default browser scroll
    
    // Update target scroll position
    scrollData.current.target += e.deltaY * SCROLL_MULTIPLIER;

    // Clamp the target to be within the scrollable bounds
    if (contentRef.current && containerRef.current) {
      const maxScroll = contentRef.current.scrollHeight - containerRef.current.clientHeight;
      scrollData.current.target = Math.max(0, Math.min(scrollData.current.target, maxScroll));
    }
  }, []);

  const smoothScroll = useCallback(() => {
    const { current, target } = scrollData.current;

    // Linearly interpolate the current scroll position towards the target
    const newCurrent = current + (target - current) * LERP_FACTOR;
    scrollData.current.current = newCurrent;

    // Apply the transform to the content element
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(-${newCurrent}px)`;
    }

    // Inform parent component of the new scroll position
    if (onScroll) {
      onScroll(newCurrent);
    }

    // Continue the animation loop
    scrollData.current.animationFrameId = requestAnimationFrame(smoothScroll);
  }, [onScroll]);

  useEffect(() => {
    // If it's a touch device or check hasn't run, don't initialize custom scrolling
    if (isTouch) return;

    const container = containerRef.current;
    if (!container) return;
    
    // Attach the wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Start the animation loop
    scrollData.current.animationFrameId = requestAnimationFrame(smoothScroll);

    // Cleanup function
    return () => {
      container.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(scrollData.current.animationFrameId);
    };
  }, [isTouch, handleWheel, smoothScroll]);
  
  // While we're checking for touch, or if it is a touch device, use native scrolling.
  if (isTouch !== false) {
      return (
          <div className="w-full h-full overflow-y-auto" onScroll={(e) => onScroll && onScroll(e.currentTarget.scrollTop)}>
              {children}
          </div>
      )
  }

  return (
    <div
      ref={containerRef}
      className={cn("fixed top-0 left-0 w-full h-full overflow-hidden", className)}
    >
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
