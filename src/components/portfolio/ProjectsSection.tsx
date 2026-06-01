"use client";

import Image from "next/image";
import { ArrowRight, Edit, PlusCircle, Trash2 } from "lucide-react";
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
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { EditProjectDialog } from "./EditProjectDialog";
import { AddProjectDialog } from "./AddProjectDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  hint: string;
  link: string | null;
  tags: string[];
  status_text: string;
  display_order: number;
};

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) {
        console.error("Error fetching projects:", res.statusText);
      } else {
        const data = await res.json();
        setProjects(data as Project[]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/projects?id=${projectToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Delete failed');
      }

      toast({
        title: "Project Deleted",
        description: `The project "${projectToDelete.title}" has been deleted.`,
      });
    } catch (error: any) {
      console.error("Error deleting project:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Could not delete the project. Please try again.",
      });
    } finally {
      fetchProjects();
      setProjectToDelete(null);
    }
  };

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
    );
  }

  return (
    <section id="portfolio">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary text-center">
          My Projects
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
              Add Project
            </Button>
          </div>
        )}
      </div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-card"
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditClick(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteClick(project)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {isLoggedIn && (
        <EditProjectDialog
          project={selectedProject}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onProjectUpdate={fetchProjects}
        />
      )}
      {isLoggedIn && (
        <AddProjectDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onProjectAdded={fetchProjects}
          projects={projects}
        />
      )}
      {isLoggedIn && projectToDelete && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          title={`Delete "${projectToDelete.title}"?`}
          description="This will permanently delete this project entry from the database. The uploaded image will not be deleted. This action cannot be undone."
        />
      )}
    </section>
  );
};
