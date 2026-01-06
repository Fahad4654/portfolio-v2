"use client";

import React from "react";
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
import { useState, useEffect, useRef } from "react";
import profilePic from "@/assets/pp.jpeg";
import project1 from "@/assets/business.png";
import project2 from "@/assets/edmate.png";

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
  SheetTitle,
} from "@/components/ui/sheet";
// import { ContactForm } from "@/components/contact-form";
import LoadingScreen from "@/components/loading-screen";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

const softSkills = [
  "Teamwork & Collaboration",
  "Attention to Detail",
  "Analytical Thinking",
  "Adaptability",
];

const experiences = [
  {
    title: "DevOps Engineer",
    company: "mPower Social Enterprises Ltd.",
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
    period: "Feb 2023 – May 2023",
    description: [
      "Developed front-end features for web applications using React and TypeScript.",
      "Assisted in system design and troubleshooting.",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Independent University, Bangladesh",
    period: "2023 | CGPA: 3.23",
  },
  {
    degree: "H.S.C. (Science)",
    institution: "Nawab Siraj-Ud-Dowla Government College, Natore",
    period: "2017 | GPA: 5.00",
  },
  {
    degree: "S.S.C. (Science)",
    institution: "Natore Govt. Boys' High School, Natore",
    period: "2015 | GPA: 5.00",
  },
];

type Section = "profile" | "skills" | "experience" | "portfolio" | "education";
// | "contact";

const links: { id: Section; icon: React.ElementType; text: string }[] = [
  { id: "profile", icon: User, text: "Personal Info" },
  { id: "skills", icon: Shapes, text: "Technical Skills" },
  { id: "education", icon: GraduationCap, text: "Education" },
  { id: "experience", icon: BriefcaseBusiness, text: "Work Experience" },
  { id: "portfolio", icon: FileText, text: "Projects" },
  
  // { id: "contact", icon: MessageSquare, text: "Contact" },
];

const NavLinks = ({
  activeSection,
  onLinkClick,
  isMobile = false,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isMobile?: boolean;
}) => {
  const NavLinkButtons = () => (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onLinkClick(link.id)}
          className={cn(
            "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 text-muted-foreground hover:bg-primary/10 hover:text-primary",
            activeSection === link.id &&
              "bg-primary/10 text-primary font-semibold"
          )}
        >
          <link.icon className="h-5 w-5" />
          <span>{link.text}</span>
        </button>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <SheetClose asChild>
        <NavLinkButtons />
      </SheetClose>
    );
  }

  return <NavLinkButtons />;
};

const SidebarContent = ({
  activeSection,
  onLinkClick,
  isMobile = false,
}: {
  activeSection: Section;
  onLinkClick: (section: Section) => void;
  isMobile?: boolean;
}) => {
  const content = (
    <>
      <div className="text-center shrink-0">
        <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
          <AvatarImage src={profilePic.src} alt="Profile Picture" />
          <AvatarFallback>FK</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-foreground font-headline">
          FAHAD KABIR
        </h1>
        <p className="text-md text-primary">DevOps Engineer</p>
      </div>

      <div className="mt-10 flex-1 flex flex-col min-h-0">
        <NavLinks
          activeSection={activeSection}
          onLinkClick={onLinkClick}
          isMobile={isMobile}
        />
      </div>

      <div className="text-center shrink-0 mt-6">
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/Fahad4654"
            target="_blank"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/fahad-kabir-6559211a8"
            target="_blank"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-full p-6 bg-card/50">
        <div className="text-center shrink-0">
          <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
            <AvatarImage src={profilePic.src} alt="Profile Picture" />
            <AvatarFallback>FK</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-foreground font-headline">
            FAHAD KABIR
          </h1>
          <p className="text-md text-primary">DevOps Engineer</p>
        </div>

        <div className="mt-10 flex-1 min-h-0">
          <ScrollArea className="h-full pr-4 -mr-4">
            <NavLinks
              activeSection={activeSection}
              onLinkClick={onLinkClick}
              isMobile={isMobile}
            />
          </ScrollArea>
        </div>

        <div className="text-center shrink-0 mt-6">
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Fahad4654"
              target="_blank"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/fahad-kabir-6559211a8"
              target="_blank"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <div className="flex flex-col h-full p-6 bg-card/50">{content}</div>;
};

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTo(0, 0);
    }
  }, [activeSection]);

  const handleLinkClick = (section: Section) => {
    setActiveSection(section);
    setIsSheetOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-80 flex-shrink-0 hidden md:block sticky top-0 h-screen border-r border-border/20">
        <SidebarContent
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />
      </aside>

      <main className="flex-1 relative flex flex-col">
        <div className="md:hidden fixed bottom-6 right-6 z-20">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="rounded-full h-16 w-16 shadow-lg shadow-primary/30"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 border-r-0">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SidebarContent
                activeSection={activeSection}
                onLinkClick={handleLinkClick}
                isMobile
              />
            </SheetContent>
          </Sheet>
        </div>
        <div
          key={activeSection}
          ref={contentAreaRef}
          className="overflow-y-auto flex-1 animate-slide-in"
        >
          <div className="container mx-auto px-6 py-16 md:px-12 md:py-24">
            {activeSection === "profile" && (
              <section id="profile">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
                  Personal Info
                </h2>
                <Card className="bg-card/50">
                  <CardContent className="p-8 text-lg">
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      DevOps Engineer with expertise in cloud infrastructure,
                      CI/CD pipelines, and system automation. Skilled in
                      Node.js, React, Docker, and Ansible, with a strong
                      background in problem-solving and optimizing system
                      performance. Passionate about collaborating with teams to
                      drive efficiency and innovation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground mb-8">
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
                        <a 
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=kabirkaife@gmail.com" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:text-primary transition-colors">
                          kabirkaife@gmail.com
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Further details are available in my resume.</p>
                    <Button
                      asChild
                      className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                    >
                      <a
                        href="https://drive.google.com/file/d/1tERFX5p_dUU_75cuF6WsDpuMPJp4JnvI/view?usp=drive_link"
                        target="_blank"
                        download="Fahad_Kabir_Resume.pdf"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeSection === "skills" && (
              <section id="skills">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary">
                  Technical Skills
                </h2>
                <Card className="bg-card/50">
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
            )}

            {activeSection === "experience" && (
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
                      <p className="text-lg text-primary mb-3">{exp.company}</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1.5">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "portfolio" && (
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
            )}

            {activeSection === "education" && (
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
                        {edu.institution}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {edu.period}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* {activeSection === "contact" && (
              <section id="contact" className="max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 font-headline text-primary">
                  Get In Touch
                </h2>
                <Card className="shadow-lg bg-card/50">
                  <CardContent className="p-6 md:p-8">
                    <ContactForm />
                  </CardContent>
                </Card>
              </section>
            )} */}

            <footer className="py-8 border-t border-border/20 mt-24 md:mt-32">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Fahad Kabir. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;

    