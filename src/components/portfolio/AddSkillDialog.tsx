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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { SkillGroup } from './SkillsSection';

interface AddSkillDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSkillAdded: () => void;
  skillGroups: SkillGroup[];
}

export const AddSkillDialog = ({
  isOpen,
  onOpenChange,
  onSkillAdded,
  skillGroups,
}: AddSkillDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setName('');
    setGroupId('');
    setDisplayOrder('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        toast({
            variant: 'destructive',
            title: 'Skill name is required',
            description: 'Please enter a name for the new skill.',
        });
        return;
    }
    if (!groupId) {
        toast({
            variant: 'destructive',
            title: 'Group is required',
            description: 'Please select a skill group.',
        });
        return;
    }

    setIsSaving(true);

    try {
        const newOrder = displayOrder ? parseInt(displayOrder, 10) : null;
        const payload = {
            name,
            group_id: groupId,
            display_order: (newOrder && !isNaN(newOrder) && newOrder > 0) ? newOrder : null,
        };

        const res = await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const result = await res.json();
            throw new Error(result.message || 'Failed to add skill');
        }

        toast({
            title: 'Skill Added',
            description: `The skill "${name}" has been added.`,
        });
        resetForm();
        onSkillAdded();
        onOpenChange(false);

    } catch (error: any) {
        console.error('Error adding skill:', error);
        toast({
            variant: 'destructive',
            title: 'Add Failed',
            description: 'Could not add the new skill. Please try again.',
        });
        onSkillAdded();
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
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Enter a name for the new skill and select which group it belongs to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Skill Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., React"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Group
              </Label>
              <Select value={groupId} onValueChange={setGroupId}>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                      {skillGroups.map(group => (
                          <SelectItem key={group.id} value={group.id}>{group.title}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
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
              {isSaving ? 'Saving...' : 'Add Skill'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
