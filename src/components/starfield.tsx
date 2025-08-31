
"use client";

import React, { useRef, useEffect } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
};

interface StarfieldProps {
  scrollTop: number;
}

export function Starfield({ scrollTop }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const mouseMovingRef = useRef<boolean>(false);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>();

  const STAR_COUNT = 800;
  const STAR_COLOR = "#FFFFFF";
  const STAR_SIZE = 3;
  const ATTRACTION_FORCE = 0.05; // Reduced from 0.5 for a more subtle effect

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * rect.width - rect.width / 2,
          y: Math.random() * rect.height - rect.height / 2,
          z: Math.random() * rect.width,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseMovingRef.current = true;
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
      mouseMoveTimeoutRef.current = setTimeout(() => {
        mouseMovingRef.current = false;
      }, 100);
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      const { x: mouseX, y: mouseY } = mouseRef.current;

      starsRef.current.forEach(star => {
        star.z -= 0.2;

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        const k = 128 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;
        
        if (mouseMovingRef.current) {
            const dxToMouse = mouseX - px;
            const dyToMouse = (mouseY - scrollTop) - py; // Adjust mouse Y for parallax
            const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
            
            if (distToMouse < 200) {
                const angle = Math.atan2(dyToMouse, dxToMouse);
                const force = (200 - distToMouse) * ATTRACTION_FORCE;
                star.x += Math.cos(angle) * force / k;
                star.y += Math.sin(angle) * force / k;
            }
        }

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * STAR_SIZE;
          const dx = px - mouseX;
          const dy = py - (mouseY - scrollTop);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.min(1, 0.7 + Math.max(0, 0.7 - dist / 400));

          ctx.fillStyle = STAR_COLOR;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(px, py, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize, false);
    document.addEventListener('mousemove', onMouseMove);
    onResize(); // Initial call to set size and stars
    animate();

    return () => {
      window.removeEventListener('resize', onResize, false);
      document.removeEventListener('mousemove', onMouseMove);
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scrollTop]); // Rerun effect if scrollTop changes

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full bg-transparent"
          style={{ transform: `translateY(${-scrollTop * 0.4}px)` }}
        />
    </div>
  );
}
