
"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose, Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInfo } from "@/context/InfoContext";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from '@/context/AuthContext';
import { EditInfoDialog } from './EditInfoDialog';


export const Header = ({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
}) => {
  const { info, loading } = useInfo();
  const { isLoggedIn } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading || !info) {
    return (
      <div className={cn("shrink-0", isCollapsed ? "px-2 pt-4" : "text-center")}>
         <div className={cn("relative", isCollapsed ? "" : "w-full")}>
            <Skeleton className={cn("mx-auto border-4 border-primary/20 shadow-lg rounded-full", isCollapsed ? "w-12 h-12" : "w-24 h-24 mb-3")} />
          </div>
          <div className={cn("transition-opacity duration-300 mt-3", isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
              <Skeleton className="h-7 w-36 mx-auto mb-2" />
              <Skeleton className="h-5 w-28 mx-auto" />
          </div>
      </div>
    )
  }

  const avatar = (
     <Avatar
      className={cn(
        "mx-auto border-4 border-primary/20 shadow-lg transition-all duration-300",
        isCollapsed ? "w-12 h-12" : "w-24 h-24 mb-3"
      )}
    >
      <AvatarImage src={info.profile_pic_url} alt="Profile Picture" />
      <AvatarFallback>{info.name.substring(0,2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );

  const avatarAndEditButton = (
    <div className="relative group mx-auto w-24 h-24 mb-3">
       <Avatar
        className={cn(
          "mx-auto border-4 border-primary/20 shadow-lg transition-all duration-300 w-full h-full"
        )}
      >
        <AvatarImage src={info.profile_pic_url} alt="Profile Picture" />
        <AvatarFallback>{info.name.substring(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {isLoggedIn && !isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-0 right-0 z-10 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
    </div>
  );


  return (
    <>
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
                    <p className="text-base text-foreground">{info.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              avatarAndEditButton
            )}

            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-0 right-0 z-20 h-8 w-8 rounded-full border shadow-sm",
                  "hidden md:flex items-center justify-center bg-background hover:bg-accent",
                  "translate-x-1/4 -translate-y-1/4" // This centers the button on the top-right edge
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
            {info.name}
          </h1>
          <p className="text-sm text-primary">{info.profession}</p>
        </div>
      </div>
      {isLoggedIn && (
        <EditInfoDialog 
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </>
  );
};
