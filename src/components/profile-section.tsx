
'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Info, Bell, Phone, Search, AtSign, Coffee, Wind, Droplets, ChevronDown, Flame } from 'lucide-react';
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
        <p className="text-primary">@arul_faathir</p>
        
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
                      <span className="font-medium">Ekstraksi Espresso</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">75%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'espresso' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={75} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Mampu melakukan 'dialing-in' untuk menghasilkan shot espresso yang layak dengan krema yang stabil. Terus belajar untuk mencapai keseimbangan rasa yang lebih konsisten.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'aeropress'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'aeropress' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5" />
                        <span className="font-medium">Pour Over & Aeropress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">70%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'aeropress' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={70} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Cukup terampil dalam metode seduh standar dan terbalik (inverted). Dapat memanipulasi variabel dasar untuk menyesuaikan hasil seduhan sesuai preferensi rasa.
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
                      <span className="text-sm text-muted-foreground">60%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'latte-art' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={60} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                 Mampu memanaskan susu hingga mencapai microfoam yang cukup baik. Sudah bisa membuat pola dasar seperti hati (heart) dan tulip sederhana, dan sedang berlatih untuk pola yang lebih kompleks.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openCollapsible === 'bean-roasting'} onOpenChange={(isOpen) => setOpenCollapsible(isOpen ? 'bean-roasting' : null)}>
              <CollapsibleTrigger className="w-full">
                <div className="space-y-2 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5" />
                        <span className="font-medium">Profil Penyangraian</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">60%</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'bean-roasting' && "rotate-180")} />
                    </div>
                  </div>
                  <Progress value={60} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-sm text-muted-foreground">
                  Memiliki pengetahuan dasar tentang profil sangrai dan fase-fase pentingnya. Sudah mulai mencoba mengembangkan profil sangrai sederhana untuk beberapa jenis biji kopi.
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
                <span className="text-foreground">@arul_faathir</span>
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
