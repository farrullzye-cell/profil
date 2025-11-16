
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Guitar, Music, Mic, Drum, Quote } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const songsData = [
  {
    title: 'American Idiot',
    album: 'American Idiot',
    year: '2004',
    albumId: 'greenday-american-idiot',
    description: "Lagu yang menjadi peledak dari opera rock ikonik mereka. 'American Idiot' adalah kritik tajam yang sarat energi terhadap politik pasca-9/11 dan media massa. Dengan tempo punk rock yang cepat dan riff gitar yang menular, lagu ini menjadi seruan bagi generasi yang merasa terasing dan marah, menangkap semangat pemberontakan dengan sempurna."
  },
  {
    title: 'Boulevard of Broken Dreams',
    album: 'American Idiot',
    year: '2004',
    albumId: 'greenday-american-idiot',
    description: "Sebuah balada melankolis yang menjadi salah satu lagu paling dikenal Green Day. Mengisahkan perjalanan sepi 'Jesus of Suburbia', lagu ini menggambarkan perasaan isolasi dan kesendirian. Efek tremolo pada gitar dan vokal Billie Joe Armstrong yang penuh perasaan menciptakan atmosfer yang menghantui dan introspektif, membuatnya menjadi hymne bagi mereka yang merasa sendirian."
  },
  {
    title: 'Wake Me Up When September Ends',
    album: 'American Idiot',
    year: '2005',
    albumId: 'greenday-american-idiot',
    description: "Lagu yang sangat pribadi dan emosional, ditulis oleh Billie Joe tentang kematian ayahnya. Dimulai dengan petikan gitar akustik yang lembut, lagu ini secara perlahan membangun intensitas menjadi sebuah power ballad yang megah. 'Wake Me Up When September Ends' adalah lagu tentang kehilangan dan duka, yang berhasil menyentuh jutaan hati di seluruh dunia."
  },
  {
    title: '21 Guns',
    album: '21st Century Breakdown',
    year: '2009',
    albumId: 'greenday-21st-century-breakdown',
    description: "Sebuah power ballad yang kuat, '21 Guns' mempertanyakan arti dari patriotisme dan perang. Lagu ini mengajak pendengar untuk 'meletakkan senjata' dan mengakhiri pertempuran yang sia-sia. Dengan progresi akor yang klasik dan chorus yang epik, lagu ini menjadi salah satu momen paling melodius dan anthemik dari album konsep '21st Century Breakdown'."
  },
  {
    title: 'Basket Case',
    album: 'Dookie',
    year: '1994',
    albumId: 'greenday-dookie',
    description: "Lagu yang melambungkan Green Day ke stratosfer ketenaran. 'Basket Case' adalah ledakan pop-punk tiga akor yang sempurna, menangkap perasaan kecemasan dan kebingungan mental. Lirik yang jujur tentang serangan panik, dipadukan dengan energi yang luar biasa, membuat lagu ini menjadi soundtrack bagi generasi 90-an yang gelisah."
  },
  {
    title: 'Good Riddance (Time of Your Life)',
    album: 'Nimrod',
    year: '1997',
    albumId: 'greenday-nimrod',
    description: "Sebuah lagu yang tak terduga dari sebuah band punk, 'Good Riddance' adalah balada akustik yang reflektif. Dengan sentuhan biola, lagu ini menjadi lagu perpisahan universal yang dimainkan di berbagai acara kelulusan dan perpisahan. Lagu ini menunjukkan sisi Green Day yang lebih dewasa dan kemampuan mereka menulis lagu yang melampaui batas-batas genre punk."
  },
  {
    title: 'Holiday',
    album: 'American Idiot',
    year: '2005',
    albumId: 'greenday-american-idiot',
    description: "Sebuah lagu protes yang bersemangat dengan energi punk rock yang membara. 'Holiday' adalah kritik keras terhadap pemerintah dan perang, dibungkus dalam hook yang sangat catchy. Lagu ini berfungsi sebagai antitesis dari 'Boulevard of Broken Dreams', di mana sang protagonis dengan marah menolak apatisme dan menyerukan perlawanan."
  },
  {
    title: 'Minority',
    album: 'Warning',
    year: '2000',
    albumId: 'greenday-american-idiot', // Fallback, no nimrod album art defined
    description: "Sebuah lagu kebangsaan bagi para 'underdog' dan orang-orang yang merasa terpinggirkan. Dengan sentuhan folk-punk yang kental, lengkap dengan akordeon, 'Minority' adalah deklarasi kemerdekaan untuk menjadi diri sendiri dan menolak arus utama. 'I wanna be the minority' menjadi seruan bagi mereka yang bangga menjadi berbeda."
  },
  {
    title: 'Welcome to Paradise',
    album: 'Dookie',
    year: '1994',
    albumId: 'greenday-dookie',
    description: "Awalnya muncul di album 'Kerplunk', versi 'Dookie' dari lagu ini lebih tajam dan kuat. Mengisahkan pengalaman pindah dari rumah dan hidup di lingkungan yang kumuh, lagu ini menangkap perasaan takut sekaligus kegembiraan akan kebebasan baru. Riff bass Mike Dirnt yang ikonik menjadi tulang punggung dari lagu punk rock klasik ini."
  }
];

