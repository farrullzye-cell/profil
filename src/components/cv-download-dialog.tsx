
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
        description: 'CV Anda sedang diunduh.',
      });

      // Trigger download
      const link = document.createElement('a');
      link.href = '/cv-arul-faathir.pdf';
      link.download = 'CV-Arul-Faathir.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
          <DialogTitle className="text-center text-2xl">Unduh Curriculum Vitae</DialogTitle>
          <DialogDescription className="text-center">
            Untuk melanjutkan, silakan masukkan kata sandi untuk mengunduh CV.
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
            Unduh CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
