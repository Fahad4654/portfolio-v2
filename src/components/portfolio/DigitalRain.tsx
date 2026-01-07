"use client";

import React, { useRef, useEffect } from 'react';

export const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // The image uses a mix of Latin, symbols, and numbers
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%!"\'#&_(),.;:?!\\|{}<>[]^~@';
    const fontSize = 15;
    // We increase density by reducing the column gap
    const columns = Math.floor(canvas.width / (fontSize - 2));
    
    // To get that "full screen" look from the start, we randomize initial Y positions
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; 
    }

    let animationFrameId: number;

    const draw = () => {
      // Background: Dark Plum/Burgundy with slight transparency for trails
      ctx.fillStyle = 'rgba(26, 5, 20, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Color Palette from your image: Teal/Cyan with occasional highlight
        const randomState = Math.random();
        if (randomState > 0.98) {
          ctx.fillStyle = '#ffffff'; // Occasional bright white
        } else if (randomState > 0.90) {
          ctx.fillStyle = '#b2f5ea'; // Very light teal
        } else {
          ctx.fillStyle = '#4fd1c5'; // Main Teal color
        }

        ctx.fillText(text, i * (fontSize - 2), drops[i] * fontSize);

        // Reset drop to top with randomness
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        
        // Slowing it down slightly to match the "static rain" feel
        drops[i] += 0.75; 
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => setCanvasSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1, 
        backgroundColor: '#1a0514',
        position: 'fixed'
      }}
    />
  );
};