type Song = (typeof songsData)[0] & { placeholder: (typeof PlaceHolderImages)[0] | undefined };

export default function GreenDayPage() {
  const songsWithImages: Song[] = useMemo(() =>
    songsData.map(song => ({
        ...song,
        placeholder: PlaceHolderImages.find(p => p.id === song.albumId)
    })), []);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
  }

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
                            <Music className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Green Day</CardTitle>
                                <CardDescription className="text-muted-foreground">Koleksi lagu favorit dari trio punk rock.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Dialog>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {songsWithImages.map((song, index) => (
                            <DialogTrigger asChild key={index} onClick={() => handleSelectSong(song)}>
                                <Card className="group flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                                    {song.placeholder && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={song.placeholder.imageUrl}
                                                alt={`Album art for ${song.album}`}
                                                fill
                                                objectFit="cover"
                                                data-ai-hint={song.placeholder.imageHint}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
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
                            </DialogTrigger>
                        ))}
                    </div>

                    {selectedSong && (
                        <DialogContent className="grid max-h-[90svh] max-w-2xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-2xl border-none bg-neutral-900/90 p-0 text-white backdrop-blur-2xl">
                           <DialogHeader className="sr-only">
                             <DialogTitle>Detail Lagu: {selectedSong.title}</DialogTitle>
                             <DialogDescription>Deskripsi mendalam tentang lagu {selectedSong.title} oleh Green Day.</DialogDescription>
                           </DialogHeader>
                           <div className="relative">
                                {selectedSong.placeholder && (
                                    <>
                                     <Image
                                        src={selectedSong.placeholder.imageUrl}
                                        alt={`Album art for ${selectedSong.album}`}
                                        width={800}
                                        height={450}
                                        className="h-56 w-full rounded-t-2xl object-cover"
                                        data-ai-hint={selectedSong.placeholder.imageHint}
                                    />
                                     <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent" />
                                    </>
                                )}
                                <div className="absolute bottom-0 p-6">
                                     <h3 className="text-4xl font-bold tracking-tight">{selectedSong.title}</h3>
                                     <p className="text-lg text-neutral-300">Green Day - {selectedSong.album} ({selectedSong.year})</p>
                                </div>
                           </div>
                           <ScrollArea className="overflow-hidden">
                            <div className="space-y-6 p-6 pt-4">
                                <div className="flex items-start gap-4 rounded-lg bg-white/5 p-4">
                                    <Quote className="h-6 w-6 shrink-0 translate-y-1 text-primary"/>
                                    <p className="text-neutral-300 leading-relaxed italic">"{selectedSong.description}"</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <Mic className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Billie Joe Armstrong</p>
                                        <p className="text-xs text-neutral-400">Vokal & Gitar</p>
                                    </div>
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <Guitar className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Mike Dirnt</p>
                                        <p className="text-xs text-neutral-400">Bass</p>
                                    </div>
                                     <div className="rounded-lg bg-white/5 p-3">
                                        <Drum className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Tré Cool</p>
                                        <p className="text-xs text-neutral-400">Drummer</p>
                                    </div>
                                </div>
                            </div>
                           </ScrollArea>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
