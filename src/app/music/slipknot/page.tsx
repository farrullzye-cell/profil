
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Guitar, Music, Mic, Drum, Quote, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const songsData = [
  {
    title: 'Duality',
    album: 'Vol. 3: (The Subliminal Verses)',
    year: '2004',
    albumId: 'slipknot-vol3',
    description: "Lagu yang menjadi jembatan antara agresi murni era 'Iowa' dengan nuansa yang lebih melodius. 'Duality' adalah ledakan frustrasi yang katartik, dibungkus dalam riff gitar yang ikonik dan teriakan Corey Taylor yang putus asa. Video musiknya yang fenomenal, di mana para penggemar menghancurkan sebuah rumah, secara sempurna menangkap energi liar dan koneksi mendalam antara band dan Maggots (sebutan fans Slipknot)."
  },
  {
    title: 'Before I Forget',
    album: 'Vol. 3: (The Subliminal Verses)',
    year: '2004',
    albumId: 'slipknot-vol3',
    description: "Lagu yang membawa Slipknot meraih Grammy Award. 'Before I Forget' adalah lagu kebangsaan tentang pembangkangan dan penegasan identitas. Dengan hook vokal yang sangat menular dan struktur lagu yang lebih lugas, lagu ini membuktikan bahwa Slipknot mampu menciptakan lagu yang heavy namun tetap radio-friendly tanpa mengorbankan integritas mereka. Ini adalah lagu wajib di setiap pertunjukan live mereka."
  },
  {
    title: 'Psychosocial',
    album: 'All Hope Is Gone',
    year: '2008',
    albumId: 'slipknot-ahig',
    description: "Sebuah badai sonik yang menampilkan semua elemen klasik Slipknot: riff gitar yang menghentak dari Jim Root dan Mick Thomson, blast-beat drum dari Joey Jordison, dan vokal Corey Taylor yang beralih mulus dari geraman brutal ke nyanyian melodis. 'Psychosocial' adalah kritik pedas terhadap kepalsuan sosial dan tekanan untuk menyesuaikan diri, sebuah hymne perlawanan yang masif."
  },
  {
    title: 'Snuff',
    album: 'All Hope Is Gone',
    year: '2009',
    albumId: 'slipknot-ahig',
    description: "Menunjukkan sisi Slipknot yang paling rentan dan emosional, 'Snuff' adalah sebuah balada akustik yang gelap dan menyayat hati. Ditulis sepenuhnya oleh Corey Taylor, lagu ini adalah potret mentah dari patah hati dan pengkhianatan. Melodi yang menghantui dan penampilan vokal Taylor yang luar biasa membuktikan kedalaman artistik band di luar citra agresif mereka, menyentuh hati pendengar di seluruh dunia."
  },
  {
    title: 'Wait and Bleed',
    album: 'Slipknot',
    year: '1999',
    albumId: 'slipknot-st',
    description: "Lagu terobosan dari album debut mereka, 'Wait and Bleed' adalah kapsul waktu dari era nu-metal akhir 90-an yang penuh amarah. Energi mentah, pergantian tempo yang liar, dan kombinasi vokal melodis dan teriakan menjadi formula yang melambungkan nama Slipknot. Lagu ini menangkap perasaan terjebak dalam pikiran sendiri dengan sempurna, sebuah tema yang akan terus bergema dalam karya-karya mereka."
  },
  {
    title: 'Eyeless',
    album: 'Slipknot',
    year: '1999',
    albumId: 'slipknot-st',
    description: "Dibuka dengan sampel 'YOU CAN'T SEE CALIFORNIA WITHOUT MARLON BRANDO'S EYES', 'Eyeless' adalah serangan sonik tanpa henti. Ini adalah perwujudan dari kekacauan terkendali yang menjadi ciri khas Slipknot. Dengan drum yang menggempur, perkusi yang liar dari Shawn 'Clown' Crahan dan Chris Fehn, serta riff yang panik, lagu ini adalah pernyataan misi dari sembilan orang gila dari Iowa."
  },
  {
    title: 'The Devil in I',
    album: '.5: The Gray Chapter',
    year: '2014',
    albumId: 'slipknot-gray',
    description: "Lagu pertama yang memperkenalkan anggota baru setelah kepergian Paul Gray dan Joey Jordison. 'The Devil in I' adalah lagu yang kompleks dan dinamis, menggambarkan perjuangan internal dan konflik dalam band. Transisi dari bagian yang tenang dan melodius ke chorus yang meledak-ledak menunjukkan kebangkitan Slipknot yang lebih dewasa, lebih gelap, dan lebih introspektif."
  },
  {
    title: 'Spit It Out',
    album: 'Slipknot',
    year: '1999',
    albumId: 'slipknot-st',
    description: "Dikenal karena momen ikonik 'Jump The F**k Up' di setiap pertunjukan live, 'Spit It Out' adalah nomor rap-metal yang eksplosif. Lagu ini merupakan ledakan energi murni yang ditujukan kepada para pembenci dan industri musik. Vokal cepat Corey Taylor dan ritme yang tak henti-hentinya menjadikan lagu ini salah satu favorit penggemar yang paling memacu adrenalin."
  },
  {
    title: 'People = Shit',
    album: 'Iowa',
    year: '2001',
    albumId: 'slipknot-iowa',
    description: "Dari album 'Iowa' yang legendaris karena kebrutalannya, 'People = Shit' adalah deklarasi misantropi yang paling murni. Ini adalah Slipknot dalam kondisi paling marah dan tanpa kompromi. Dengan blast-beat yang memekakkan telinga dan vokal yang terdengar seperti datang dari neraka, lagu ini adalah suara kemarahan kolektif yang dibawa ke tingkat ekstrem, sebuah karya agresi sonik yang tak tertandingi."
  }
];

type Song = (typeof songsData)[0] & { placeholder: (typeof PlaceHolderImages)[0] | undefined };

export default function SlipknotPage() {
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
                            <Users className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Slipknot</CardTitle>
                                <CardDescription className="text-muted-foreground">Koleksi lagu favorit dari The Nine.</CardDescription>
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
                             <DialogDescription>Deskripsi mendalam tentang lagu {selectedSong.title} oleh Slipknot.</DialogDescription>
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
                                     <p className="text-lg text-neutral-300">Slipknot - {selectedSong.album} ({selectedSong.year})</p>
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
                                        <p className="mt-1 text-sm font-semibold">Corey Taylor</p>
                                        <p className="text-xs text-neutral-400">Vokal (#8)</p>
                                    </div>
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <Guitar className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Jim Root</p>
                                        <p className="text-xs text-neutral-400">Gitaris (#4)</p>
                                    </div>
                                     <div className="rounded-lg bg-white/5 p-3">
                                        <Drum className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Joey Jordison</p>
                                        <p className="text-xs text-neutral-400">Ex-Drummer (#1)</p>
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
