
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
  const lastScrollTopRef = useRef(0);
  const velocityRef = useRef(0.2); // Current velocity
  const targetVelocityRef = useRef(0.2); // Target velocity to smoothly move towards

  const STAR_COUNT = 800;
  const STAR_COLOR = "#FFFFFF";
  const STAR_SIZE = 3;
  const ATTRACTION_FORCE = 0.5; // Constant force
  const ATTRACTION_RADIUS = 150;
  const BASE_SPEED = 0.2;
  const SCROLL_SPEED_FACTOR = 0.7;
  const LERP_FACTOR = 0.05; // Smoothing factor for velocity change

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          z: Math.random() * window.innerWidth,
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
      
      const scrollDelta = Math.abs(scrollTop - lastScrollTopRef.current);
      
      // Set the target velocity based on scroll speed
      targetVelocityRef.current = BASE_SPEED + scrollDelta * SCROLL_SPEED_FACTOR;

      // Smoothly interpolate the current velocity towards the target velocity
      velocityRef.current += (targetVelocityRef.current - velocityRef.current) * LERP_FACTOR;
      
      // Also, smoothly return to base speed when scrolling stops
      targetVelocityRef.current = BASE_SPEED + (targetVelocityRef.current - BASE_SPEED) * (1 - LERP_FACTOR);
      
      lastScrollTopRef.current = scrollTop;

      starsRef.current.forEach(star => {
        star.z -= velocityRef.current;

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
            const dyToMouse = mouseY - py;
            const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
            
            if (distToMouse < ATTRACTION_RADIUS) {
                const angle = Math.atan2(dyToMouse, dxToMouse);
                // Apply a small, constant force
                star.x += Math.cos(angle) * ATTRACTION_FORCE;
                star.y += Math.sin(angle) * ATTRACTION_FORCE;
            }
        }

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * STAR_SIZE;
          const dx = px - mouseX;
          const dy = py - mouseY;
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
  }, [scrollTop]); // Re-run effect if scrollTop changes to update the animate closure

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 bg-transparent"
        />
    </div>
  );
}
