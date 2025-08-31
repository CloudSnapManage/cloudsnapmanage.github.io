
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onResize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
      
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * 2 * canvas.offsetWidth - canvas.offsetWidth,
          y: Math.random() * 2 * canvas.offsetHeight - canvas.offsetHeight,
          z: Math.random() * canvas.offsetWidth,
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
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const { x: mouseX, y: mouseY } = mouseRef.current;

      starsRef.current.forEach(star => {
        star.z -= 0.2;

        if (star.z <= 0) {
          star.x = Math.random() * 2 * canvas.offsetWidth - canvas.offsetWidth;
          star.y = Math.random() * 2 * canvas.offsetHeight - canvas.offsetHeight;
          star.z = canvas.offsetWidth;
        }

        const k = 128 / star.z;
        const px = star.x * k + canvas.offsetWidth / 2;
        const py = star.y * k + canvas.offsetHeight / 2 - scrollTop; // Apply scroll offset
        
        if (mouseMovingRef.current) {
            const dxToMouse = mouseX - px;
            const dyToMouse = (mouseY - py) + scrollTop; // Adjust mouse Y for scroll
            const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
            
            if (distToMouse < 200) {
                const angle = Math.atan2(dyToMouse, dxToMouse);
                const force = (200 - distToMouse) * 0.01; 
                star.x += Math.cos(angle) * force / k;
                star.y += Math.sin(angle) * force / k;
            }
        }

        if (px >= 0 && px <= canvas.offsetWidth && py >= 0 && py <= canvas.offsetHeight) {
          const size = (1 - star.z / canvas.offsetWidth) * STAR_SIZE;
          const dx = px - mouseX;
          const dy = py - (mouseY + scrollTop);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.min(1, 0.5 + Math.max(0, 0.7 - dist / 400));

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
    onResize();
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
  }, [scrollTop]); // Rerun effect when scrollTop changes

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 bg-transparent"
        />
    </div>
  );
}
