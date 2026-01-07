
import { links, Section } from "@/app/page";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NavLinks = ({
  activeSection,
  onLinkClick,
  isCollapsed = false,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isCollapsed?: boolean;
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <nav className="flex flex-col gap-4">
        {links.map((link) => {
          const content = (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 text-muted-foreground hover:bg-primary/10 hover:text-primary",
                activeSection === link.id &&
                  "bg-primary/10 text-primary font-semibold",
                isCollapsed && "justify-center"
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              <span className={cn("transition-all duration-300", isCollapsed && "sr-only")}>{link.text}</span>
            </button>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  <p>{link.text}</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return content;
        })}
      </nav>
    </TooltipProvider>
  );
};
