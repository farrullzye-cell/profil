
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Guitar, Music } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

const songsData = [
  {
    title: 'A Little Piece of Heaven',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold'
  },
  {
    title: 'Dear God',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold'
  },
  {
    title: 'So Far Away',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare'
  },
  {
    title: 'Natural Born Killer',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare'
  },
  {
    title: 'Seize the Day',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil'
  },
  {
    title: 'Gunslinger',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold'
  },
  {
    title: 'Nightmare',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare'
  },
  {
    title: 'Afterlife',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold'
  },
  {
    title: 'Buried Alive',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare'
  },
  {
    title: 'Bat Country',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil'
  },
  {
    title: 'Danger Line',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare'
  },
  {
    title: 'Hail to the King',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king'
  },
  {
    title: 'Shepherd of Fire',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king'
  }
];

export default function AvengedSevenfoldPage() {
  const songsWithImages = useMemo(() =>
    songsData.map(song => ({
        ...song,
        placeholder: PlaceHolderImages.find(p => p.id === song.albumId)
    })), []);

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
                            <Guitar className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Avenged Sevenfold</CardTitle>
                                <CardDescription className="text-muted-foreground">Koleksi lagu favorit dari A7X.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {songsWithImages.map((song, index) => (
                        <Card key={index} className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                            {song.placeholder && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={song.placeholder.imageUrl}
                                        alt={`Album art for ${song.album}`}
                                        fill
                                        objectFit="cover"
                                        data-ai-hint={song.placeholder.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                        <Music className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-lg text-primary">{song.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    {song.album} &middot; {song.year}
                                </CardDescription>
                            </CardHeader>
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
