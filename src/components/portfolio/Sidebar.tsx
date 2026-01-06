
"use client";

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavLinks } from './NavLinks';
import { Section } from '@/app/page';
import { Header } from './Header';

export const Sidebar = ({
  activeSection,
  onLinkClick,
  isMobile = false,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isMobile?: boolean;
}) => {
  const commonContent = (
    <>
      <Header />
      <div className="mt-10 flex-1 flex flex-col min-h-0">
        <NavLinks
          activeSection={activeSection}
          onLinkClick={onLinkClick}
        />
      </div>
      <div className="text-center shrink-0 mt-6">
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
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-full p-6 bg-card/50">
        <Header />
        <div className="mt-10 flex-1 min-h-0">
          <ScrollArea className="h-full pr-4 -mr-4">
            <NavLinks
              activeSection={activeSection}
              onLinkClick={onLinkClick}
            />
          </ScrollArea>
        </div>
        <div className="text-center shrink-0 mt-6">
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
  }

  return <div className="flex flex-col h-full p-6 bg-card/50">{commonContent}</div>;
};
