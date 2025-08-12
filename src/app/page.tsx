
"use client";

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
  User,
  BriefcaseBusiness,
  Shapes,
  MessageSquare,
  FileText,
  Download,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";

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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ContactForm } from "@/components/contact-form";
import LoadingScreen from "@/components/loading-screen";

const projects = [
  {
    title: "E-commerce App (Business Facility App)",
    description: "Developed a chatting and notification system using Remix, React, and Firebase.",
    image: "https://placehold.co/600x400.png",
    hint: "business directory",
    link: "https://allinonebusiness.co.uk/",
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

const NavLinks = ({ isMobile }: { isMobile?: boolean }) => {
    const Wrapper = isMobile ? SheetClose : React.Fragment;
    const wrapperProps = isMobile ? { asChild: true } : {};

    return (
        <nav className="flex flex-col gap-3">
            <Wrapper {...wrapperProps}>
                <a href="#profile" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <User className="h-5 w-5" />
                    <span>Personal Info</span>
                </a>
            </Wrapper>
            <Wrapper {...wrapperProps}>
                <a href="#skills" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Shapes className="h-5 w-5" />
                    <span>Technical Skills</span>
                </a>
            </Wrapper>
            <Wrapper {...wrapperProps}>
                <a href="#experience" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <BriefcaseBusiness className="h-5 w-5" />
                    <span>Work Experience</span>
                </a>
            </Wrapper>
            <Wrapper {...wrapperProps}>
                <a href="#portfolio" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <FileText className="h-5 w-5" />
                    <span>Projects</span>
                </a>
            </Wrapper>
            <Wrapper {...wrapperProps}>
                <a href="#education" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <GraduationCap className="h-5 w-5" />
                    <span>Education</span>
                </a>
            </Wrapper>
            <Wrapper {...wrapperProps}>
                <a href="#contact" className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Contact</span>
                </a>
            </Wrapper>
        </nav>
    );
};


const SidebarContent = ({ isMobile = false }) => (
  <>
    <div className="text-center mb-10">
      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
        <AvatarImage src="https://placehold.co/128x128.png" alt="Profile Picture" data-ai-hint="person portrait" />
        <AvatarFallback>FK</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-foreground">
        FAHAD KABIR
      </h1>
      <p className="text-md text-primary">DevOps Engineer</p>
    </div>

    <NavLinks isMobile={isMobile} />
    
    <div className="mt-auto text-center">
       <div className="flex justify-center gap-4">
        <a href="https://github.com" target="_blank" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
            <Github />
        </a>
        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
            <Linkedin />
        </a>
      </div>
    </div>
  </>
)

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 flex-shrink-0 p-8 border-r border-border hidden md:flex flex-col sticky top-0 h-screen">
          <SidebarContent />
      </aside>
      
      <main className="flex-1 overflow-y-auto">
         <header className="flex items-center justify-between p-4 border-b md:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                <AvatarImage src="https://placehold.co/128x128.png" alt="Profile Picture" data-ai-hint="person portrait" />
                <AvatarFallback>FK</AvatarFallback>
                </Avatar>
                <span className="font-bold text-lg">Fahad Kabir</span>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 flex flex-col p-8">
                   <SidebarContent isMobile={true}/>
                </SheetContent>
            </Sheet>
        </header>
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Profile Section */}
          <section id="profile" className="mb-20 md:mb-28 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 font-headline">
              Personal Info
            </h2>
            <Card>
                <CardContent className="p-6 text-lg">
                     <p className="text-muted-foreground max-w-3xl mb-6">
                      DevOps Engineer with expertise in cloud infrastructure, CI/CD pipelines, and system automation. Skilled in Node.js, React, Docker, and Ansible, with a strong background in problem-solving and optimizing system performance. Passionate about collaborating with teams to drive efficiency and innovation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground mb-6">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>Bashundhara R/A, Dhaka</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <span>+880 1772-967944</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <span>kabirkaife@gmail.com</span>
                        </div>
                    </div>
                     <Button asChild>
                        <a href="https://drive.google.com/uc?export=download&id=1oWiQ9cEj0yBZ_8aVMaNYFJOxhTYalIcd" target="_blank" download="Fahad_Kabir_CV.pdf">
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                        </a>
                    </Button>
                </CardContent>
            </Card>
          </section>
          
           {/* Skills Section */}
          <section id="skills" className="mb-20 md:mb-28 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 font-headline">
              Technical Skills
            </h2>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-wrap justify-start gap-3">
                        {technicalSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-base px-4 py-2 rounded-lg">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </section>

          {/* Experience Section */}
            <section id="experience" className="mb-20 md:mb-28 scroll-mt-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">
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
          <section id="portfolio" className="mb-20 md:mb-28 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 font-headline">
              My Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
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
                      <a href={project.link} target="_blank">
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
           {/* Education Section */}
            <section id="education" className="mb-20 md:mb-28 scroll-mt-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">
                    Education
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
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
          <section id="contact" className="max-w-2xl mx-auto scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              Get In Touch
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </section>

            <footer className="py-6 border-t mt-20 md:mt-28">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Fahad Kabir. All rights reserved.</p>
                </div>
            </footer>
        </div>
      </main>

    </div>
  );
}
