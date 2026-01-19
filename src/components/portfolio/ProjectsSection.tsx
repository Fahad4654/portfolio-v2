
"use client";

import Image from "next/image";
import { ArrowRight, Edit } from "lucide-react";
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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";
import profilePic from "@/assets/pp.jpeg";
import { useAuth } from "@/context/AuthContext";

type Project = {
    title: string;
    description: string;
    image: string;
    hint: string;
    link: string | null;
    tags: string[];
    status_text: string;
};

export const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order', { ascending: true });
            
            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="portfolio">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
                    My Projects
                </h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {[...Array(4)].map((_, index) => (
                        <Card key={index} className="flex flex-col overflow-hidden bg-card">
                            <CardHeader className="p-0">
                                <Skeleton className="w-full h-56" />
                            </CardHeader>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <Skeleton className="h-7 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full mt-2" />
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-6 w-32" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section id="portfolio">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
            My Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {projects.map((project, index) => (
                <Card
                key={index}
                className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card"
                >
                <CardHeader className="p-0">
                    <Image
                    src={profilePic.src}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
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
                    <div className="w-full flex items-center justify-between">
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
                            {project.status_text}{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        ) : (
                            <span className="cursor-not-allowed text-muted-foreground">
                            {project.status_text}
                            </span>
                        )}
                        </Button>
                        {isLoggedIn && (
                            <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>
    )
}
