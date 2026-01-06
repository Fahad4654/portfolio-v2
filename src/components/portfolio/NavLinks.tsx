
import { links, Section } from "@/app/page";
import { cn } from "@/lib/utils";


export const NavLinks = ({
  activeSection,
  onLinkClick,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
}) => {
  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onLinkClick(link.id)}
          className={cn(
            "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 text-muted-foreground hover:bg-primary/10 hover:text-primary",
            activeSection === link.id &&
              "bg-primary/10 text-primary font-semibold"
          )}
        >
          <link.icon className="h-5 w-5" />
          <span>{link.text}</span>
        </button>
      ))}
    </nav>
  );
};

