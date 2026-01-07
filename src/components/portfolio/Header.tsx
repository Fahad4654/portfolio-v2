
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "@/assets/pp.jpeg";
import { cn } from "@/lib/utils";


export const Header = ({ isCollapsed }: { isCollapsed?: boolean }) => {
    return (
        <div className={cn("text-center shrink-0", isCollapsed && "px-2")}>
            <Avatar className={cn(
                "w-28 h-28 mx-auto mb-4 border-4 border-primary/20 shadow-lg transition-all duration-300",
                isCollapsed && "w-12 h-12"
            )}>
            <AvatarImage src={profilePic.src} alt="Profile Picture" />
            <AvatarFallback>FK</AvatarFallback>
            </Avatar>
            <div className={cn("transition-opacity duration-300", isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
                <h1 className="text-2xl font-bold text-foreground font-headline">
                FAHAD KABIR
                </h1>
                <p className="text-md text-primary">DevOps Engineer</p>
            </div>
        </div>
    )
}
