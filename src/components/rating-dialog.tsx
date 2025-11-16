
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
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function RatingDialog({ children }: { children: React.ReactNode }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    // Di sini, Anda bisa mengirimkan data rating dan review ke backend
    // Untuk saat ini, kita hanya akan menampilkannya di konsol dan toast
    console.log({ rating, review });
    toast({
      title: 'Terima Kasih!',
      description: 'Penilaian Anda sangat berarti bagi kami.',
    });
    setIsOpen(false);
    // Reset state setelah submit
    setRating(0);
    setHoverRating(0);
    setReview('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Beri Penilaian</DialogTitle>
          <DialogDescription className="text-center">
            Bagaimana pengalaman Anda mengunjungi website ini?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-center gap-2 mb-4" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-8 w-8 cursor-pointer transition-colors',
                  (hoverRating || rating) >= star
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-muted-foreground'
                )}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Tulis ulasan Anda di sini..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Batal</Button>
          <Button type="submit" onClick={handleSubmit} disabled={rating === 0}>
            Kirim Penilaian
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
