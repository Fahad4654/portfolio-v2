
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "@/assets/pp.jpeg";


export const Header = () => {
    return (
        <div className="text-center shrink-0">
            <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
            <AvatarImage src={profilePic.src} alt="Profile Picture" />
            <AvatarFallback>FK</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-foreground font-headline">
            FAHAD KABIR
            </h1>
            <p className="text-md text-primary">DevOps Engineer</p>
        </div>
    )
}
