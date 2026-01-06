
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/business.png";
import project2 from "@/assets/edmate.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
    {
      title: "E-commerce App (Business Facility App)",
      description:
        "Developed a chatting and notification system using Remix, React, and Firebase.",
      image: project1,
      hint: "business directory",
      link: "https://allinonebusiness.co.uk/",
      tags: ["Remix", "React", "Firebase", "Chat"],
    },
    {
      title: "Edmate (E-learning Web App)",
      description:
        "Built front-end components using React and TypeScript for an e-learning platform.",
      image: project2,
      hint: "education technology",
      // link: "#",
      tags: ["React", "TypeScript", "E-learning"],
    },
    {
      title: "Pre-registration App (Student Course Enrollment)",
      description:
        "Created a full-stack system for student course enrollment using PHP, JavaScript, and HTML.",
      image: "https://placehold.co/600x400.png",
      hint: "university portal",
      link: "#",
      tags: ["PHP", "JavaScript", "HTML", "Full-stack"],
    },
  ];

export const ProjectsSection = () => {
    return (
        <section id="portfolio">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
            My Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {projects.map((project, index) => (
                <Card
                key={index}
                className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card/50"
                >
                <CardHeader className="p-0">
                    <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                    data-ai-hint={project.hint}
                    />
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                    <CardTitle className="mb-2 font-headline text-2xl">
                    {project.title}
                    </CardTitle>
                    <CardDescription className="flex-1">
                    {project.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                    <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                        {tag}
                        </Badge>
                    ))}
                    </div>
                    <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    asChild
                    >
                    {project.link ? (
                        <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        View Project{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    ) : (
                        <a href="#" className="cursor-not-allowed">
                        Not permitted to show{" "}
                        {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                        </a>
                    )}
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>
    )
}
