
"use client";

import { useState, useEffect } from "react";

const bootLines = [
  "Checking file systems...",
  "[  OK  ] Started File System Check on Root Device.",
  "Mounting /sysroot...",
  "[  OK  ] Reached target Basic System.",
  "[  OK  ] Started udev Kernel Device Manager.",
  "fahad@portfolio:~$ ",
];

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let delay = 200;
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
           setTimeout(() => setShowTyping(true), 150);
        }
      }, (index + 1) * delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background font-code">
      <div className="w-full max-w-xl p-4">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {line}
              {index === lines.length -1 && !showTyping && <span className="animate-ping">_</span>}
            </p>
          </div>
        ))}
        {showTyping && (
           <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground typing-text">WELCOME TO FAHAD KABIR'S PORTFOLIO</p>
          </div>
        )}
      </div>
    </div>
  );
}
    
