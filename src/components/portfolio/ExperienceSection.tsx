
import { Briefcase } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const experiences = [
    {
      title: "DevOps Engineer",
      company: "mPower Social Enterprises Ltd.",
      companyLink: "https://mpower-social.com/",
      period: "Sept 2023 – Present",
      description: [
        "Implement and maintain CI/CD pipelines.",
        "Optimize cloud infrastructure and automate deployments.",
        "Collaborate with development teams to enhance system performance.",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "mPower Social Enterprises Ltd.",
      companyLink: "https://mpower-social.com/",
      period: "Feb 2023 – May 2023",
      description: [
        "Developed front-end features for web applications using React and TypeScript.",
        "Assisted in system design and troubleshooting.",
      ],
    },
  ];

export const ExperienceSection = () => {
  return (
    <section id="experience">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary">
        Work Experience
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {experiences.map((exp, index) => (
          <Card key={index} className="bg-card hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                      <CardTitle className="text-xl font-bold font-headline">
                          {exp.title}
                      </CardTitle>
                      <CardDescription>
                          <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                              {exp.company}
                          </a>
                          <span className="block text-sm text-muted-foreground mt-1">{exp.period}</span>
                      </CardDescription>
                  </div>
                  <Briefcase className="h-8 w-8 text-primary shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
