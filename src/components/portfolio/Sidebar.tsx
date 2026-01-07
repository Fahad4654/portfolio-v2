
"use client";

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { Section } from '@/app/page';
import { Header } from './Header';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { ThemeToggle } from '../theme-toggle';

export const Sidebar = ({
  activeSection,
  onLinkClick,
  isMobile = false,
  isCollapsed = false,
  onToggleCollapse,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
}) => {
  const content = (
      <div className={cn("relative flex flex-col h-full p-4 bg-card", isCollapsed && !isMobile && "p-2 pt-4")}>
        
        <Header isCollapsed={isCollapsed && !isMobile} onToggleCollapse={onToggleCollapse} />
        
        <ScrollArea className="flex-1 mt-6">
          <NavLinks
            activeSection={activeSection}
            onLinkClick={onLinkClick}
            isCollapsed={isCollapsed && !isMobile}
          />
        </ScrollArea>
        
        <div className={cn("shrink-0 mt-4", isCollapsed && !isMobile ? "hidden" : "")}>
           <Separator className="my-3" />
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://github.com/Fahad4654"
              target="_blank"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/fahad-kabir-6559211a8"
              target="_blank"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <Separator orientation='vertical' className="h-5" />
            <ThemeToggle />
          </div>
        </div>

        {isCollapsed && !isMobile && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <Separator />
            <ThemeToggle />
          </div>
        )}
    </div>
  );

  return content;
};
