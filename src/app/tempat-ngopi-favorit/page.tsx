
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Globe } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

const coffeeShops = [
    {
        id: 'semarang-coffee-1',
        name: 'Antarakata Coffee',
        address: 'Jl. Ahmad Yani, Semarang',
        description: 'Dikenal dengan suasana yang nyaman untuk bekerja dan interior yang minimalis. Kopi mereka di-roasting sendiri, menjanjikan rasa yang otentik.',
        mapsUrl: 'https://maps.app.goo.gl/y5jPSENB6y2k8a1g6'
    },
    {
        id: 'semarang-coffee-2',
        name: 'Eastman Coffee House',
        address: 'Jl. Rinjani, Semarang',
        description: 'Menggabungkan kedai kopi dengan nuansa bangunan kolonial yang klasik. Tempat yang luas dan cocok untuk bersantai atau bertemu teman.',
        mapsUrl: 'https://maps.app.goo.gl/3QW6B8rGzUfS1aZb7'
    },
    {
        id: 'semarang-coffee-3',
        name: 'Moment Coffee & Space',
        address: 'Jl. Pleburan, Semarang',
        description: 'Tempat yang populer di kalangan mahasiswa karena lokasinya yang dekat dengan universitas. Menawarkan ruang yang nyaman untuk belajar dan diskusi.',
        mapsUrl: 'https://maps.app.goo.gl/sM39N1N9vj9H2b4r8'
    },
    {
        id: 'semarang-coffee-4',
        name: 'Anak Panah Kopi',
        address: 'Jl. MH Thamrin, Semarang',
        description: 'Cabang dari brand kopi terkenal yang menyajikan berbagai pilihan biji kopi spesialti. Desainnya modern dan selalu ramai pengunjung.',
        mapsUrl: 'https://maps.app.goo.gl/j4x3X2rQhK8yv78x9'
    },
    {
        id: 'semarang-coffee-5',
        name: 'Kofitiere',
        address: 'Jl. Erlangga, Semarang',
        description: 'Kedai kopi kecil yang homey dengan kualitas kopi yang tidak main-main. Barista yang ramah siap merekomendasikan kopi terbaik untukmu.',
        mapsUrl: 'https://maps.app.goo.gl/v6N2LwXgZf1PZqY96'
    },
    {
        id: 'semarang-coffee-6',
        name: 'Toko Kopi Tuku',
        address: 'Jl. Gajahmada, Semarang',
        description: 'Pelopor es kopi susu kekinian di Indonesia, kini hadir di Semarang. Tempatnya mungil, lebih fokus untuk pesanan take-away.',
        mapsUrl: 'https://maps.app.goo.gl/yT75v2h2vXz3N6mJ8'
    },
    {
        id: 'semarang-coffee-7',
        name: 'Goodfellas Resto & Coffee',
        address: 'Jl. Gajah Mungkur, Semarang',
        description: 'Menawarkan pengalaman ngopi dengan pemandangan kota Semarang dari atas. Suasananya elegan, cocok untuk acara spesial.',
        mapsUrl: 'https://maps.app.goo.gl/R5wX3zW2v3T2Q8d28'
    },
    {
        id: 'semarang-coffee-8',
        name: 'Legend Coffee',
        address: 'Jl. Sriwijaya, Semarang',
        description: 'Buka 24 jam dengan fasilitas internet yang kencang, menjadikannya surga bagi para gamer dan mereka yang butuh tempat kerja hingga larut malam.',
        mapsUrl: 'https://maps.app.goo.gl/C2oE9hJg1L5fP5kS7'
    },
    {
        id: 'semarang-coffee-9',
        name: 'Kairos Coffee',
        address: 'Jl. Letjen S. Parman, Semarang',
        description: 'Salah satu pelopor specialty coffee di Semarang dengan interior yang modern dan industrial. Tempatnya luas dengan area outdoor yang asri.',
        mapsUrl: 'https://maps.app.goo.gl/qYmCgA7hZ4XqVvG5A'
    }
];

export default function TempatNgopiFavoritPage() {
    const shopsWithImages = useMemo(() =>
        coffeeShops.map(shop => ({
            ...shop,
            placeholder: PlaceHolderImages.find(p => p.id === shop.id)
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
                            <MapPin className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Peta Kopi Semarang</CardTitle>
                                <CardDescription className="text-muted-foreground">9 Rekomendasi Tempat Ngopi Favorit di Kota Lumpia.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {shopsWithImages.map((shop) => (
                        <Card key={shop.id} className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                            {shop.placeholder && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={shop.placeholder.imageUrl}
                                        alt={`Foto ${shop.name}`}
                                        fill
                                        objectFit="cover"
                                        data-ai-hint={shop.placeholder.imageHint}
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{shop.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    <MapPin className="h-4 w-4 shrink-0" /> {shop.address}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col justify-between">
                                <p className="text-sm text-muted-foreground">{shop.description}</p>
                                <Button 
                                    variant="link" 
                                    className="p-0 h-auto self-start mt-4" 
                                    asChild
                                >
                                    <a href={shop.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Globe className="h-4 w-4" />
                                        Lihat di Google Maps
                                    </a>
                                </Button>
                            </CardContent>
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
