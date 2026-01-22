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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

type Education = {
  id: number;
  degree: string;
  institution: string;
  link: string | null;
  period: string;
};

interface EditEducationDialogProps {
  education: Education | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEducationUpdate: () => void;
}

export const EditEducationDialog = ({
  education,
  isOpen,
  onOpenChange,
  onEducationUpdate,
}: EditEducationDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(education);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(education);
  }, [education]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => prev ? ({ ...prev, [id]: value }) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);

    const { error } = await supabase
      .from('education')
      .update({
        degree: formData.degree,
        institution: formData.institution,
        link: formData.link,
        period: formData.period,
      })
      .eq('id', formData.id);

    setIsSaving(false);

    if (error) {
      console.error('Error updating education:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your changes. Please try again.',
      });
    } else {
      toast({
        title: 'Education Updated',
        description: 'Your education information has been saved.',
      });
      onEducationUpdate();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
          <DialogDescription>
            Make changes to your education entry here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree" className="text-right">
                Degree
              </Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">
                Institution
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                value={formData.link || ''}
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
