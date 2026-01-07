
import { Briefcase } from "lucide-react";

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
      <div className="relative pl-8 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-border/50">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-10 mb-12 group">
            <div className="absolute -left-5 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary/50 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
              <Briefcase className="h-5 w-5 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              {exp.period}
            </p>
            <h3 className="text-xl font-bold text-foreground mt-1 font-headline">
              {exp.title}
            </h3>
            <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="text-lg text-primary mb-3 inline-block hover:underline">
                {exp.company}
            </a>
            <ul className="list-disc list-inside text-muted-foreground space-y-1.5">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
