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

type Profile = {
  id: number;
  headline: string;
  bio1: string;
  bio2: string;
  location: string;
  phone: string;
  email: string;
  resume_url: string;
};

interface EditProfileDialogProps {
  profile: Profile;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProfileUpdate: () => void;
}

export const EditProfileDialog = ({
  profile,
  isOpen,
  onOpenChange,
  onProfileUpdate,
}: EditProfileDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: profile.id,
          headline: formData.headline,
          bio1: formData.bio1,
          bio2: formData.bio2,
          location: formData.location,
          phone: formData.phone,
          email: formData.email,
          resume_url: formData.resume_url,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Update failed');
      }

      toast({
        title: 'Profile Updated',
        description: 'Your personal information has been saved.',
      });
      onProfileUpdate();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your changes. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit Personal Info</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="headline" className="text-right">
                Headline
              </Label>
              <Input
                id="headline"
                value={formData.headline}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio1" className="text-right pt-2">
                Bio 1
              </Label>
              <Textarea
                id="bio1"
                value={formData.bio1}
                onChange={handleChange}
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio2" className="text-right pt-2">
                Bio 2
              </Label>
              <Textarea
                id="bio2"
                value={formData.bio2}
                onChange={handleChange}
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume_url" className="text-right">
                Resume URL
              </Label>
              <Input
                id="resume_url"
                value={formData.resume_url}
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
