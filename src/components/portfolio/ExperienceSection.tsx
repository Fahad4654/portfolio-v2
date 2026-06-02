"use client";

import { useState, useEffect, useCallback } from "react";
import { Briefcase, ChevronDown, Edit, PlusCircle, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { EditExperienceDialog } from "./EditExperienceDialog";
import { AddExperienceDialog } from "./AddExperienceDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

type Experience = {
  id: number;
  title: string;
  company: string;
  company_link: string | null;
  period: string;
  description: string[];
  display_order: number;
};

export const ExperienceSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [experienceToDelete, setExperienceToDelete] =
    useState<Experience | null>(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/experiences?_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) {
        console.error("Error fetching experiences:", res.statusText);
      } else {
        const data = await res.json();
        setExperiences(data as Experience[]);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleEditClick = (exp: Experience) => {
    setSelectedExperience(exp);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (exp: Experience) => {
    setExperienceToDelete(exp);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!experienceToDelete) return;
    try {
      const res = await fetch(`/api/experiences?id=${experienceToDelete.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Delete failed');
      }

      toast({
        title: "Experience Entry Deleted",
        description: `The entry "${experienceToDelete.title}" has been deleted.`,
      });
    } catch (error: any) {
      console.error("Error deleting experience entry:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Could not delete the experience entry. Please try again.",
      });
    } finally {
      fetchExperiences();
      setExperienceToDelete(null);
    }
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
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary text-center">
          Work Experience
        </h2>
      </div>
      <div className="mb-8">
        {" "}
        {isLoggedIn && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-8">
        {experiences.map((exp, index) => (
          <Card
            key={exp.id}
            className="bg-card hover:border-primary/50 transition-colors group"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold font-headline">
                    {exp.title}
                  </CardTitle>
                  <CardDescription>
                    {exp.company_link ? (
                      <a
                        href={exp.company_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                    <span className="block text-sm text-muted-foreground mt-1">
                      {exp.period}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isLoggedIn && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 h-8 w-8"
                        onClick={() => handleEditClick(exp)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="shrink-0 h-8 w-8"
                        onClick={() => handleDeleteClick(exp)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Briefcase className="h-8 w-8 text-primary shrink-0" />
                </div>
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
              <Button
                variant="link"
                onClick={() => toggleExpand(index)}
                className="p-0 h-auto text-primary"
              >
                {expanded === index ? "Show less" : "Show more"}
                <ChevronDown
                  className={cn(
                    "ml-2 h-4 w-4 transition-transform",
                    expanded === index && "rotate-180",
                  )}
                />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {isLoggedIn && (
        <EditExperienceDialog
          experience={selectedExperience}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onExperienceUpdate={fetchExperiences}
        />
      )}
      {isLoggedIn && (
        <AddExperienceDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onExperienceAdded={fetchExperiences}
          experiences={experiences}
        />
      )}
      {isLoggedIn && experienceToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          title={`Delete "${experienceToDelete.title}"?`}
          description="This will permanently delete this work experience entry. This action cannot be undone."
        />
      )}
    </section>
  );
};
