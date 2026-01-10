import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: width / 2, y: height / 2, isActive: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      baseOpacity: number;
      vx: number;
      vy: number;
      friction: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Size between 0.5 and 2
        this.baseOpacity = Math.random() * 0.4 + 0.1; // Base opacity between 0.1 and 0.5
        this.opacity = this.baseOpacity;
        this.vx = (Math.random() - 0.5) * 0.3; // Slow random movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.friction = 0.96; // Damping to prevent infinite acceleration
      }

      update() {
        // Attraction to mouse
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          if (distance < maxDist) {
            // Calculate force (stronger when closer, but capped)
            const force = (maxDist - distance) / maxDist; // 0 to 1
            const attractionStrength = 0.03; // Subtle attraction factor

            // Apply force to velocity (acceleration)
            this.vx += (dx / distance) * force * attractionStrength;
            this.vy += (dy / distance) * force * attractionStrength;

            // Increase opacity based on proximity
            const opacityBoost = force * 0.6;
            this.opacity = Math.min(1, this.baseOpacity + opacityBoost);
          } else {
            // Return to base opacity slowly
            if (this.opacity > this.baseOpacity) {
                this.opacity -= 0.01;
            }
          }
        } else {
             // Return to base opacity
             if (this.opacity > this.baseOpacity) {
                this.opacity -= 0.01;
            }
        }

        // Apply Velocity
        this.x += this.vx;
        this.y += this.vy;

        // Friction (gradually slow down from attraction bursts)
        // We ensure minimum movement so they don't stop completely
        if (Math.abs(this.vx) > 0.2 || Math.abs(this.vy) > 0.2) {
             this.vx *= this.friction;
             this.vy *= this.friction;
        }

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create star array
    const stars = Array.from({ length: 150 }, () => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default StarField;