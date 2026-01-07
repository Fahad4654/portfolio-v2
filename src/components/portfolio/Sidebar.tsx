
"use client";

import React from 'react';
import { Github, Linkedin, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { Section } from '@/app/page';
import { Header } from './Header';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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
      <div className={cn("relative flex flex-col h-full p-6 bg-card/50", isCollapsed && !isMobile && "p-2 pt-6")}>
        {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full z-20"
              onClick={onToggleCollapse}
            >
              {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
            </Button>
        )}
        
        <Header isCollapsed={isCollapsed && !isMobile} />
        
        <ScrollArea className="flex-1 mt-8">
          <NavLinks
            activeSection={activeSection}
            onLinkClick={onLinkClick}
            isCollapsed={isCollapsed && !isMobile}
          />
        </ScrollArea>
        
        <div className={cn("text-center shrink-0 mt-6", isCollapsed && !isMobile ? "sr-only" : "")}>
           <Separator className="my-4" />
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Fahad4654"
              target="_blank"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/fahad-kabir-6559211a8"
              target="_blank"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
    </div>
  );

  return content;
};
