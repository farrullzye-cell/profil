
import Image from 'next/image';
import { Coffee, MapPin, Compass, BookOpen, Droplets } from 'lucide-react';

import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TentangSayaPage() {
    const aboutImage1 = PlaceHolderImages.find((p) => p.id === 'about-image-1');
    const aboutImage2 = PlaceHolderImages.find((p) => p.id === 'about-image-2');
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="bg-card p-0">
                  <div className="flex items-center gap-6 p-6">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Arul Faathir" data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Tentang Arul Faathir</h1>
                        <p className="text-lg text-muted-foreground">Titik Awal Perjalanan Rasa</p>
                    </div>
                  </div>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-8 p-6 md:p-8">
                  <section>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-accent">
                      <Compass className="h-7 w-7" />
                      Langkah Pertama
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <p className="text-muted-foreground leading-relaxed">
                            Perjalanan saya di dunia kopi sebenarnya baru saja dimulai. Semuanya berawal dari rasa penasaran sederhana: mengapa secangkir kopi bisa memiliki rasa yang begitu beragam? Dari pertanyaan itu, saya mulai mencoba beberapa jenis kopi dari kedai-kedai lokal, dan terkejut menemukan betapa kompleksnya dunia di balik minuman hitam ini.
                            </p>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                            Rasa ingin tahu itu mendorong saya untuk membeli peralatan seduh manual pertama saya. Meskipun hasilnya belum sempurna, setiap proses—mulai dari menakar biji, menggiling, hingga menuangkan air panas—memberikan kepuasan tersendiri. Saya sadar bahwa saya telah menemukan sebuah hobi baru yang menantang sekaligus menenangkan.
                            </p>
                        </div>
                        {aboutImage1 && (
                            <div className="relative h-64 w-full md:h-full">
                                <Image
                                    src={aboutImage1.imageUrl}
                                    alt="Perjalanan Kopi"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                    data-ai-hint={aboutImage1.imageHint}
                                />
                            </div>
                        )}
                    </div>
                  </section>
                  
                  <Separator />

                  <section>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-accent">
                      <BookOpen className="h-7 w-7" />
                      Tujuan & Pembelajaran
                    </h2>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                         {aboutImage2 && (
                            <div className="relative h-64 w-full md:h-full md:order-2">
                                <Image
                                    src={aboutImage2.imageUrl}
                                    alt="Filosofi Kopi"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                    data-ai-hint={aboutImage2.imageHint}
                                />
                            </div>
                        )}
                        <div className="md:col-span-2 md:order-1">
                            <p className="text-muted-foreground leading-relaxed">
                            Saat ini, saya belum memiliki filosofi yang muluk. Tujuan saya sederhana: terus belajar dan menikmati setiap prosesnya. Saya percaya, untuk bisa 'bercerita' tentang kopi, saya harus menjadi pendengar yang baik terlebih dahulu—mendengarkan apa yang ingin disampaikan oleh setiap biji kopi.
                            </p>
                            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
                            "Setiap cangkir adalah guru. Setiap seduhan adalah pelajaran baru."
                            </blockquote>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                            Saya masih dalam tahap mengeksplorasi berbagai variabel: ukuran gilingan, suhu air, dan metode seduh. Kegagalan masih sering terjadi, namun setiap kegagalan justru memberikan pemahaman baru. Bagi saya, kesempurnaan saat ini bukanlah hasil akhir, melainkan kemauan untuk terus mencoba.
                            </p>
                        </div>
                    </div>
                  </section>
                  
                  <Separator />

                  <section className="text-center">
                    <h2 className="mb-4 flex items-center justify-center gap-3 text-2xl font-semibold text-accent">
                      <Droplets className="h-7 w-7" />
                      Sebuah Dunia yang Terbuka
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                      Saya sadar bahwa kopi adalah sebuah dunia yang sangat luas. Halaman ini adalah catatan pribadi saya dalam menjelajahi dunia tersebut. Saya berharap dapat berbagi apa yang saya pelajari, betapapun sederhananya, dan mungkin kita bisa belajar bersama dalam perjalanan yang mengasyikkan ini.
                    </p>
                  </section>

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
