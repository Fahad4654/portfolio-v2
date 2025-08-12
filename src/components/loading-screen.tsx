
import { Terminal } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background font-code">
      <div className="flex flex-col items-center gap-4">
        <Terminal className="h-12 w-12 text-primary" />
        <div className="flex items-center gap-2">
            <span className="text-lg text-muted-foreground">$</span>
            <p className="text-lg text-muted-foreground typing-text">WELCOME TO FAHAD KABIR'S PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}
