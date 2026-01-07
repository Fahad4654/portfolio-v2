
"use client";

import React, { useRef, useEffect } from 'react';

export const DigitalRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setupCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            
            return {
                width: rect.width,
                height: rect.height,
                columns: Math.floor(rect.width / fontSize),
            };
        };
        
        const fontSize = 16;
        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersArray = characters.split('');

        let { width, height, columns } = setupCanvas();

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
                
                // Style for the falling characters (the trail)
                ctx.fillStyle = '#0f0'; // Brighter green for the trail
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // The leading character is drawn brighter/whiter
                if (drops[i] * fontSize < height) {
                     ctx.fillStyle = '#cfc'; // Light green/white for the lead
                     ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                }

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const intervalId = setInterval(draw, 33);

        const handleResize = () => {
            const newDims = setupCanvas();
            width = newDims.width;
            height = newDims.height;
            columns = newDims.columns;
            
            drops.length = 0; // Clear existing drops
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial call to set dimensions correctly
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(intervalId);
        };

    }, []);

    return <canvas id="digital-rain-canvas" ref={canvasRef}></canvas>;
};
