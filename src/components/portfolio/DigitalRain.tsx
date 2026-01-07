
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

    // Using a mix of symbols and characters similar to the image
    const characters = 'ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    let animationFrameId: number;

    const draw = () => {
      // 1. Background trail color (Dark Burgundy/Purple tint)
      // Changing the alpha (0.1) controls how long the trails stay visible
      ctx.fillStyle = 'rgba(40, 10, 30, 0.1)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // 2. Character Color
        // The image shows a mix of light blue/teal and white-ish characters
        const isBright = Math.random() > 0.95;
        ctx.fillStyle = isBright ? '#fff' : '#4fd1c5'; // Teal/Cyan color
        
        // 3. Subtle Glow (optional)
        if (isBright) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#4fd1c5';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      setCanvasSize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="digital-rain-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};
