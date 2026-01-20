
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
import { supabase } from '@/lib/supabaseClient';

interface AddSkillGroupDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGroupAdded: () => void;
  maxDisplayOrder: number;
}

export const AddSkillGroupDialog = ({
  isOpen,
  onOpenChange,
  onGroupAdded,
  maxDisplayOrder,
}: AddSkillGroupDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        toast({
            variant: 'destructive',
            title: 'Title is required',
            description: 'Please enter a title for the new skill group.',
        });
        return;
    }
    setIsSaving(true);

    const { error } = await supabase
      .from('skill_groups')
      .insert({
        title: title,
        display_order: maxDisplayOrder + 1,
      });

    setIsSaving(false);

    if (error) {
      console.error('Error adding skill group:', error);
      toast({
        variant: 'destructive',
        title: 'Add Failed',
        description: 'Could not add the new skill group. Please try again.',
      });
    } else {
      toast({
        title: 'Skill Group Added',
        description: `The group "${title}" has been created.`,
      });
      setTitle('');
      onGroupAdded();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle>Add New Skill Group</DialogTitle>
          <DialogDescription>
            Enter a title for the new group of skills.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Cloud & Infrastructure"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
