
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
    const timeouts: NodeJS.Timeout[] = [];
    let delay = 200;
    
    bootLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
           const typingTimeout = setTimeout(() => setShowTyping(true), 150);
           timeouts.push(typingTimeout);
        }
      }, (index + 1) * delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const renderLine = (line: string) => {
    if (line.includes("[  OK  ]")) {
      const parts = line.split(/(\[  OK  \])/);
      return parts.map((part, i) => {
        if (part === "[  OK  ]") {
          return (
            <span key={i}>
              [<span className="text-green-500">  OK  </span>]
            </span>
          );
        }
        return part;
      });
    }
    return line;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background font-code">
      <div className="w-full max-w-xl p-4">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {renderLine(line)}
              {index === lines.length -1 && !showTyping && <span className="animate-pulse">_</span>}
            </p>
          </div>
        ))}
        {showTyping && (
           <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground typing-text">WELCOME TO FAHAD KABIR'S PORTFOLIO...</p>
          </div>
        )}
      </div>
    </div>
  );
}
    
