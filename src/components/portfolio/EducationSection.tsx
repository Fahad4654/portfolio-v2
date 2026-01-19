
"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Edit } from "lucide-react";
import {
    Card,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

type Education = {
    degree: string;
    institution: string;
    link: string | null;
    period: string;
};

export const EducationSection = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchEducation = async () => {
            const { data, error } = await supabase
                .from('education')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) {
                console.error("Error fetching education:", error);
            } else {
                setEducation(data);
            }
            setLoading(false);
        };

        fetchEducation();
    }, []);

    if (loading) {
        return (
            <section id="education">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary text-center">
                    Education
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="flex flex-col items-center text-center p-8 bg-card">
                            <Skeleton className="h-12 w-12 mb-4 rounded-full" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-4 w-1/4" />
                        </Card>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="education">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary text-center">
            Education
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
                <Card
                key={index}
                className="flex flex-col items-center text-center p-8 hover:border-primary/50 transition-colors bg-card"
                >
                {isLoggedIn ? (
                    <Button variant="outline" size="icon" className="mb-4">
                        <Edit className="h-6 w-6" />
                    </Button>
                ) : (
                    <GraduationCap className="h-12 w-12 mb-4 text-primary" />
                )}
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
