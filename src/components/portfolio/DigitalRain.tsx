
"use client";

import React, { useRef, useEffect } from 'react';

export const DigitalRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersArray = characters.split('');
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);

        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
                
                // Style for the falling characters
                ctx.fillStyle = '#0f0'; // Brighter green
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Style for the leading character (brighter)
                if (drops[i] * fontSize < height) {
                    ctx.fillStyle = '#cfc'; // Light green/white
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }


                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const intervalId = setInterval(draw, 33); // Draw every ~30 FPS

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-initialize drops for new column count
            for (let x = 0; x < Math.floor(width / fontSize); x++) {
                drops[x] = 1;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(intervalId);
        };

    }, []);

    return <canvas id="digital-rain-canvas" ref={canvasRef}></canvas>;
};
