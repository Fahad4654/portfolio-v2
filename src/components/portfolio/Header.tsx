
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "@/assets/pp.jpeg";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";

export const Header = ({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
}) => {
  return (
    <div className={cn("shrink-0", isCollapsed ? "px-2" : "text-center")}>
      <div
        className={cn(
          "flex items-center justify-center relative",
          !isCollapsed && "flex-col"
        )}
      >
        <Avatar
          className={cn(
            "mx-auto mb-3 border-4 border-primary/20 shadow-lg transition-all duration-300",
            isCollapsed ? "w-12 h-12 mb-0" : "w-24 h-24"
          )}
        >
          <AvatarImage src={profilePic.src} alt="Profile Picture" />
          <AvatarFallback>FK</AvatarFallback>
        </Avatar>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-0 rounded-full z-20",
            isCollapsed ? "right-0 translate-x-1/2" : "right-0"
          )}
          onClick={onToggleCollapse}
        >
          {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
        </Button>
      </div>

      <div
        className={cn(
          "transition-opacity duration-300 mt-3",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}
      >
        <h1 className="text-xl font-bold text-foreground font-headline">
          FAHAD KABIR
        </h1>
        <p className="text-sm text-primary">DevOps Engineer</p>
      </div>
    </div>
  );
};
