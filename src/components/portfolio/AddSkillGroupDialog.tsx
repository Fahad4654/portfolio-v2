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
import { SkillGroup } from './SkillsSection';

interface AddSkillGroupDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGroupAdded: () => void;
  skillGroups: SkillGroup[];
}

export const AddSkillGroupDialog = ({
  isOpen,
  onOpenChange,
  onGroupAdded,
  skillGroups,
}: AddSkillGroupDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDisplayOrder('');
  }

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

    try {
      const newOrder = displayOrder ? parseInt(displayOrder, 10) : null;
      const payload = {
        title,
        display_order: (newOrder && !isNaN(newOrder) && newOrder > 0) ? newOrder : null,
      };

      const res = await fetch('/api/skill-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Failed to add group');
      }

      toast({
        title: 'Skill Group Added',
        description: `The group "${title}" has been created.`,
      });
      resetForm();
      onGroupAdded();
      onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding skill group:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: 'Could not add the new skill group. Please try again.',
        });
        onGroupAdded();
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
          <DialogTitle>Add New Skill Group</DialogTitle>
          <DialogDescription>
            Enter a title for the new group of skills. You can optionally set a display order.
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
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display_order" className="text-right">
                Order
              </Label>
              <Input
                id="display_order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className="col-span-3"
                placeholder="Optional (e.g., 1)"
                min="1"
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
