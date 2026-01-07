"use client";

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { Section } from '@/app/page';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export const Sidebar = ({
  activeSection,
  onLinkClick,
  isMobile = false,
  isCollapsed = false,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
}) => {
  const content = (
      <div className={cn("flex flex-col h-full p-6 bg-card/50", isCollapsed && !isMobile && "p-2 pt-6")}>
      <Header isCollapsed={isCollapsed && !isMobile} />
        <nav className="mt-10 flex-1 flex flex-col gap-4">
          <NavLinks
            activeSection={activeSection}
            onLinkClick={onLinkClick}
            isCollapsed={isCollapsed && !isMobile}
          />
        </nav>
      <div className={cn("text-center shrink-0 mt-6", isCollapsed && !isMobile ? "sr-only" : "")}>
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
