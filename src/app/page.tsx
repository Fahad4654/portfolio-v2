"use client";

import React from "react";
import {
  Menu,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

import LoadingScreen from "@/components/loading-screen";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { ProfileSection } from "@/components/portfolio/ProfileSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { User, Shapes, GraduationCap, BriefcaseBusiness, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type Section = "profile" | "skills" | "experience" | "portfolio" | "education";

export const links: { id: Section; icon: React.ElementType; text: string }[] = [
  { id: "profile", icon: User, text: "Personal Info" },
  { id: "skills", icon: Shapes, text: "Technical Skills" },
  { id: "education", icon: GraduationCap, text: "Education" },
  { id: "experience", icon: BriefcaseBusiness, text: "Work Experience" },
  { id: "portfolio", icon: FileText, text: "Projects" },
];


const Page = () => {
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTo(0, 0);
    }
  }, [activeSection]);

  const handleLinkClick = (section: Section) => {
    setActiveSection(section);
    setIsSheetOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className={cn(
        "hidden md:block fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-10",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <Sidebar
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      <main className={cn(
        "flex-1 relative flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "md:ml-20" : "md:ml-72"
        )}>
        <div className="md:hidden fixed bottom-6 right-6 z-20">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="rounded-full h-16 w-16 shadow-lg shadow-primary/30"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 border-r-0">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SheetClose asChild>
                <Sidebar
                  activeSection={activeSection}
                  onLinkClick={handleLinkClick}
                  isMobile
                  onToggleCollapse={() => {}}
                />
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
        <div
          key={activeSection}
          ref={contentAreaRef}
          className="overflow-y-auto flex-1 animate-slide-in"
        >
          <div className="container mx-auto px-6 py-16 md:px-12 md:py-24">
            {activeSection === "profile" && <ProfileSection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "experience" && <ExperienceSection />}
            {activeSection === "portfolio" && <ProjectsSection />}
            {activeSection === "education" && <EducationSection />}

            <footer className="py-8 border-t border-border/20 mt-24 md:mt-32">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Fahad Kabir. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;
