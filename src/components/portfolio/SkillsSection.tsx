
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

const skillGroups = [
    {
      title: "Languages & Scripting",
      skills: ["TypeScript", "JavaScript", "Python", "Java", "Bash scripting"],
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "ExpressJs", "NestJs", "Django", "FastApi", "RESTful APIs"],
    },
    {
      title: "Frontend Development",
      skills: ["React", "Remix", "Vite", "Tailwind", "Material UI", "HTML5", "CSS3"],
    },
    {
      title: "Databases & ORMs",
      skills: ["PostgreSQL", "MySQL", "Sequelize", "Redis", "Firebase", "Prisma"],
    },
    {
      title: "DevOps, CI/CD & Tooling",
      skills: [
        "Linux",
        "Git",
        "GitHub Actions",
        "Docker",
        "Ansible",
        "Jenkins",
        "CI/CD",
        "SonarQube",
        "Elasticsearch",
        "System Monitoring",
        "Database Management",
        "Database Optimization",
      ],
    },
  ];

export const SkillsSection = () => {
    return (
        <section id="skills">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
                Technical Skills
            </h2>
            <Card className="bg-card">
                <CardContent className="p-8">
                    <div className="space-y-8">
                        {skillGroups.map((group) => (
                            <div key={group.title}>
                                <div className="flex flex-col items-center mb-4">
                                  <div className="inline-block">
                                    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{group.title}</h3>
                                    <Separator className="bg-primary" />
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-start">
                                    {group.skills.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="outline"
                                        className="text-base px-4 py-2 rounded-lg justify-center transition-transform hover:scale-105 hover:bg-primary/20 bg-transparent"
                                    >
                                        {skill}
                                    </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
