'use client';

import { useState, ChangeEvent } from 'react';
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

interface AddProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectAdded: () => void;
  projects: Project[];
}

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

export const AddProjectDialog = ({
  isOpen,
  onOpenChange,
  onProjectAdded,
  projects,
}: AddProjectDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [statusText, setStatusText] = useState('View Live Site');
  const [tags, setTags] = useState('');
  const [hint, setHint] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLink('');
    setStatusText('View Live Site');
    setTags('');
    setHint('');
    setDisplayOrder('');
    setImageFile(null);
    setImagePreviewUrl(null);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
        toast({
            variant: 'destructive',
            title: 'Required fields are missing',
            description: 'Please fill out Title and Description.',
        });
        return;
    }
    if (!imageFile) {
        toast({
            variant: 'destructive',
            title: 'Image is required',
            description: 'Please upload an image for the project.',
        });
        return;
    }
    setIsSaving(true);

    try {
      const imageUrl = await uploadProjectImage(imageFile);

      const newOrder = displayOrder ? parseInt(displayOrder, 10) : null;
      const newProjectData = {
          title,
          description,
          link: link || null,
          status_text: statusText,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          hint,
          image: imageUrl,
          display_order: (newOrder && !isNaN(newOrder) && newOrder > 0) ? newOrder : null,
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectData),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to add project.');
      }

      toast({
        title: 'Project Added',
        description: `The project "${title}" has been added.`,
      });
      resetForm();
      onProjectAdded();
      onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding project:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: error.message || 'Could not add the new project. Please try again.',
        });
        onProjectAdded();
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill in the details for the new project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            
            <div className='space-y-2'>
                <Label htmlFor="image-upload">Project Image</Label>
                <div className='relative w-full h-56 rounded-md overflow-hidden bg-muted'>
                    {imagePreviewUrl ? (
                         <Image src={imagePreviewUrl} alt="New project image preview" layout="fill" objectFit="cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <p className="text-sm text-muted-foreground">Select an image to preview</p>
                        </div>
                    )}
                </div>
                <Input id="image-upload" type="file" onChange={handleFileChange} accept="image/*" disabled={isSaving} required/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" required/>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 min-h-[100px]" required/>
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="col-span-3" placeholder='Comma-separated, e.g., React, Node.js'/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">Image Hint</Label>
              <Input id="hint" value={hint} onChange={(e) => setHint(e.target.value)} className="col-span-3" placeholder='e.g., business app'/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">Project Link</Label>
              <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} className="col-span-3"/>
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="statusText" className="text-right">Link Text</Label>
              <Input id="statusText" value={statusText} onChange={(e) => setStatusText(e.target.value)} className="col-span-3"/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display_order" className="text-right">Order</Label>
              <Input id="display_order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} className="col-span-3" placeholder="Optional (e.g., 1)" min="1"/>
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
