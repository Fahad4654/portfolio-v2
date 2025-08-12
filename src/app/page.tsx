import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Settings,
  User,
  Star,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ContactForm } from "@/components/contact-form";

const projects = [
  {
    title: "E-commerce App (Business Facility App)",
    description: "Developed a chatting and notification system using Remix, React, and Firebase.",
    image: "https://placehold.co/600x400.png",
    hint: "ecommerce app",
    link: "#",
    tags: ["Remix", "React", "Firebase", "Chat"],
  },
  {
    title: "Ace Exam (E-learning Web App)",
    description: "Built front-end components using React and TypeScript for an e-learning platform.",
    image: "https://placehold.co/600x400.png",
    hint: "education technology",
    link: "#",
    tags: ["React", "TypeScript", "E-learning"],
  },
  {
    title: "Pre-registration App (Student Course Enrollment)",
    description: "Created a full-stack system for student course enrollment using PHP, JavaScript, and HTML.",
    image: "https://placehold.co/600x400.png",
    hint: "university portal",
    link: "#",
    tags: ["PHP", "JavaScript", "HTML", "Full-stack"],
  },
];

const technicalSkills = [
  "C++", "Java", "Python", "JavaScript", "TypeScript", "PostgreSQL", "MySQL",
  "React", "Node.js", "Firebase", "Docker", "Ansible", "Linux", "Bash scripting",
  "Jenkins", "SonarQube", "CI/CD", "System Monitoring"
];

const softSkills = ["Teamwork & Collaboration", "Attention to Detail", "Analytical Thinking", "Adaptability"];

const experiences = [
    {
        title: "DevOps Engineer",
        company: "mPower Social Enterprises Ltd.",
        period: "Sept 2023 – Present",
        description: [
            "Implement and maintain CI/CD pipelines.",
            "Optimize cloud infrastructure and automate deployments.",
            "Collaborate with development teams to enhance system performance.",
        ]
    },
    {
        title: "Software Engineer Intern",
        company: "mPower Social Enterprises Ltd.",
        period: "Feb 2023 – May 2023",
        description: [
            "Developed front-end features for web applications using React and TypeScript.",
            "Assisted in system design and troubleshooting.",
        ]
    }
];

const education = [
    {
        degree: "B.Sc. in Computer Science and Engineering",
        institution: "Independent University, Bangladesh",
        period: "2023 | CGPA: 3.23"
    },
    {
        degree: "H.S.C. (Science)",
        institution: "Nawab Siraj-Ud-Dowla Government College, Natore",
        period: "2017 | GPA: 5.00"
    },
    {
        degree: "S.S.C. (Science)",
        institution: "Natore Govt. Boys' High School, Natore",
        period: "2015 | GPA: 5.00"
    }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Profile Section */}
          <section id="profile" className="text-center mb-20 md:mb-28">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
              <AvatarImage src="https://placehold.co/128x128.png" alt="Profile Picture" data-ai-hint="person portrait" />
              <AvatarFallback>FK</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-foreground">
              FAHAD KABIR
            </h1>
            <p className="text-xl font-semibold text-primary mb-4">DevOps Engineer</p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Bashundhara R/A, Dhaka</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+880 1772-967944</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>kabirkaife@gmail.com</span>
                </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              DevOps Engineer with expertise in cloud infrastructure, CI/CD pipelines, and system automation. Skilled in Node.js, React, Docker, and Ansible, with a strong background in problem-solving and optimizing system performance. Passionate about collaborating with teams to drive efficiency and innovation.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" asChild>
                <a href="https://github.com" target="_blank" aria-label="GitHub">
                  <Github /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                  <Linkedin /> LinkedIn
                </a>
              </Button>
            </div>
          </section>
          
           {/* Skills Section */}
          <section id="skills" className="mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              Technical Skills
            </h2>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        {technicalSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-base px-4 py-2 rounded-lg">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </section>

          {/* Experience Section */}
            <section id="experience" className="mb-20 md:mb-28">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
                    Work Experience
                </h2>
                <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-border">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 mb-10 group">
                            <div className="absolute -left-[29px] top-1 flex h-14 w-14 items-center justify-center rounded-full bg-background border-2 border-primary/50">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">{exp.period}</p>
                            <h3 className="text-xl font-bold text-foreground mt-1">{exp.title}</h3>
                            <p className="text-lg text-primary mb-3">{exp.company}</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

          {/* Project Portfolio Section */}
          <section id="portfolio" className="mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              My Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={project.hint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-1">
                    <CardTitle className="mb-2 font-headline">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                     <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-primary" asChild>
                      <a href={project.link}>
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
           {/* Education Section */}
            <section id="education" className="mb-20 md:mb-28">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
                    Education
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {education.map((edu, index) => (
                         <Card key={index} className="flex flex-col items-center text-center p-6">
                            <GraduationCap className="h-10 w-10 mb-4 text-primary"/>
                            <CardTitle className="text-xl mb-1">{edu.degree}</CardTitle>
                            <CardDescription className="mb-2">{edu.institution}</CardDescription>
                            <p className="text-sm text-muted-foreground">{edu.period}</p>
                        </Card>
                    ))}
                </div>
            </section>

          {/* Contact Section */}
          <section id="contact" className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              Get In Touch
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="py-6 border-t mt-20 md:mt-28">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fahad Kabir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
