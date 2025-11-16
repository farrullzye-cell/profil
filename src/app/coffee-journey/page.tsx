
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Route, MapPin, Building, Palmtree, Landmark, Milestone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

const journeyData = [
    {
        id: 'journey-semarang-1',
        region: 'Lawang Sewu',
        year: 'Titik Awal',
        title: 'Misteri Seribu Pintu',
        description: 'Perjalanan dimulai dari Lawang Sewu, bangunan ikonik yang penuh sejarah. Arsitekturnya yang megah dan cerita-cerita di baliknya selalu berhasil membuatku terpukau. Setiap sudutnya adalah saksi bisu perjalanan panjang kota ini.',
        icon: <Landmark className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-semarang-2',
        region: 'Kota Lama',
        year: 'Langkah Kedua',
        title: 'Pesona Eropa di Jantung Jawa',
        description: 'Menyusuri jalanan Kota Lama seperti kembali ke masa lalu. Bangunan-bangunan tua peninggalan Belanda yang gagah berdiri menciptakan suasana yang unik dan fotogenik. Tempat favorit untuk sekadar jalan santai dan menikmati sore.',
        icon: <Building className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-semarang-3',
        region: 'Sam Poo Kong',
        year: 'Persinggahan Budaya',
        title: 'Akulturasi dalam Merah Menyala',
        description: 'Klenteng Sam Poo Kong adalah bukti nyata indahnya perpaduan budaya. Arsitektur khas Tionghoa dengan sentuhan Jawa terasa begitu kental. Tempat ini bukan hanya tempat ibadah, tapi juga simbol harmoni.',
        icon: <Palmtree className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-semarang-4',
        region: 'Masjid Agung Jawa Tengah',
        year: 'Oase Spiritual',
        title: 'Payung Raksasa Peneduh Jiwa',
        description: 'Kemegahan Masjid Agung Jawa Tengah dengan payung-payung raksasanya yang terinspirasi dari Masjid Nabawi selalu memberikan ketenangan. Sebuah mahakarya arsitektur modern yang menjadi kebanggaan warga Semarang.',
        icon: <Milestone className="h-6 w-6 text-primary" />,
    },
    {
        id: 'journey-semarang-5',
        region: 'Tugu Muda',
        year: 'Titik Pusat',
        title: 'Api Perjuangan yang Tak Pernah Padam',
        description: 'Berdiri di pusat kota, Tugu Muda adalah pengingat akan semangat perjuangan para pahlawan. Monumen ini menjadi jantung kota, dikelilingi oleh bangunan-bangunan penting yang menjadi saksi sejarah Semarang.',
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
                            <MapPin className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Jelajah Semarang</CardTitle>
                                <CardDescription className="text-muted-foreground">Catatan visual perjalanan menyusuri sudut-sudut ikonik Kota Lumpia.</CardDescription>
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
                                            alt={`Pemandangan di ${item.region}`}
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
