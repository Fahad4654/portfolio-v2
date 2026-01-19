'use client';

import { useState, useEffect } from 'react';
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
import { supabase } from '@/lib/supabaseClient';

type Experience = {
  id: number;
  title: string;
  company: string;
  company_link: string | null;
  period: string;
  description: string[];
};

interface EditExperienceDialogProps {
  experience: Experience | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onExperienceUpdate: () => void;
}

export const EditExperienceDialog = ({
  experience,
  isOpen,
  onOpenChange,
  onExperienceUpdate,
}: EditExperienceDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(experience);
  const [descriptionText, setDescriptionText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(experience);
    if (experience) {
      setDescriptionText(experience.description.join('\n'));
    }
  }, [experience]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => prev ? ({ ...prev, [id]: value }) : null);
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);

    const updatedExperience = {
      ...formData,
      description: descriptionText.split('\n').filter(line => line.trim() !== ''),
    };

    const { error } = await supabase
      .from('experiences')
      .update({
        title: updatedExperience.title,
        company: updatedExperience.company,
        company_link: updatedExperience.company_link,
        period: updatedExperience.period,
        description: updatedExperience.description,
      })
      .eq('id', updatedExperience.id);

    setIsSaving(false);

    if (error) {
      console.error('Error updating experience:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your changes. Please try again.',
      });
    } else {
      toast({
        title: 'Experience Updated',
        description: 'Your work experience has been saved.',
      });
      onExperienceUpdate();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit Work Experience</DialogTitle>
          <DialogDescription>
            Make changes to your work experience entry here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company_link" className="text-right">
                Company Link
              </Label>
              <Input
                id="company_link"
                value={formData.company_link || ''}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <Input
                id="period"
                value={formData.period}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={descriptionText}
                onChange={handleDescriptionChange}
                className="col-span-3 min-h-[150px]"
                placeholder="Enter each point on a new line..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
