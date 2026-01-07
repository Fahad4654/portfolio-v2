"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "@/assets/pp.jpeg";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Header = ({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
}) => {
  const avatar = (
    <Avatar
      className={cn(
        "mx-auto border-4 border-primary/20 shadow-lg transition-all duration-300",
        isCollapsed ? "w-12 h-12" : "w-24 h-24 mb-3"
      )}
    >
      <AvatarImage src={profilePic.src} alt="Profile Picture" />
      <AvatarFallback>FK</AvatarFallback>
    </Avatar>
  );

  return (
    <div className={cn("shrink-0", isCollapsed ? "px-2" : "text-center")}>
      <div
        className={cn(
          "flex items-center justify-center relative",
          isCollapsed ? "flex-col gap-2" : "flex-col"
        )}
      >
        <div className={cn("relative", isCollapsed ? "" : "w-full")}>
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>{avatar}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  <div className="text-center">
                    <h1 className="text-base font-bold text-foreground font-headline">
                      FAHAD KABIR
                    </h1>
                    <p className="text-xs text-primary">DevOps Engineer</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            avatar
          )}

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-0 rounded-full z-20",
                "right-0"
              )}
              onClick={onToggleCollapse}
            >
              <PanelLeftClose />
            </Button>
          )}
        </div>

        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full z-20"
            onClick={onToggleCollapse}
          >
            <PanelRightClose />
          </Button>
        )}
      </div>

      <div
        className={cn(
          "transition-opacity duration-300 mt-3",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}
      >
        <h1 className="text-2xl font-bold text-foreground font-headline">
          FAHAD KABIR
        </h1>
        <p className="text-sm text-primary">DevOps Engineer</p>
      </div>
    </div>
  );
};
