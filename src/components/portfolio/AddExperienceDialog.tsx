'use client';

import { useState } from 'react';
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
    display_order: number;
};

interface AddExperienceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onExperienceAdded: () => void;
  experiences: Experience[];
}

export const AddExperienceDialog = ({
  isOpen,
  onOpenChange,
  onExperienceAdded,
  experiences,
}: AddExperienceDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setTitle('');
    setCompany('');
    setCompanyLink('');
    setPeriod('');
    setDescription('');
    setDisplayOrder('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !period.trim()) {
        toast({
            variant: 'destructive',
            title: 'Required fields are missing',
            description: 'Please fill out Title, Company, and Period.',
        });
        return;
    }
    setIsSaving(true);

    try {
      const newOrder = displayOrder ? parseInt(displayOrder, 10) : null;
      const newExperienceData = {
          title,
          company,
          company_link: companyLink || null,
          period,
          description: description.split('\n').filter(line => line.trim() !== ''),
      };

      if (newOrder === null || isNaN(newOrder) || newOrder <= 0) {
        const maxDisplayOrder = experiences.length > 0 ? Math.max(...experiences.map(e => e.display_order)) : 0;
        const { error } = await supabase.from('experiences').insert({
          ...newExperienceData,
          display_order: maxDisplayOrder + 1,
        });
        if (error) throw error;
      } else {
        const currentExperiences = [...experiences].sort((a,b) => a.display_order - b.display_order);

        const { data: newEntry, error: insertError } = await supabase
            .from('experiences')
            .insert({ ...newExperienceData, display_order: 9999 })
            .select('id')
            .single();

        if (insertError || !newEntry) throw insertError || new Error("Experience entry insertion failed.");

        const insertionIndex = Math.min(Math.max(0, newOrder - 1), currentExperiences.length);
        const finalOrderedExperiences = [
          ...currentExperiences.slice(0, insertionIndex),
          { id: newEntry.id, ...newExperienceData, display_order: 0 } as Experience,
          ...currentExperiences.slice(insertionIndex)
        ];

        const updatePromises = finalOrderedExperiences.map((exp, index) => {
          const expectedOrder = index + 1;
          return supabase.from('experiences').update({ display_order: expectedOrder }).eq('id', exp.id);
        });
        await Promise.all(updatePromises);
      }

      toast({
        title: 'Experience Added',
        description: `The entry for "${title}" has been added.`,
      });
      resetForm();
      onExperienceAdded();
      onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding experience entry:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: 'Could not add the new experience entry. Please try again.',
        });
        onExperienceAdded();
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
          <DialogTitle>Add New Work Experience</DialogTitle>
          <DialogDescription>
            Fill in the details for the new experience entry. For the description, enter each point on a new line.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" placeholder="e.g., DevOps Engineer"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="col-span-3" placeholder="e.g., Awesome Inc."/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyLink" className="text-right">Company Link</Label>
              <Input id="companyLink" value={companyLink} onChange={(e) => setCompanyLink(e.target.value)} className="col-span-3" placeholder="Optional company URL"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">Period</Label>
              <Input id="period" value={period} onChange={(e) => setPeriod(e.target.value)} className="col-span-3" placeholder="e.g., Jan 2023 - Present"/>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
               <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 min-h-[150px]"
                placeholder="Enter each point on a new line..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display_order" className="text-right">Order</Label>
              <Input id="display_order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} className="col-span-3" placeholder="Optional (e.g., 1)" min="1"/>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Entry'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
