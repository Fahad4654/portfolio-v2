'use client';

import { useState, useEffect, ChangeEvent } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { useInfo } from '@/context/InfoContext';

type Info = {
  id: string;
  name: string;
  profile_pic_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  profession: string;
  email: string;
};

interface EditInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// Helper function to upload image
const uploadProfilePicture = async (file: File): Promise<string> => {
  const imageFormData = new FormData();
  imageFormData.append('file', file);

  const response = await fetch('/api/upload-profile-pic', {
    method: 'POST',
    body: imageFormData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Image upload failed.');
  }

  return result.imageUrl;
};

// Helper function to update info
const updateInfo = async (payload: any) => {
  const updateResponse = await fetch('/api/update-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const updateResult = await updateResponse.json();

  if (!updateResponse.ok) {
    throw new Error(updateResult.message || 'Failed to update information.');
  }
};


export const EditInfoDialog = ({
  isOpen,
  onOpenChange,
}: EditInfoDialogProps) => {
  const { toast } = useToast();
  const { info, fetchInfo } = useInfo();
  const [formData, setFormData] = useState<Partial<Info> | null>(info);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingPicture, setIsSavingPicture] = useState(false);

  useEffect(() => {
    setFormData(info);
    setImagePreviewUrl(null);
    setNewImageFile(null);
  }, [info, isOpen]);

  if (!formData) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => prev ? ({ ...prev, [id]: value }) : null);
  };
  
  const handleImageSave = async () => {
    if (!newImageFile || !info) {
        toast({
            variant: 'destructive',
            title: 'No Image Selected',
            description: 'Please select a new profile picture to upload.',
        });
        return;
    }
    setIsSavingPicture(true);
    try {
        const imageUrl = await uploadProfilePicture(newImageFile);
        await updateInfo({ id: info.id, profile_pic_url: imageUrl });
        toast({
            title: 'Profile Picture Updated',
            description: 'Your new profile picture has been saved.',
        });
        setNewImageFile(null);
        fetchInfo();
    } catch (error: any) {
        console.error('Error uploading/saving profile picture:', error);
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: error.message || 'Could not save the new profile picture.',
        });
    } finally {
        setIsSavingPicture(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !info) return;
    setIsSavingInfo(true);

    try {
        const updatePayload = {
            id: info.id,
            name: formData.name,
            profession: formData.profession,
            email: formData.email,
            facebook_url: formData.facebook_url,
            instagram_url: formData.instagram_url,
            linkedin_url: formData.linkedin_url,
            github_url: formData.github_url,
        };

        await updateInfo(updatePayload);

        toast({
            title: 'Info Updated',
            description: 'Your information has been successfully updated.',
        });
        fetchInfo();
        onOpenChange(false);

    } catch (error: any) {
        console.error('Error updating info:', error);
        toast({
            variant: 'destructive',
            title: 'Update Failed',
            description: error.message || 'Could not save your changes. Please try again.',
        });
    } finally {
        setIsSavingInfo(false);
    }
  };

  const isSaving = isSavingInfo || isSavingPicture;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit General Information</DialogTitle>
          <DialogDescription>
            Make changes to your general info here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            
            <div className='space-y-2'>
                <Label htmlFor="image-upload">Profile Picture</Label>
                <div className='relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-muted'>
                    {imagePreviewUrl ? (
                         <Image src={imagePreviewUrl} alt="New profile image preview" layout="fill" objectFit="cover" />
                    ) : formData.profile_pic_url ? (
                        <Image src={formData.profile_pic_url} alt={formData.name || 'Profile'} layout="fill" objectFit="cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Skeleton className="w-full h-full rounded-full" />
                        </div>
                    )}
                </div>
                <Input id="image-upload" type="file" onChange={handleFileChange} accept="image/*" disabled={isSaving} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profession" className="text-right">Profession</Label>
              <Input id="profession" value={formData.profession || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={formData.email || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="github_url" className="text-right">GitHub URL</Label>
              <Input id="github_url" value={formData.github_url || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin_url" className="text-right">LinkedIn URL</Label>
              <Input id="linkedin_url" value={formData.linkedin_url || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="facebook_url" className="text-right">Facebook URL</Label>
              <Input id="facebook_url" value={formData.facebook_url || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instagram_url" className="text-right">Instagram URL</Label>
              <Input id="instagram_url" value={formData.instagram_url || ''} onChange={handleChange} className="col-span-3" disabled={isSaving}/>
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancel</Button>
             {newImageFile && (
                <Button type="button" variant="secondary" onClick={handleImageSave} disabled={isSaving}>
                    {isSavingPicture ? 'Saving Picture...' : 'Save Picture'}
                </Button>
            )}
            <Button type="submit" disabled={isSaving}>
              {isSavingInfo ? 'Saving Info...' : 'Save Info'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
