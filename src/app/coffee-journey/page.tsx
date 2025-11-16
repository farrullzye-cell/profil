
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Route, MapPin, Leaf, Wind, BookOpen, Atom, Home } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

const journeyData = [
    {
        id: 'journey-gayo-1',
        region: 'Kedai Kopi Lokal',
        year: 'Awal 2024',
        title: 'Cangkir Pertama yang Mengubah Segalanya',
        description: 'Semua berawal di sini. Mencicipi secangkir kopi Gayo yang diseduh manual. Untuk pertama kalinya, saya sadar kopi bukan cuma pahit, tapi ada rasa buah dan rempah. Momen "wow" yang memulai semuanya.',
        icon: <Atom className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-kintamani-2',
        region: 'Dapur Pribadi',
        year: 'Pertengahan 2024',
        title: 'Petualangan V60 Pertama: Gagal & Penasaran',
        description: 'Bermodal nekat membeli V60 dan paper filter. Hasil seduhan pertama? Terlalu encer dan asam. Tapi dari kegagalan itu, rasa penasaran justru membesar. Saya mulai belajar tentang rasio, suhu, dan teknik tuang.',
        icon: <Home className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-toraja-3',
        region: 'Toko Biji Kopi',
        year: 'Pertengahan 2024',
        title: 'Tersesat di "Hutan" Biji Kopi',
        description: 'Pertama kali memberanikan diri masuk ke toko khusus biji kopi. Bingung dengan istilah "washed", "natural", "honey". Pulang membawa sebungkus biji Toraja dengan sejuta pertanyaan baru di kepala.',
        icon: <Leaf className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-sidamo-4',
        region: 'Dunia Maya',
        year: 'Akhir 2024',
        title: 'Menemukan Komunitas dan Guru Online',
        description: 'Menghabiskan waktu berjam-jam menonton video review dan tutorial. Belajar banyak dari para ahli di internet. Komunitas online menjadi tempat bertanya dan berbagi kebingungan sebagai seorang pemula.',
        icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-antioquia-5',
        region: 'Masa Depan',
        year: '2025 ~',
        title: 'Perjalanan Ini Baru Dimulai',
        description: 'Saya sadar perjalanan ini masih sangat panjang. Masih banyak biji kopi yang belum dicicipi, banyak metode yang belum dicoba. Rencana ke depan? Terus belajar, bereksperimen, dan yang terpenting, menikmati setiap cangkirnya.',
        icon: <Route className="h-6 w-6 text-primary" />,
    }
];


export default function CoffeeJourneyPage() {

    const journeys = useMemo(() => {
        return journeyData.map(journey => {
            const placeholder = PlaceHolderImages.find(p => p.id === journey.id);
            return {
                ...journey,
                placeholder
            }
        }).filter(j => j.placeholder);
    }, []);


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-8">
                <Card className="overflow-hidden rounded-xl shadow-lg">
                    <CardHeader className="bg-card p-6">
                        <div className="flex items-center gap-4">
                            <Route className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Coffee Journey</CardTitle>
                                <CardDescription className="text-muted-foreground">Catatan langkah-langkah awal seorang pemula di dunia kopi.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                 <div className="space-y-8">
                    {journeys.map((item, index) => (
                        <Card key={index} className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="relative h-56 w-full md:h-full">
                                    {item.placeholder && (
                                        <Image
                                            src={item.placeholder.imageUrl}
                                            alt={`Perjalanan ke ${item.region}`}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            className={index % 2 !== 0 ? 'md:order-last' : ''}
                                            data-ai-hint={item.placeholder.imageHint}
                                        />
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                     <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardDescription className="flex items-center gap-2">
                                                {item.icon}
                                                {item.region}
                                            </CardDescription>
                                            <span className="text-sm font-semibold text-primary">{item.year}</span>
                                        </div>
                                        <CardTitle className="text-xl text-accent">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                 </div>
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
