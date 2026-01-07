
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
      skills: ["React", "Remix", "Tailwind", "Material UI", "HTML5", "CSS3"],
    },
    {
      title: "Databases & ORMs",
      skills: ["PostgreSQL", "MySQL", "Sequelize", "Redis", "Firebase", "Prisma"],
    },
    {
      title: "DevOps, CI/CD & Tooling",
      skills: [
        "Git",
        "Docker",
        "Ansible",
        "Linux",
        "Jenkins",
        "Vite",
        "SonarQube",
        "Elasticsearch",
        "System Monitoring",
        "CI/CD",
      ],
    },
  ];

export const SkillsSection = () => {
    return (
        <section id="skills">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
                Technical Skills
            </h2>
            <Card className="bg-card">
                <CardContent className="p-8">
                    <div className="space-y-8">
                        {skillGroups.map((group) => (
                            <div key={group.title}>
                                <h3 className="text-lg font-semibold text-foreground mb-4">{group.title}</h3>
                                <div className="flex flex-wrap gap-3">
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
