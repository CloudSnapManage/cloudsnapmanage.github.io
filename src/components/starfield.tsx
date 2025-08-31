"use client";

import React, { useRef, useEffect } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
};

export function Starfield() {
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
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
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mouseX, y: mouseY } = mouseRef.current;

      starsRef.current.forEach(star => {
        // Move star
        star.z -= 0.2;

        // Recycle star
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = canvas.width;
        }

        // 3D to 2D projection
        const k = 128 / star.z;
        const px = star.x * k + (canvas.width / 2);
        const py = star.y * k + (canvas.height / 2);
        
        // Attraction to cursor
        if (mouseMovingRef.current) {
            const dxToMouse = mouseX - px;
            const dyToMouse = mouseY - py;
            const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
            
            if (distToMouse < 200) { // Only attract if close enough
                const angle = Math.atan2(dyToMouse, dxToMouse);
                // The force is stronger the closer the star is to the cursor
                const force = (200 - distToMouse) * 0.001;
                star.x += Math.cos(angle) * force / k;
                star.y += Math.sin(angle) * force / k;
            }
        }


        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * STAR_SIZE;
          const dx = px - mouseX;
          const dy = py - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.min(0.8, 0.1 + Math.max(0, 0.7 - dist / 400));

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
    onResize(); // Initial setup
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
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 bg-transparent"
    />
  );
}