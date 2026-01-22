
'use client';

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  hint: string;
  link: string | null;
  tags: string[];
  status_text: string;
};

interface EditProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectUpdate: () => void;
}

// Helper function to upload project image
const uploadProjectImage = async (file: File): Promise<string> => {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Image upload failed.');
  }
  return result.imageUrl;
}

// Helper function to update project data
const updateProject = async (id: number, data: any) => {
  const response = await fetch('/api/update-project', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...data }),
  });

  const result = await response.json();
  if (!response.ok) {
      throw new Error(result.message || 'Failed to update project.');
  }
}

export const EditProjectDialog = ({
  project,
  isOpen,
  onOpenChange,
  onProjectUpdate,
}: EditProjectDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(project);
  const [tagsText, setTagsText] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    // If the dialog is transitioning from closed to open, sync the form.
    // This prevents wiping user edits if `project` refetches while the dialog is open.
    if (isOpen && !isOpenRef.current) {
        setFormData(project);
        if (project) {
            setTagsText(project.tags.join(', '));
        }
        setImagePreviewUrl(null);
        setNewImageFile(null);
    }
    // Update the ref to the current state for the next render.
    isOpenRef.current = isOpen;
  }, [isOpen, project]);

  if (!formData) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'tags') {
        setTagsText(value);
    }
    else {
        setFormData((prev) => prev ? ({ ...prev, [id]: value }) : null);
    }
  };
  
  const handleImageSave = async () => {
    if (!newImageFile || !formData) {
        toast({
            variant: 'destructive',
            title: 'No Image Selected',
            description: 'Please select a new project image to upload.',
        });
        return;
    }
    setIsSavingImage(true);
    try {
        const imageUrl = await uploadProjectImage(newImageFile);
        await updateProject(formData.id, { image: imageUrl });
        toast({
            title: 'Project Image Updated',
            description: 'Your new project image has been saved.',
        });
        setNewImageFile(null);
        onProjectUpdate();
    } catch (error: any) {
        console.error('Error saving project image:', error);
        toast({
            variant: 'destructive',
            title: 'Image Save Failed',
            description: error.message || 'Could not save the new project image.',
        });
    } finally {
        setIsSavingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSavingInfo(true);

    try {
        const updatedProjectData = {
            title: formData.title,
            description: formData.description,
            link: formData.link,
            status_text: formData.status_text,
            hint: formData.hint,
            tags: tagsText.split(',').map(tag => tag.trim()).filter(tag => tag),
        };

        await updateProject(formData.id, updatedProjectData);

        toast({
            title: 'Project Updated',
            description: 'Your project has been successfully updated.',
        });
        onProjectUpdate();
        onOpenChange(false);

    } catch (error: any) {
        console.error('Error updating project:', error);
        toast({
            variant: 'destructive',
            title: 'Update Failed',
            description: error.message || 'Could not save your changes. Please try again.',
        });
    } finally {
        setIsSavingInfo(false);
    }
  };
  
  const isSaving = isSavingInfo || isSavingImage;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            
            <div className='space-y-2'>
                <Label htmlFor="image-upload">Project Image</Label>
                <div className='relative w-full h-56 rounded-md overflow-hidden bg-muted'>
                    {imagePreviewUrl ? (
                         <Image src={imagePreviewUrl} alt="New project image preview" layout="fill" objectFit="cover" />
                    ) : formData.image ? (
                        <Image src={formData.image} alt={formData.title} layout="fill" objectFit="cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Skeleton className="w-full h-full" />
                        </div>
                    )}
                </div>
                <Input id="image-upload" type="file" onChange={handleFileChange} accept="image/*" disabled={isSaving} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
                disabled={isSaving}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3 min-h-[100px]"
                disabled={isSaving}
              />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={tagsText}
                onChange={handleChange}
                className="col-span-3"
                placeholder='Comma-separated, e.g., React, Node.js'
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">
                Image Hint
              </Label>
              <Input
                id="hint"
                value={formData.hint}
                onChange={handleChange}
                className="col-span-3"
                placeholder='e.g., business app'
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Project Link
              </Label>
              <Input
                id="link"
                value={formData.link || ''}
                onChange={handleChange}
                className="col-span-3"
                disabled={isSaving}
              />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status_text" className="text-right">
                Link Text
              </Label>
              <Input
                id="status_text"
                value={formData.status_text}
                onChange={handleChange}
                className="col-span-3"
                placeholder='e.g., View Live Site'
                disabled={isSaving}
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
            {newImageFile && (
                <Button type="button" variant="secondary" onClick={handleImageSave} disabled={isSaving}>
                    {isSavingImage ? 'Saving Image...' : 'Save Image'}
                </Button>
            )}
            <Button type="submit" disabled={isSaving}>
              {isSavingInfo ? 'Saving Info...' : 'Save Info'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
