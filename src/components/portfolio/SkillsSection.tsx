
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const technicalSkills = [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "PostgreSQL",
    "MySQL",
    "React",
    "Node.js",
    "Firebase",
    "Docker",
    "Ansible",
    "Linux",
    "Bash scripting",
    "Jenkins",
    "SonarQube",
    "CI/CD",
    "System Monitoring",
  ];

export const SkillsSection = () => {
    return (
        <section id="skills">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
                Technical Skills
            </h2>
            <Card className="bg-card">
                <CardContent className="p-8">
                <div className="flex flex-wrap gap-3">
                    {technicalSkills.map((skill) => (
                    <Badge
                        key={skill}
                        variant="outline"
                        className="text-base px-4 py-2 rounded-lg justify-center transition-transform hover:scale-105 hover:bg-primary/20 bg-transparent"
                    >
                        {skill}
                    </Badge>
                    ))}
                </div>
                </CardContent>
            </Card>
        </section>
    )
}
