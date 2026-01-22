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

      // If no order is given, simply add to the end
      if (newOrder === null || isNaN(newOrder) || newOrder <= 0) {
        const maxDisplayOrder = skillGroups.length > 0 ? Math.max(...skillGroups.map(g => g.display_order)) : 0;
        const { error } = await supabase.from('skill_groups').insert({
          title: title,
          display_order: maxDisplayOrder + 1,
        });
        if (error) throw error;
      } else {
        // If an order is given, we must re-sequence everything to ensure consistency
        const currentGroups = [...skillGroups].sort((a,b) => a.display_order - b.display_order);

        // Insert the new group with a temporary high order to avoid conflicts
        const { data: newGroup, error: insertError } = await supabase
            .from('skill_groups')
            .insert({ title: title, display_order: 9999 })
            .select('id')
            .single();

        if (insertError || !newGroup) throw insertError || new Error("Group insertion failed to return new group.");

        // Create the final, correctly-ordered list in memory
        const insertionIndex = Math.min(Math.max(0, newOrder - 1), currentGroups.length);
        const finalOrderedGroups = [
          ...currentGroups.slice(0, insertionIndex),
          { id: newGroup.id, title, display_order: 0, skills: [] }, // Placeholder for new group
          ...currentGroups.slice(insertionIndex)
        ];

        // Create update promises to re-sequence all groups in the database
        const updatePromises = finalOrderedGroups.map((group, index) => {
          const expectedOrder = index + 1;
          return supabase.from('skill_groups').update({ display_order: expectedOrder }).eq('id', group.id);
        });
        await Promise.all(updatePromises);
      }

      toast({
        title: 'Skill Group Added',
        description: `The group "${title}" has been created.`,
      });
      resetForm();
      onGroupAdded(); // This will refetch and re-render
      onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding skill group:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: 'Could not add the new skill group. Please try again.',
        });
        // Important: refetch to revert inconsistent state
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
