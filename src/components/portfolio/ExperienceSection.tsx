
"use client";

import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";

type Experience = {
    title: string;
    company: string;
    company_link: string | null;
    period: string;
    description: string[];
};

export const ExperienceSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error("Error fetching experiences:", error);
        } else {
            setExperiences(data);
        }
        setLoading(false);
    };

    fetchExperiences();
  }, []);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  if (loading) {
    return (
        <section id="experience">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary text-center">
                Work Experience
            </h2>
            <div className="grid grid-cols-1 gap-8">
                {[...Array(2)].map((_, index) => (
                    <Card key={index} className="bg-card">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <div className="p-6 pt-0">
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
  }

  return (
    <section id="experience">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 font-headline text-primary text-center">
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
                          {exp.company_link ? (
                            <a href={exp.company_link} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
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
