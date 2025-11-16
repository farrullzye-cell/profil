
'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Info, Bell, Phone, Search, AtSign, Coffee, Wind, Droplets, ChevronDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import React from 'react';


export function ProfileSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-3');
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const projectImage1 = PlaceHolderImages.find((p) => p.id === 'project-image-1');
  const projectImage2 = PlaceHolderImages.find((p) => p.id === 'project-image-2');

  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(null);


  return (
    <div className="bg-background text-card-foreground">
      <div className="relative h-48 w-full md:h-56">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Header background"
            fill
            objectFit="cover"
            objectPosition="top"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>

      <div className="relative -mt-20 rounded-t-3xl bg-card p-6 pt-24 text-center">
        <Avatar className="absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 border-4 border-card">
          {userAvatar && (
            <AvatarImage src={userAvatar.imageUrl} alt="Arul Faathir" data-ai-hint={userAvatar.imageHint} />
          )}
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-bold">Arul Faathir</h2>
        <p className="text-primary">@maestro_kopi</p>
        
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Mail className="h-6 w-6" />
          </a>
        </div>

        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Tentang Saya</h3>
          <p className="text-muted-foreground">
            Saya seorang penikmat dan peracik kopi yang bersemangat. Terampil dalam berbagai metode penyeduhan dan menciptakan seni latte yang indah. Di waktu luang, saya senang menjelajahi asal-usul kopi baru dan menyangrai biji kopi saya sendiri.
          </p>
        </div>

        <Separator className="my-6" />
        
        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Proyek Saya</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              {projectImage1 && 
                <Image src={projectImage1.imageUrl} alt="Proyek 1" width={400} height={250} className="rounded-t-lg object-cover" data-ai-hint={projectImage1.imageHint} />
              }
              <CardContent className="p-4">
                <h4 className="font-semibold">Blog Kopi Artisan</h4>
                <p className="text-sm text-muted-foreground">Blog yang berbagi tips menyeduh dan cerita kopi.</p>
              </CardContent>
            </Card>
            <Card>
              {projectImage2 && 
                <Image src={projectImage2.imageUrl} alt="Proyek 2" width={400} height={250} className="rounded-t-lg object-cover" data-ai-hint={projectImage2.imageHint} />
              }
              <CardContent className="p-4">
                <h4 className="font-semibold">Penyangraian di Rumah</h4>
                <p className="text-sm text-muted-foreground">Pengaturan pribadi saya untuk menyangrai biji kopi di rumah.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Keahlian</h3>
          <div className="space-y-4">
            <Collapsible open={openCollapsible === 'espresso'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'espresso' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span className="font-medium">Espresso</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">95%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'espresso' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={95} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Ahli dalam mengekstrak shot espresso yang sempurna, dengan krema yang kaya, keasaman seimbang, dan rasa yang mendalam. Memahami ukuran gilingan, tekanan tamping, dan waktu ekstraksi adalah kuncinya.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'aeropress'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'aeropress' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5" />
                        <span className="font-medium">Aeropress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">90%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'aeropress' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={90} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Mahir menggunakan Aeropress untuk secangkir kopi yang bersih dan kaya rasa. Berpengalaman dengan metode standar maupun terbalik, dan bereksperimen dengan berbagai resep.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'latte-art'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'latte-art' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5" />
                        <span className="font-medium">Seni Latte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">80%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'latte-art' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={80} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Terampil dalam memanaskan susu hingga tekstur yang tepat dan menuangkan desain yang rumit, dari hati sederhana hingga rosetta. Ini tentang menggabungkan seni dengan ilmu busa susu.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'bean-roasting'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'bean-roasting' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Penyangraian Biji</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">85%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'bean-roasting' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={85} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Pengalaman dalam penyangraian di rumah, memahami kurva sangrai, dan memanipulasi variabel seperti panas dan aliran udara untuk mengeluarkan cita rasa unik dari biji kopi hijau.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'cortado'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'cortado' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span className="font-medium">Cortado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">92%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'cortado' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={92} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Minuman seimbang dengan perbandingan espresso dan susu panas yang sama. Keahliannya terletak pada pencapaian tekstur susu yang tepat untuk melengkapi espresso tanpa mendominasinya.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'ristretto'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'ristretto' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span className="font-medium">Ristretto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">88%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'ristretto' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={88} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Shot espresso yang "dibatasi". Menggunakan lebih sedikit air, menghasilkan shot yang lebih pendek, lebih pekat, dan lebih manis dibandingkan espresso standar.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'lungo'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'lungo' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      <span className="font-medium">Lungo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">85%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'lungo' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={85} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Shot espresso yang "panjang". Diseduh dengan lebih banyak air, menghasilkan kopi yang lebih besar, kurang pekat, dan lebih pahit dibandingkan espresso standar.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col text-left">
                <span className="text-foreground">email.anda@example.com</span>
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col text-left">
                <span className="text-foreground">+62 123 4567 890</span>
                <span className="text-xs text-muted-foreground">Ponsel</span>
              </div>
            </li>
             <li className="flex items-center gap-4">
              <AtSign className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col text-left">
                <span className="text-foreground">@maestro_kopi</span>
                <span className="text-xs text-muted-foreground">Nama Pengguna</span>
              </div>
            </li>
          </ul>
        </div>
        
        <Separator className="my-6" />

        <div className="flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Notifikasi</span>
          </div>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            Aktif
          </span>
        </div>
      </div>
    </div>
  );
}
