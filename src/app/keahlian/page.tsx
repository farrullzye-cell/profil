
'use client';

import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Coffee, Wind, Droplets, Flame, BrainCircuit, Microscope, Star } from 'lucide-react';
import React from 'react';

const skillsData = [
  {
    category: "Seni Penyeduhan Manual",
    icon: <Wind className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Pour Over (V60, Kalita)",
        level: 75,
        description: "Memiliki pemahaman yang baik tentang teknik penuangan untuk mengontrol laju alir dan ekstraksi. Mampu secara konsisten menghasilkan kopi yang jernih dengan profil rasa yang seimbang."
      },
      {
        name: "Aeropress",
        level: 70,
        description: "Cukup terampil dalam metode seduh standar dan terbalik (inverted). Dapat memanipulasi variabel dasar untuk menyesuaikan hasil seduhan sesuai preferensi rasa."
      },
      {
        name: "French Press",
        level: 65,
        description: "Memahami cara menghasilkan kopi dengan body yang kaya menggunakan French Press. Masih terus bereksperimen dengan waktu perendaman dan ukuran gilingan untuk hasil optimal."
      }
    ]
  },
  {
    category: "Espresso & Seni Susu",
    icon: <Coffee className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Ekstraksi Espresso",
        level: 75,
        description: "Mampu melakukan 'dialing-in' untuk menghasilkan shot espresso yang layak dengan krema yang stabil. Terus belajar untuk mencapai keseimbangan rasa yang lebih konsisten."
      },
      {
        name: "Latte Art",
        level: 60,
        description: "Mampu memanaskan susu hingga mencapai microfoam yang cukup baik. Sudah bisa membuat pola dasar seperti hati (heart) dan tulip sederhana, dan sedang berlatih untuk pola yang lebih kompleks."
      }
    ]
  },
  {
    category: "Penyangraian & Analisis Biji",
    icon: <Flame className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Profil Penyangraian",
        level: 60,
        description: "Memiliki pengetahuan dasar tentang profil sangrai dan fase-fase pentingnya. Sudah mulai mencoba mengembangkan profil sangrai sederhana untuk beberapa jenis biji kopi."
      },
      {
        name: "Analisis Sensorik Biji",
        level: 65,
        description: "Mampu mengevaluasi kualitas dasar biji kopi. Dapat mengidentifikasi cacat sangrai yang jelas seperti 'underdeveloped' atau 'over-roasted' melalui evaluasi sensorik."
      }
    ]
  },
    {
    category: "Keterampilan Sensorik (Cupping)",
    icon: <Microscope className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Protokol Cupping",
        level: 55,
        description: "Memahami dan mampu mengikuti protokol cupping standar. Terus melatih konsistensi dalam melakukan evaluasi kopi secara objektif."
      },
      {
        name: "Identifikasi Rasa & Aroma",
        level: 50,
        description: "Mulai dapat mengidentifikasi dan membedakan beberapa nuansa rasa dan aroma dasar dalam kopi. Secara aktif melatih palet rasa untuk kepekaan yang lebih tinggi."
      }
    ]
  }
];


export default function KeahlianPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="bg-card p-6">
                  <div className="flex items-center gap-4">
                    <Star className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary">Peta Keahlian Kopi</CardTitle>
                      <p className="text-muted-foreground">Sebuah Penjelajahan Mendalam tentang Seni dan Sains di Balik Secangkir Kopi</p>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="p-6 md:p-8">
                  <Accordion type="multiple" className="w-full space-y-6">
                    {skillsData.map((category, index) => (
                      <Card key={index} className="overflow-hidden rounded-lg">
                        <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 p-4">
                           {category.icon}
                           <h3 className="text-xl font-semibold text-accent">{category.category}</h3>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                           <div className="space-y-6">
                           {category.skills.map((skill, skillIndex) => (
                                <AccordionItem value={`skill-${index}-${skillIndex}`} key={skillIndex}>
                                <AccordionTrigger className="text-base font-medium hover:no-underline">
                                    <div className="w-full pr-4">
                                        <div className="flex items-center justify-between">
                                            <span>{skill.name}</span>
                                            <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} className="mt-2 h-2" />
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 text-muted-foreground leading-relaxed">
                                    {skill.description}
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  </Accordion>
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
