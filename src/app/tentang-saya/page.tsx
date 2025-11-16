
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
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Maestro Kopi" data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Tentang Sang Maestro Kopi</h1>
                        <p className="text-lg text-muted-foreground">Perjalanan Rasa, Aroma, dan Seni</p>
                    </div>
                  </div>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-8 p-6 md:p-8">
                  <section>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-accent">
                      <Compass className="h-7 w-7" />
                      Awal Mula Perjalanan
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <p className="text-muted-foreground leading-relaxed">
                            Semua berawal dari sebuah kebetulan yang tak terduga di sebuah kedai kopi kecil di sudut kota yang ramai. Aroma biji kopi yang baru disangrai menyapa, bukan sebagai aroma biasa, melainkan sebagai sebuah undangan. Undangan ke dunia yang belum pernah saya jelajahi. Secangkir kopi hitam pertama yang saya cicipi hari itu bukanlah sekadar minuman; itu adalah sebuah epifani. Rasa pahit yang kompleks, jejak manis yang tertinggal, dan kehangatan yang menjalar membuka mata saya bahwa kopi lebih dari sekadar pengusir kantuk.
                            </p>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                            Dari situlah, obsesi saya dimulai. Saya tidak hanya ingin minum kopi, saya ingin memahaminya. Saya melahap buku, mengikuti lokakarya, dan menghabiskan berjam-jam bereksperimen di dapur yang saya sulap menjadi laboratorium kopi pribadi. Perjalanan ini membawa saya dari dataran tinggi Gayo hingga kebun-kebun di lereng Ijen, bertemu para petani yang berdedikasi dan belajar langsung dari sumbernya.
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
                      Filosofi Saya: Seni dalam Kesederhanaan
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
                            Bagi saya, secangkir kopi yang sempurna adalah cerminan dari harmoni. Harmoni antara alam, manusia, dan sains. Saya percaya bahwa setiap biji kopi memiliki cerita uniknya sendiri, dan tugas seorang barista atau peracik adalah menjadi narator yang baik. Ini bukan tentang peralatan paling mahal atau teknik paling rumit. Ini tentang menghormati bahan baku.
                            </p>
                            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
                            "Kesempurnaan tercapai bukan saat tidak ada lagi yang bisa ditambahkan, tetapi saat tidak ada lagi yang bisa dihilangkan."
                            </blockquote>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                            Filosofi ini saya terapkan dalam setiap seduhan. Saya berusaha menonjolkan karakter asli dari setiap biji kopi, membiarkannya berbicara sendiri tanpa terlalu banyak intervensi. Baik itu melalui tekanan sebuah Aeropress, tetesan lambat V60, atau kekuatan espresso, tujuannya selalu sama: menyajikan kopi dalam bentuknya yang paling jujur dan paling indah.
                            </p>
                        </div>
                    </div>
                  </section>
                  
                  <Separator />

                  <section className="text-center">
                    <h2 className="mb-4 flex items-center justify-center gap-3 text-2xl font-semibold text-accent">
                      <Droplets className="h-7 w-7" />
                      Lebih dari Sekadar Minuman
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                      Kopi adalah jembatan. Jembatan yang menghubungkan orang, budaya, dan momen. Di balik setiap cangkir, ada komunitas petani, roaster, dan penikmat yang saling terhubung. Inilah yang membuat saya terus bersemangat. Halaman ini bukan hanya tentang saya, tetapi tentang perayaan budaya kopi yang kaya dan dinamis. Mari kita nikmati perjalanan ini bersama, seteguk demi seteguk.
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
