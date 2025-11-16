
'use client';

import React, { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    // Di sini, Anda bisa mengirimkan data rating dan review ke backend
    // Untuk saat ini, kita hanya akan menampilkannya di konsol dan toast
    console.log({ rating, review });
    toast({
      title: 'Terima Kasih!',
      description: 'Penilaian Anda sangat berarti bagi kami.',
    });
    // Reset state setelah submit
    setRating(0);
    setHoverRating(0);
    setReview('');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-2xl space-y-8">
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="bg-card p-6 text-center">
                  <Star className="mx-auto h-12 w-12 text-primary" />
                  <CardTitle className="mt-4 text-3xl font-bold text-primary">Beri Penilaian</CardTitle>
                  <CardDescription className="text-muted-foreground">Bagaimana pengalaman Anda mengunjungi website ini?</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-center gap-2" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-10 w-10 cursor-pointer transition-colors',
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
                      rows={5}
                    />
                    <Button onClick={handleSubmit} disabled={rating === 0} className="w-full">
                      Kirim Penilaian
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
