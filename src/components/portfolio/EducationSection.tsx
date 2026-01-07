
import { GraduationCap } from "lucide-react";
import {
    Card,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";

const education = [
    {
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "Independent University, Bangladesh",
      link: "https://iub.ac.bd/",
      period: "2023",
    },
    {
      degree: "H.S.C. (Science)",
      institution: "Nawab Siraj-Ud-Dowla Government College, Natore",
      period: "2017",
    },
    {
      degree: "S.S.C. (Science)",
      institution: "Natore Govt. Boys' High School, Natore",
      period: "2015",
    },
  ];

export const EducationSection = () => {
    return (
        <section id="education">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary">
            Education
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
                <Card
                key={index}
                className="flex flex-col items-center text-center p-8 hover:border-primary/50 transition-colors bg-card/50"
                >
                <GraduationCap className="h-12 w-12 mb-4 text-primary" />
                <CardTitle className="text-xl mb-1 font-headline">
                    {edu.degree}
                </CardTitle>
                <CardDescription className="mb-2">
                    {edu.link ? (
                        <a href={edu.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary transition-colors">
                            {edu.institution}
                        </a>
                    ) : (
                        edu.institution
                    )}
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                    {edu.period}
                </p>
                </Card>
            ))}
            </div>
        </section>
    )
}
