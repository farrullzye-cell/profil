
'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera, Quote, Coffee, Wind, Droplets, Leaf, BookOpen, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const portfolioItems = [
  {
    id: 'portfolio-coffee-1',
    category: 'Kopi',
    title: 'Secangkir Ketenangan',
  },
  {
    id: 'portfolio-coffee-2',
    category: 'Kopi',
    title: 'Seni di Atas Kopi',
  },
    {
    id: 'portfolio-coffee-3',
    category: 'Kopi',
    title: 'Ritual Pagi',
  },
    {
    id: 'project-image-1',
    category: 'Kopi',
    title: 'Kopi Artisan',
  },
  {
    id: 'project-image-2',
    category: 'Kopi',
    title: 'Biji Sangrai',
  },
];

const moodItems = [
    {
        icon: <Coffee className="h-5 w-5" />,
        name: 'Espresso',
        mood: 'Fokus & Berenergi',
        description: 'Untuk memulai hari dengan semangat atau saat butuh dorongan kreativitas instan.'
    },
    {
        icon: <Wind className="h-5 w-5" />,
        name: 'Pour Over',
        mood: 'Tenang & Kontemplatif',
        description: 'Menikmati proses seduh yang meditatif untuk momen refleksi dan ketenangan diri.'
    },
    {
        icon: <Droplets className="h-5 w-5" />,
        name: 'Cold Brew',
        mood: 'Segar & Santai',
        description: 'Teman sempurna untuk cuaca panas atau saat ingin menikmati kopi dengan santai tanpa terburu-buru.'
    }
];

const quotes = [
    "Setiap biji kopi punya cerita. Tugas saya adalah menjadi narator terbaiknya.",
    "Di dalam secangkir kopi, kita tidak hanya menemukan rasa, tapi juga harmoni antara alam dan manusia.",
    "Kesempurnaan secangkir kopi bukanlah tentang kerumitan, tapi tentang kejujuran rasa."
]


export default function PortofolioPage() {
  const images = useMemo(() => 
    portfolioItems.map(item => ({
      ...item,
      placeholder: PlaceHolderImages.find(p => p.id === item.id)
    })).filter(item => item.placeholder)
  , []);
  
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-8">
                {/* Header */}
                <Card className="overflow-hidden rounded-xl shadow-lg">
                    <CardHeader className="bg-card p-6">
                    <div className="flex items-center gap-4">
                        <Camera className="h-8 w-8 text-primary" />
                        <div>
                        <CardTitle className="text-3xl font-bold text-primary">Galeri Hidup</CardTitle>
                        <p className="text-muted-foreground">Kumpulan momen visual, rasa, dan suasana.</p>
                        </div>
                    </div>
                    </CardHeader>
                </Card>

                {/* Tentang Saya */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tentang Saya</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                        <Image src={userAvatar?.imageUrl || ''} alt="Arul Faathir" width={100} height={100} className="rounded-full border-4 border-primary" data-ai-hint="portrait person" />
                        <div>
                            <p className="text-muted-foreground">
                            Saya seorang penikmat dan peracik kopi yang bersemangat, yang percaya bahwa setiap cangkir memiliki cerita. Perjalanan saya adalah tentang menjelajahi narasi tersebut, dari biji hingga seduhan terakhir.
                            </p>
                            <Button asChild variant="link" className="p-0">
                                <Link href="/tentang-saya">Baca selengkapnya...</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Koleksi Kopi & Mood */}
                <Card>
                    <CardHeader>
                        <CardTitle>Koleksi Kopi &amp; Mood</CardTitle>
                        <CardDescription>Menemukan kopi yang tepat untuk setiap suasana.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-3">
                       {moodItems.map((item, index) => (
                         <Card key={index} className="flex flex-col items-center p-4 text-center">
                            {item.icon}
                            <h4 className="mt-2 font-semibold">{item.name}</h4>
                            <p className="text-sm text-primary">{item.mood}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                         </Card>
                       ))}
                    </CardContent>
                </Card>

                {/* Quotes Pribadi */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Quotes Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {quotes.map((quote, index) => (
                           <blockquote key={index} className="flex items-start gap-4 border-l-4 border-primary bg-muted/50 p-4 rounded-r-lg">
                             <Quote className="h-6 w-6 shrink-0 text-primary" />
                             <p className="italic text-muted-foreground">{quote}</p>
                           </blockquote>
                        ))}
                    </CardContent>
                </Card>

                {/* Gallery Kopi */}
                <Card>
                    <CardHeader>
                        <CardTitle>Galeri Kopi</CardTitle>
                        <CardDescription>Momen-momen yang tertangkap kamera.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {images.map((item) => (
                            <Dialog key={item.id}>
                                <DialogTrigger asChild>
                                <Card className="group relative cursor-pointer overflow-hidden rounded-lg">
                                    <Image
                                    src={item.placeholder!.imageUrl}
                                    alt={item.title}
                                    width={400}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={item.placeholder!.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex h-full items-end p-4">
                                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                        </div>
                                    </div>
                                </Card>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl p-0">
                                <Image
                                    src={item.placeholder!.imageUrl}
                                    alt={item.title}
                                    width={1200}
                                    height={1200}
                                    className="h-auto w-full rounded-lg object-contain"
                                    data-ai-hint={item.placeholder!.imageHint}
                                    />
                                </DialogContent>
                            </Dialog>
                            ))}
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
