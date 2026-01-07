
"use client";

import { useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const experiences = [
    {
      title: "DevOps Engineer",
      company: "mPower Social Enterprises Ltd.",
      companyLink: "https://mpower-social.com/",
      period: "Sept 2023 – Present",
      description: [
        "Full-Stack Application Support utilizing deep development knowledge to debug and optimize complex Node.js and React application code, reducing critical production bugs by 15%.",
        "Managed the performance and reliability of production databases (PostgreSQL/MySQL), including implementing automated backup and recovery strategies to ensure data integrity.",
        "Designed, implemented, and maintained Jenkins-based CI/CD pipelines, resulting in a 30% reduction in deployment lead time across four critical applications.",
        "Automated infrastructure configuration and application deployments using Ansible playbooks, standardizing environment setup and minimizing manual configuration errors.",
        "Integrated SonarQube scanning into the build process to enforce code quality standards and enable early detection of performance bottlenecks and security vulnerabilities.",
        "Monitored and maintained Linux-based production servers to ensure system reliability and peak performance during high-traffic events.",
        "Conducted root cause analysis and debugging for CI/CD failures and production incidents by reviewing centralized logs and monitoring systems (e.g., Elasticsearch).",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "mPower Social Enterprises Ltd.",
      companyLink: "https://mpower-social.com/",
      period: "Feb 2023 – May 2023",
      description: [
        "Developed and delivered new front-end features for core web applications using React and TypeScript.",
        "Assisted senior engineers in system design, API integration, and troubleshooting application issues across development environments.",
      ],
    },
  ];

export const ExperienceSection = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

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
            {expanded === index && (
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            )}
            <div className="p-6 pt-0">
               <Button variant="link" onClick={() => toggleExpand(index)} className="p-0 h-auto text-primary">
                {expanded === index ? "Show less" : "Show more"}
                <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", expanded === index && "rotate-180")} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
