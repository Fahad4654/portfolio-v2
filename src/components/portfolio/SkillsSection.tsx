
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
import { Plus, PlusCircle, Trash2 } from "lucide-react";
import { AddSkillGroupDialog } from "./AddSkillGroupDialog";
import { useToast } from "@/hooks/use-toast";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

type Skill = {
    id: string;
    name: string;
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
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<SkillGroup | null>(null);

    const fetchSkills = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('skill_groups')
            .select('*, skills ( id, name )')
            .order('display_order', { ascending: true });

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
    
    const handleDeleteClick = (group: SkillGroup) => {
        setGroupToDelete(group);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!groupToDelete) return;

        try {
            // Delete associated skills first
            const { error: skillsError } = await supabase
                .from('skills')
                .delete()
                .eq('group_id', groupToDelete.id);
            if (skillsError) throw skillsError;

            // Delete the group itself
            const { error: groupError } = await supabase
                .from('skill_groups')
                .delete()
                .eq('id', groupToDelete.id);
            if (groupError) throw groupError;
            
            // Re-order remaining groups
            const deletedOrder = groupToDelete.display_order;
            const groupsToUpdate = skillGroups
                .filter(g => g.display_order > deletedOrder && g.id !== groupToDelete.id)
                .sort((a, b) => a.display_order - b.display_order);

            const updatePromises = groupsToUpdate.map(g =>
                supabase
                    .from('skill_groups')
                    .update({ display_order: g.display_order - 1 })
                    .eq('id', g.id)
            );
            await Promise.all(updatePromises);
            
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
            // Always refetch to ensure UI consistency
            fetchSkills();
            setGroupToDelete(null);
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
                        <Button variant="outline" size="sm">
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
                                    <Button variant="ghost" size="icon" className="ml-4" onClick={() => handleDeleteClick(group)}>
                                        <Trash2 className="h-4 w-4 text-destructive/70 hover:text-destructive" />
                                    </Button>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {group.skills.map((skill) => (
                                    <Badge
                                        key={skill.id}
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
            {isLoggedIn && (
              <AddSkillGroupDialog
                isOpen={isAddGroupDialogOpen}
                onOpenChange={setIsAddGroupDialogOpen}
                onGroupAdded={fetchSkills}
                skillGroups={skillGroups}
              />
            )}
            {isLoggedIn && groupToDelete && (
              <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                title={`Delete "${groupToDelete.title}"?`}
                description="This will permanently delete the group and all skills within it. This action cannot be undone."
              />
            )}
        </section>
    )
}
