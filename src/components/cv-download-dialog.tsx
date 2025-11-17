
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DownloadCloud, KeyRound } from 'lucide-react';

export function CvDownloadDialog({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    if (password === 'ArulFaathir1223') {
      toast({
        title: 'Berhasil!',
        description: 'Membuka CV Anda di tab baru.',
      });

      // Open the external link in a new tab
      window.open('https://issuu.com/arul_fait/docs/cv_mohammad_arul_faathir_ervansyah', '_blank');

      setOpen(false); // Close dialog on success
      setPassword(''); // Reset password
    } else {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Kata sandi yang Anda masukkan salah.',
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center">
            <DownloadCloud className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">Lihat Curriculum Vitae</DialogTitle>
          <DialogDescription className="text-center">
            Untuk melanjutkan, silakan masukkan kata sandi untuk melihat CV.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              <KeyRound className="inline-block h-5 w-5" />
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="col-span-3"
              placeholder="Masukkan kata sandi..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleDownload} className="w-full">
            Buka CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
