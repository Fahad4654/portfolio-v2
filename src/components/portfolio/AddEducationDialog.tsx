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
import { useToast } from '@/hooks/use-toast';

type Education = {
    id: number;
    degree: string;
    institution: string;
    link: string | null;
    period: string;
    display_order: number;
};

interface AddEducationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEducationAdded: () => void;
  educations: Education[];
}

export const AddEducationDialog = ({
  isOpen,
  onOpenChange,
  onEducationAdded,
  educations,
}: AddEducationDialogProps) => {
  const { toast } = useToast();
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [link, setLink] = useState('');
  const [period, setPeriod] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setDegree('');
    setInstitution('');
    setLink('');
    setPeriod('');
    setDisplayOrder('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim() || !period.trim()) {
        toast({
            variant: 'destructive',
            title: 'Required fields are missing',
            description: 'Please fill out Degree, Institution, and Period.',
        });
        return;
    }
    setIsSaving(true);

    try {
      const newOrder = displayOrder ? parseInt(displayOrder, 10) : null;
      const newEducationData = {
          degree,
          institution,
          link: link || null,
          period,
          display_order: (newOrder && !isNaN(newOrder) && newOrder > 0) ? newOrder : null,
      };

      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEducationData),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to add education entry.');
      }

      toast({
        title: 'Education Added',
        description: `The entry for "${degree}" has been added.`,
      });
      resetForm();
      onEducationAdded(); // Refetch
      onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding education entry:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: error.message || 'Could not add the new education entry. Please try again.',
        });
        onEducationAdded();
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle>Add New Education Entry</DialogTitle>
          <DialogDescription>
            Fill in the details for the new education entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="degree" className="text-right">Degree</Label>
              <Input id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} className="col-span-3" placeholder="e.g., B.Sc. in CSE" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">Institution</Label>
              <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} className="col-span-3" placeholder="e.g., University of Example" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">Link</Label>
              <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} className="col-span-3" placeholder="Optional institution URL"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">Period</Label>
              <Input id="period" value={period} onChange={(e) => setPeriod(e.target.value)} className="col-span-3" placeholder="e.g., 2018 - 2022" required/>
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
