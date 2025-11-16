
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
    title: 'A Little Piece of Heaven',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 481, // 8:01
    description: "Sebuah epik teatrikal yang gelap dan berani, 'A Little Piece of Heaven' adalah mahakarya naratif yang menggabungkan orkestra megah dengan rock progresif. Ditulis oleh The Rev, lagu ini menceritakan kisah nekrofilia yang mengerikan dengan sentuhan humor hitam, menunjukkan kejeniusan musikalitas dan keberanian band dalam bereksperimen di luar batas genre metal. Aransemennya yang kompleks, dari brass section hingga paduan suara, menjadikannya salah satu lagu A7X yang paling ambisius dan tak terlupakan."
  },
  {
    title: 'Dear God',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 396, // 6:36
    description: "Menampilkan sisi yang lebih lembut dan introspektif, 'Dear God' adalah balada country rock yang menyentuh. Lagu ini mengungkapkan perasaan rindu dan kerentanan seseorang yang jauh dari orang yang dicintai. Dengan melodi gitar akustik yang hangat dan vokal M. Shadows yang penuh perasaan, lagu ini menjadi bukti fleksibilitas musikal Avenged Sevenfold dan kemampuan mereka untuk menulis lagu yang jujur dan emosional, jauh dari persona heavy metal mereka."
  },
  {
    title: 'So Far Away',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 327, // 5:27
    description: "Sebuah elegi yang menyayat hati untuk mendiang drummer Jimmy 'The Rev' Sullivan yang meninggal pada tahun 2009. 'So Far Away' ditulis oleh Synyster Gates sebagai penghormatan pribadi yang mencerminkan rasa sakit kehilangan dan kenangan persahabatan abadi. Dengan melodi yang kuat dan salah satu solo gitar paling emosional dari Gates, lagu ini menjadi hymne universal bagi siapa saja yang pernah kehilangan orang terkasih, menciptakan koneksi mendalam dengan pendengarnya."
  },
  {
    title: 'Natural Born Killer',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 315, // 5:15
    description: "Salah satu lagu yang menampilkan kontribusi terakhir The Rev, 'Natural Born Killer' adalah nomor agresif yang didorong oleh departemen ritme yang luar biasa. Dengan pola drum yang kompleks dan vokal yang intens, lagu ini menangkap energi mentah dan kegilaan yang terkendali. Liriknya yang gelap, dipadukan dengan riff gitar yang tajam, menciptakan aura bahaya dan kekuatan primal yang menjadi ciri khas band."
  },
  {
    title: 'Seize the Day',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil',
    duration: 334, // 5:34
    description: "Sebuah power ballad klasik, 'Seize the Day' mengajak pendengar untuk menghargai waktu dan orang-orang di sekitar mereka. Lagu ini dibangun di atas progresi piano yang indah dan vokal M. Shadows yang kuat, memuncak dalam salah satu solo gitar Synyster Gates yang paling ikonik dan melodius. Video musiknya yang tragis semakin memperkuat pesan 'carpe diem' yang diusung, menjadikannya lagu yang tak lekang oleh waktu."
  },
  {
    title: 'Gunslinger',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 251, // 4:11
    description: "Dengan pengaruh country yang kental, 'Gunslinger' adalah ode untuk para prajurit di medan perang yang merindukan rumah. Lagu ini menggambarkan perjalanan pulang yang emosional, dipenuhi harapan untuk bertemu kembali dengan kekasih. Perpaduan gitar akustik dan riff elektrik yang membara menciptakan dinamika yang unik, menunjukkan kemampuan band untuk menceritakan kisah yang kuat melalui musik."
  },
  {
    title: 'Nightmare',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 374, // 6:14
    description: "Sebagai lagu pembuka dari album yang sarat dengan kesedihan, 'Nightmare' adalah ledakan kemarahan dan kebingungan. Lagu ini adalah perjalanan sonik ke dalam kegelapan, dengan riff yang menghantui dan lirik yang menggambarkan neraka personal. Ini adalah lagu pertama yang dirilis setelah kepergian The Rev, dan energi serta intensitasnya seolah menjadi katarsis bagi band dan para penggemarnya."
  },
  {
    title: 'Afterlife',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 351, // 5:51
    description: "Menggabungkan riff metal yang cepat dengan aransemen string yang megah, 'Afterlife' adalah lagu yang mempertanyakan apa yang terjadi setelah kematian. Dengan dual-harmony gitar yang menjadi ciri khas, bridge yang diwarnai orkestra, dan lirik yang ditulis oleh The Rev, lagu ini adalah contoh sempurna dari gaya A7X yang unik: teatrikal, teknis, dan melodius. Sebuah perjalanan sonik dari dunia orang hidup ke alam baka."
  },
  {
    title: 'Buried Alive',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 404, // 6:44
    description: "Lagu ini adalah sebuah perjalanan epik yang dimulai sebagai balada yang muram dan perlahan berubah menjadi badai heavy metal. 'Buried Alive' secara metaforis menggambarkan perasaan terjebak dalam kesedihan dan keputusasaan. Transformasi musiknya yang dramatis—dari petikan gitar bersih menjadi riff thrash metal yang brutal—mencerminkan pergulatan internal yang intens, menjadikannya salah satu komposisi A7X yang paling dinamis."
  },
  {
    title: 'Bat Country',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil',
    duration: 311, // 5:11
    description: "Terinspirasi oleh novel 'Fear and Loathing in Las Vegas', 'Bat Country' adalah ledakan energi yang liar dan tak terduga. Lagu ini menandai transisi besar dalam suara band, meninggalkan screaming metalcore untuk vokal yang lebih bersih dan struktur lagu yang lebih kompleks. Dengan riff pembuka yang ikonik dan solo gitar-bass yang gila, lagu ini menjadi hit terobosan yang melambungkan nama Avenged Sevenfold ke panggung dunia."
  },
  {
    title: 'Danger Line',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 328, // 5:28
    description: "Sebuah narasi dari sudut pandang seorang prajurit di garis depan, 'Danger Line' adalah lagu yang kuat dan menyentuh. Liriknya yang menggambarkan saat-saat terakhir seorang prajurit terasa begitu nyata dan emosional. Outro lagu yang diisi dengan siulan melankolis di tengah suara tembakan menjadi penutup yang menghantui, meninggalkan kesan mendalam tentang pengorbanan dan tragedi perang."
  },
  {
    title: 'Hail to the King',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king',
    duration: 305, // 5:05
    description: "Sebuah tribut untuk para raksasa heavy metal klasik, 'Hail to the King' adalah hymne yang lugas, kuat, dan megah. Dengan tempo yang lebih lambat dan riff yang terinspirasi dari band seperti Metallica dan Megadeth, lagu ini adalah ajakan untuk ber-headbang. Kesederhanaan dan kekuatannya menjadikannya lagu yang sempurna untuk dinyanyikan bersama di arena besar, sebuah deklarasi status A7X sebagai raja baru di kancah metal modern."
  },
  {
    title: 'Shepherd of Fire',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king',
    duration: 323, // 5:23
    description: "Lagu pembuka album 'Hail to the King' ini langsung menyambut pendengar dengan atmosfer yang gelap dan firasat buruk. Dimulai dengan lonceng gereja dan hujan badai, 'Shepherd of Fire' membangun ketegangan sebelum meledak dengan riff yang berat dan groovy. Liriknya yang berbau satanik dan teatrikal, dipadukan dengan vokal M. Shadows yang menggeram, menciptakan aura kegelapan yang kental, seolah membuka gerbang neraka."
  }
];

type Song = (typeof songsData)[0] & { placeholder: (typeof PlaceHolderImages)[0] | undefined };

export default function AvengedSevenfoldPage() {
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
                            <Guitar className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Avenged Sevenfold</CardTitle>
                                <CardDescription className="text-muted-foreground">Koleksi lagu favorit dari A7X.</CardDescription>
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
                             <DialogDescription>Deskripsi mendalam tentang lagu {selectedSong.title} oleh Avenged Sevenfold.</DialogDescription>
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
                                     <p className="text-lg text-neutral-300">Avenged Sevenfold - {selectedSong.album} ({selectedSong.year})</p>
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
                                        <p className="mt-1 text-sm font-semibold">M. Shadows</p>
                                        <p className="text-xs text-neutral-400">Vokal</p>
                                    </div>
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <Guitar className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">Synyster Gates</p>
                                        <p className="text-xs text-neutral-400">Gitaris</p>
                                    </div>
                                     <div className="rounded-lg bg-white/5 p-3">
                                        <Drum className="mx-auto h-6 w-6 text-primary"/>
                                        <p className="mt-1 text-sm font-semibold">The Rev</p>
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
