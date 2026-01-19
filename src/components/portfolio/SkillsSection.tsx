
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";

type Skill = {
    name: string;
};

export type SkillGroup = {
    title: string;
    skills: Skill[];
};

export const SkillsSection = () => {
    const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            const { data, error } = await supabase
                .from('skill_groups')
                .select('title, skills ( name )')
                .order('display_order', { ascending: true });

            if (error) {
                console.error("Error fetching skills:", error);
                setSkillGroups([]);
            } else {
                setSkillGroups(data as SkillGroup[]);
            }
            setLoading(false);
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <section id="skills">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
                    Technical Skills
                </h2>
                <Card className="bg-card">
                    <CardContent className="p-8">
                        <div className="space-y-8">
                            {[...Array(5)].map((_, i) => (
                                <div key={i}>
                                    <div className="flex flex-col items-center mb-4">
                                        <div className="inline-block">
                                            <Skeleton className="h-[3px] w-48 mb-2" />
                                            <Skeleton className="h-6 w-40 mx-auto" />
                                            <Skeleton className="h-[3px] w-48 mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {[...Array(6)].map((_, j) => (
                                            <Skeleton key={j} className="h-10 w-24 rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        );
    }

    return (
        <section id="skills">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-headline text-primary text-center">
                Technical Skills
            </h2>
            <Card className="bg-card">
                <CardContent className="p-8">
                    <div className="space-y-8">
                        {skillGroups.map((group) => (
                            <div key={group.title}>
                                <div className="flex flex-col items-center mb-4">
                                  <div className="inline-block">
                                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mb-2"></div>
                                    <h3 className="text-lg font-semibold text-foreground text-center">{group.title}</h3>
                                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-2"></div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {group.skills.map((skill) => (
                                    <Badge
                                        key={skill.name}
                                        variant="outline"
                                        className="text-base px-4 py-2 rounded-lg justify-center transition-transform hover:scale-105 hover:bg-primary/20 bg-transparent"
                                    >
                                        {skill.name}
                                    </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
