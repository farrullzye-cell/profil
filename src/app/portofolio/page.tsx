
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera } from 'lucide-react';
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
    id: 'portfolio-sunset-1',
    category: 'Senja',
    title: 'Lukisan Langit',
  },
  {
    id: 'portfolio-place-1',
    category: 'Tempat',
    title: 'Sudut Kota Tua',
  },
  {
    id: 'portfolio-wallpaper-1',
    category: 'Estetika',
    title: 'Bentuk Minimalis',
  },
    {
    id: 'portfolio-coffee-2',
    category: 'Kopi',
    title: 'Seni di Atas Kopi',
  },
  {
    id: 'portfolio-place-2',
    category: 'Tempat',
    title: 'Jalan Setapak Berkabut',
  },
  {
    id: 'portfolio-sunset-2',
    category: 'Senja',
    title: 'Warna Pastel',
  },
    {
    id: 'portfolio-screenshot-1',
    category: 'Estetika',
    title: 'Kode Sebagai Seni',
  },
  {
    id: 'portfolio-wallpaper-2',
    category: 'Estetika',
    title: 'Gradasi Warna',
  },
];

export default function PortofolioPage() {
  const images = portfolioItems.map(item => ({
    ...item,
    placeholder: PlaceHolderImages.find(p => p.id === item.id)
  })).filter(item => item.placeholder);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
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
                <Separator />
                <CardContent className="p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
                                    <div className="text-white">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-sm">{item.category}</p>
                                    </div>
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
