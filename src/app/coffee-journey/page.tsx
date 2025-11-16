
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Route, MapPin, Leaf, Wind } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

const journeyData = [
    {
        id: 'journey-gayo-1',
        region: 'Dataran Tinggi Gayo, Aceh',
        year: '2022',
        title: 'Misteri Giling Basah di Tanah Serambi Mekkah',
        description: 'Perjalanan pertama membawa saya ke Gayo, tempat saya belajar langsung proses "Giling Basah" yang ikonik. Proses ini memberikan body yang tebal dan karakter rasa earthy, spicy, dengan keasaman yang rendah. Pengalaman tak terlupakan bersama para petani yang menjaga tradisi.',
        icon: <Leaf className="h-6 w-6 text-primary" />,
        imageHint: 'coffee plantation gayo'
    },
    {
        id: 'journey-kintamani-2',
        region: 'Kintamani, Bali',
        year: '2022',
        title: 'Harmoni Kopi dan Jeruk di Lereng Gunung Batur',
        description: 'Di Kintamani, saya menemukan harmoni yang unik. Tanaman kopi ditanam berdampingan dengan kebun jeruk, menghasilkan biji kopi dengan cita rasa asam segar seperti jeruk, body medium, dan aftertaste yang bersih. Sistem subak menjadi bukti filosofi Tri Hita Karana dalam praktik.',
        icon: <Wind className="h-6 w-6 text-primary" />,
        imageHint: 'kintamani bali landscape'
    },
    {
        id: 'journey-toraja-3',
        region: 'Toraja, Sulawesi',
        year: '2023',
        title: 'Jejak Rasa Eksotis dari Tanah Para Raja',
        description: 'Toraja menyambut dengan kopi yang kompleks dan berlapis. Diproses dengan metode semi-washed, kopi Toraja memiliki notes dark chocolate, rempah, dan sedikit nuansa floral. Saya terpesona dengan budaya lokal yang kental dan bagaimana kopi menjadi bagian tak terpisahkan darinya.',
        icon: <Leaf className="h-6 w-6 text-primary" />,
        imageHint: 'toraja village coffee'
    },
    {
        id: 'journey-sidamo-4',
        region: 'Sidamo, Ethiopia',
        year: '2023',
        title: 'Kembali ke Akar: Ziarah ke Tanah Kelahiran Kopi',
        description: 'Mengunjungi Ethiopia terasa seperti pulang ke rumah. Di Sidamo, saya mencicipi kopi yang diseduh dalam upacara tradisional. Biji kopi hasil proses natural di sini memiliki keasaman lemon yang cerah, aroma bunga melati yang kuat, dan rasa manis seperti buah beri. Sebuah pengalaman spiritual.',
        icon: <Route className="h-6 w-6 text-primary" />,
        imageHint: 'ethiopian coffee ceremony'
    },
    {
        id: 'journey-antioquia-5',
        region: 'Antioquia, Kolombia',
        year: '2024',
        title: 'Menyelami Lautan Kopi di Pegunungan Andes',
        description: 'Kolombia, dengan perkebunan kopinya yang tak berujung. Di Antioquia, saya menyaksikan proses washed process yang teliti, menghasilkan kopi yang sangat seimbang, dengan notes kacang, cokelat, dan keasaman ringan. Kualitas konsisten yang menjadi standar dunia.',
        icon: <Wind className="h-6 w-6 text-primary" />,
        imageHint: 'colombian coffee plantation'
    }
];


export default function CoffeeJourneyPage() {

    const journeys = useMemo(() => {
        // Create dummy placeholders if they don't exist
        const imagePlaceholders = [
            { id: 'journey-gayo-1', imageHint: 'coffee plantation gayo' },
            { id: 'journey-kintamani-2', imageHint: 'kintamani bali landscape' },
            { id: 'journey-toraja-3', imageHint: 'toraja village coffee' },
            { id: 'journey-sidamo-4', imageHint: 'ethiopian coffee ceremony' },
            { id: 'journey-antioquia-5', imageHint: 'colombian coffee plantation' },
        ];

        return journeyData.map(journey => {
            let placeholder = PlaceHolderImages.find(p => p.id === journey.id);
            if (!placeholder) {
                const pImage = imagePlaceholders.find(p => p.id === journey.id);
                placeholder = {
                    id: pImage!.id,
                    description: `Placeholder for ${journey.region}`,
                    imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`,
                    imageHint: pImage!.imageHint,
                }
            }
            return {
                ...journey,
                placeholder
            }
        });
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
                                <CardDescription className="text-muted-foreground">Jejak perjalanan kopi dari berbagai daerah yang pernah dijelajahi.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                 <div className="space-y-8">
                    {journeys.map((item, index) => (
                        <Card key={index} className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="relative h-56 w-full md:h-full">
                                    <Image
                                        src={item.placeholder.imageUrl}
                                        alt={`Perjalanan ke ${item.region}`}
                                        fill
                                        objectFit="cover"
                                        className={index % 2 !== 0 ? 'md:order-last' : ''}
                                        data-ai-hint={item.placeholder.imageHint}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                     <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardDescription className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
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
