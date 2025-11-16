
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, UserCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, type DocumentData } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface Review extends DocumentData {
  id: string;
  rating: number;
  review: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const reviewsCollection = useMemo(() => {
      if (!firestore) return null;
      return collection(firestore, 'reviews');
  }, [firestore]);

  const reviewsQuery = useMemo(() => {
    if (!reviewsCollection) return null;
    return query(reviewsCollection, orderBy('createdAt', 'desc'));
  }, [reviewsCollection]);

  const { data: reviews, loading: reviewsLoading } = useCollection<Review>(reviewsQuery);

  const handleSubmit = async () => {
    if (!firestore) {
        toast({ variant: "destructive", title: "Error", description: "Tidak dapat terhubung ke database." });
        return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'reviews'), {
        rating,
        review,
        createdAt: serverTimestamp()
      });
      toast({
        title: 'Terima Kasih!',
        description: 'Penilaian Anda berhasil dikirim dan akan ditampilkan.',
      });
      setRating(0);
      setHoverRating(0);
      setReview('');
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan saat mengirim penilaian Anda. Silakan coba lagi.",
      });
    } finally {
        setIsSubmitting(false);
    }
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
                              : 'text-muted-foreground/50'
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
                    <Button onClick={handleSubmit} disabled={rating === 0 || isSubmitting} className="w-full">
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Kirim Penilaian
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Ulasan dari Pengguna Lain</CardTitle>
                    <CardDescription>Lihat apa kata mereka tentang website ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {reviewsLoading && (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="ml-4 text-muted-foreground">Memuat ulasan...</p>
                        </div>
                    )}
                    {!reviewsLoading && reviews && reviews.length === 0 && (
                        <p className="text-center text-muted-foreground p-8">Belum ada ulasan. Jadilah yang pertama!</p>
                    )}
                    {!reviewsLoading && reviews && reviews.map((r) => (
                        <div key={r.id} className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                            <UserCircle className="h-10 w-10 shrink-0 text-muted-foreground" />
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={cn(
                                                'h-4 w-4',
                                                r.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                                            )} />
                                        ))}
                                    </div>
                                    {r.createdAt && (
                                      <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(r.createdAt.seconds * 1000), { addSuffix: true, locale: id })}
                                      </p>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-foreground">{r.review}</p>
                            </div>
                        </div>
                    ))}
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
