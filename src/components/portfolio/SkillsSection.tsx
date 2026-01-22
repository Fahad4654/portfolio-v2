
"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Plus, PlusCircle, Trash2, X } from "lucide-react";
import { AddSkillGroupDialog } from "./AddSkillGroupDialog";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { AddSkillDialog } from "./AddSkillDialog";
import { cn } from "@/lib/utils";

type Skill = {
    id: string;
    name: string;
    display_order: number;
};

export type SkillGroup = {
    id: string;
    title: string;
    display_order: number;
    skills: Skill[];
};

export const SkillsSection = () => {
    const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();
    const { toast } = useToast();
    const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
    const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);
    const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);
    const [isDeleteSkillDialogOpen, setIsDeleteSkillDialogOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<SkillGroup | null>(null);
    const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

    const fetchSkills = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('skill_groups')
            .select('*, skills ( id, name, display_order )')
            .order('display_order', { ascending: true })
            .order('display_order', { foreignTable: 'skills', ascending: true });

        if (error) {
            console.error("Error fetching skills:", error);
            setSkillGroups([]);
        } else {
            setSkillGroups(data as SkillGroup[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);
    
    const handleDeleteGroupClick = (group: SkillGroup) => {
        setGroupToDelete(group);
        setIsDeleteGroupDialogOpen(true);
    };

    const handleDeleteSkillClick = (skill: Skill) => {
        setSkillToDelete(skill);
        setIsDeleteSkillDialogOpen(true);
    }

    const handleDeleteGroupConfirm = async () => {
        if (!groupToDelete) return;

        try {
            // 1. Delete associated skills first
            const { error: skillsError } = await supabase
                .from('skills')
                .delete()
                .eq('group_id', groupToDelete.id);
            if (skillsError) throw skillsError;

            // 2. Delete the group itself
            const { error: groupError } = await supabase
                .from('skill_groups')
                .delete()
                .eq('id', groupToDelete.id);
            if (groupError) throw groupError;
            
            // 3. Re-sequence all remaining groups to ensure consistency
            const { data: remainingGroups, error: fetchError } = await supabase
                .from('skill_groups')
                .select('id, display_order')
                .order('display_order', { ascending: true });

            if (fetchError) throw fetchError;
            
            if (remainingGroups) {
                const updatePromises = remainingGroups.map((group, index) => {
                    const expectedOrder = index + 1;
                    if (group.display_order !== expectedOrder) {
                        return supabase.from('skill_groups').update({ display_order: expectedOrder }).eq('id', group.id);
                    }
                    return null;
                }).filter(p => p); // Filter out nulls
                
                await Promise.all(updatePromises);
            }
            
            toast({
                title: 'Skill Group Deleted',
                description: `The group "${groupToDelete.title}" has been deleted.`,
            });
        } catch (error: any) {
            console.error('Error during deletion process:', error);
            toast({
                variant: 'destructive',
                title: 'Delete Failed',
                description: 'An error occurred while deleting the skill group. Please try again.',
            });
        } finally {
            fetchSkills();
            setGroupToDelete(null);
        }
    };

    const handleDeleteSkillConfirm = async () => {
        if (!skillToDelete) return;
    
        try {
            let skillGroupId: string | undefined;
            for (const group of skillGroups) {
                if (group.skills.some(s => s.id === skillToDelete.id)) {
                    skillGroupId = group.id;
                    break;
                }
            }
            if (!skillGroupId) {
                throw new Error("Could not find the skill's group.");
            }
    
            // 1. Delete the skill
            const { error: deleteError } = await supabase
                .from('skills')
                .delete()
                .eq('id', skillToDelete.id);
            
            if (deleteError) throw deleteError;
    
            // 2. Re-sequence all remaining skills in the group to ensure consistency
            const { data: remainingSkills, error: fetchError } = await supabase
                .from('skills')
                .select('id, display_order')
                .eq('group_id', skillGroupId)
                .order('display_order', { ascending: true });

            if (fetchError) throw fetchError;
            if (!remainingSkills) return;

            const updatePromises = remainingSkills.map((skill, index) => {
                const expectedOrder = index + 1;
                 if (skill.display_order !== expectedOrder) {
                    return supabase.from('skills').update({ display_order: expectedOrder }).eq('id', skill.id);
                }
                return null;
            }).filter(p => p); // Filter out nulls
    
            await Promise.all(updatePromises);
    
            toast({
                title: 'Skill Deleted',
                description: `The skill "${skillToDelete.name}" has been deleted.`,
            });
    
        } catch (error: any) {
             console.error('Error deleting skill:', error);
            toast({
                variant: 'destructive',
                title: 'Delete Failed',
                description: 'An error occurred while deleting the skill. Please try again.',
            });
        } finally {
            fetchSkills();
            setSkillToDelete(null);
        }
    };
    

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
            <Card className="bg-card relative">
                {isLoggedIn && (
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsAddGroupDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Group
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setIsAddSkillDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                        </Button>
                    </div>
                )}
                <CardContent className="p-8 pt-20">
                    <div className="space-y-8">
                        {skillGroups.map((group) => (
                            <div key={group.id}>
                                <div className="flex justify-center items-center mb-4">
                                  <div className="inline-block text-center">
                                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mb-2"></div>
                                    <h3 className="text-lg font-semibold text-foreground text-center">{group.title}</h3>
                                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-2"></div>
                                  </div>
                                  {isLoggedIn && (
                                    <Button variant="ghost" size="icon" className="ml-4" onClick={() => handleDeleteGroupClick(group)}>
                                        <Trash2 className="h-4 w-4 text-destructive/70 hover:text-destructive" />
                                    </Button>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {group.skills.map((skill) => (
                                    <Badge
                                        key={skill.id}
                                        variant="outline"
                                        className={cn(
                                            "text-base px-4 py-2 rounded-lg justify-center transition-transform hover:scale-105 hover:bg-primary/20 bg-transparent relative group",
                                            isLoggedIn && "pr-8"
                                        )}
                                    >
                                        {skill.name}
                                        {isLoggedIn && (
                                            <button 
                                                onClick={() => handleDeleteSkillClick(skill)}
                                                className="absolute top-1/2 right-1 -translate-y-1/2 w-6 h-6 bg-transparent rounded-full items-center justify-center text-destructive/50 hover:text-destructive hover:bg-destructive/10 hidden group-hover:flex"
                                                aria-label={`Delete skill ${skill.name}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {isLoggedIn && (
              <AddSkillGroupDialog
                isOpen={isAddGroupDialogOpen}
                onOpenChange={setIsAddGroupDialogOpen}
                onGroupAdded={fetchSkills}
                skillGroups={skillGroups}
              />
            )}
            {isLoggedIn && (
                <AddSkillDialog
                    isOpen={isAddSkillDialogOpen}
                    onOpenChange={setIsAddSkillDialogOpen}
                    onSkillAdded={fetchSkills}
                    skillGroups={skillGroups}
                />
            )}
            {isLoggedIn && groupToDelete && (
              <DeleteConfirmationDialog
                isOpen={isDeleteGroupDialogOpen}
                onOpenChange={setIsDeleteGroupDialogOpen}
                onConfirm={handleDeleteGroupConfirm}
                title={`Delete "${groupToDelete.title}"?`}
                description="This will permanently delete the group and all skills within it. This action cannot be undone."
              />
            )}
            {isLoggedIn && skillToDelete && (
              <DeleteConfirmationDialog
                isOpen={isDeleteSkillDialogOpen}
                onOpenChange={setIsDeleteSkillDialogOpen}
                onConfirm={handleDeleteSkillConfirm}
                title={`Delete "${skillToDelete.name}"?`}
                description="This will permanently delete the skill. This action cannot be undone."
              />
            )}
        </section>
    )
}
