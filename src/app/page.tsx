import Image from "next/image";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Quote,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContactForm } from "@/components/contact-form";

const projects = [
  {
    title: "Project Alpha",
    description: "A web application for managing tasks and projects, built with React and Node.js. Features a clean interface and real-time collaboration.",
    image: "https://placehold.co/600x400.png",
    hint: "technology abstract",
    link: "#",
    tags: ["React", "Node.js", "Web App"],
  },
  {
    title: "Project Beta",
    description: "An e-commerce platform designed for scalability and performance. Integrated with Stripe for payments and built on a serverless architecture.",
    image: "https://placehold.co/600x400.png",
    hint: "shopping retail",
    link: "#",
    tags: ["E-commerce", "Stripe", "Serverless"],
  },
  {
    title: "Project Gamma",
    description: "A mobile app for fitness tracking and workout logging. It provides personalized plans and progress monitoring. Developed for iOS and Android.",
    image: "https://placehold.co/600x400.png",
    hint: "fitness health",
    link: "#",
    tags: ["Mobile App", "Fitness", "iOS/Android"],
  },
];

const testimonials = [
  {
    quote: "Working with them was a breeze. They delivered a high-quality product on time and exceeded our expectations. Highly recommended!",
    author: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
  },
  {
    quote: "Their attention to detail and creative problem-solving are unmatched. They transformed our initial idea into a polished, user-friendly application.",
    author: "John Smith",
    title: "Product Manager, Innovate Co.",
  },
  {
    quote: "A true professional and a pleasure to collaborate with. Their expertise was invaluable to our project's success.",
    author: "Emily White",
    title: "Lead Designer, Creative Agency",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Profile Section */}
          <section id="profile" className="text-center mb-20 md:mb-28">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
              <AvatarImage src="https://placehold.co/128x128.png" alt="Profile Picture" data-ai-hint="person portrait" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-foreground">
              John Doe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Full-stack developer with a passion for creating beautiful,
              functional, and user-centered digital experiences. Welcome to my
              personal space.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:example@example.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </section>

          {/* Project Portfolio Section */}
          <section id="portfolio" className="mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              My Portfolio
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

          {/* Testimonials Section */}
          <section id="testimonials" className="mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-headline">
              What Others Say
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col">
                        <CardContent className="flex flex-col items-center text-center justify-center p-6 gap-4 flex-1">
                          <Quote className="w-8 h-8 text-primary/80" />
                          <blockquote className="italic text-muted-foreground">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="mt-2">
                            <p className="font-semibold text-foreground">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
