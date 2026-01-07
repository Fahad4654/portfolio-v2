
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "@/assets/pp.jpeg";
import { cn } from "@/lib/utils";


export const Header = ({ isCollapsed }: { isCollapsed?: boolean }) => {
    return (
        <div className={cn("text-center shrink-0", isCollapsed && "px-1 pt-12")}>
            <Avatar className={cn(
                "w-24 h-24 mx-auto mb-3 border-4 border-primary/20 shadow-lg transition-all duration-300",
                isCollapsed && "w-12 h-12"
            )}>
            <AvatarImage src={profilePic.src} alt="Profile Picture" />
            <AvatarFallback>FK</AvatarFallback>
            </Avatar>
            <div className={cn("transition-opacity duration-300", isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
                <h1 className="text-xl font-bold text-foreground font-headline">
                FAHAD KABIR
                </h1>
                <p className="text-sm text-primary">DevOps Engineer</p>
            </div>
        </div>
    )
}
