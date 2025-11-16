
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
        level: 95,
        description: "Menguasai teknik penuangan yang presisi untuk mengontrol laju alir dan ekstraksi, menghasilkan kopi yang jernih dengan profil rasa yang kompleks dan berlapis. Mampu menonjolkan keasaman cerah dan nuansa floral dari biji kopi."
      },
      {
        name: "Aeropress",
        level: 90,
        description: "Ahli dalam metode seduh standar dan terbalik (inverted). Berpengalaman dalam memanipulasi variabel seperti waktu perendaman, tekanan, dan ukuran gilingan untuk menciptakan secangkir kopi yang kaya rasa dan bersih."
      },
      {
        name: "French Press",
        level: 85,
        description: "Memahami cara memaksimalkan ekstraksi untuk menghasilkan kopi dengan body yang penuh dan kaya tanpa rasa pahit berlebih. Menguasai teknik memecah 'crust' dan waktu perendaman yang ideal."
      }
    ]
  },
  {
    category: "Espresso & Seni Susu",
    icon: <Coffee className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Ekstraksi Espresso",
        level: 98,
        description: "Keahlian tingkat lanjut dalam 'dialing-in' shot espresso. Mampu secara konsisten menghasilkan espresso dengan krema tebal, keasaman seimbang, dan rasa manis yang mendalam. Memahami dampak rasio, suhu, dan tekanan."
      },
      {
        name: "Latte Art",
        level: 92,
        description: "Terampil dalam memanaskan susu hingga mencapai microfoam yang sempurna. Mampu menuangkan desain yang rumit dan simetris, mulai dari hati, tulip, hingga rosetta yang kompleks, menggabungkan seni visual dengan rasa yang lezat."
      }
    ]
  },
  {
    category: "Penyangraian & Analisis Biji",
    icon: <Flame className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Profil Penyangraian",
        level: 88,
        description: "Berpengalaman dalam mengembangkan profil sangrai untuk berbagai jenis biji kopi. Memahami fase-fase penting (drying, Maillard, development) dan cara memanipulasinya untuk menonjolkan atau menutupi karakteristik rasa tertentu."
      },
      {
        name: "Analisis Sensorik Biji Hijau & Sangrai",
        level: 90,
        description: "Mampu mengevaluasi kualitas biji kopi hijau berdasarkan aroma, cacat fisik, dan kepadatan. Terlatih dalam mengidentifikasi hasil sangrai yang 'underdeveloped', 'baked', atau 'over-roasted' melalui evaluasi visual dan sensorik."
      }
    ]
  },
    {
    category: "Keterampilan Sensorik (Cupping)",
    icon: <Microscope className="h-6 w-6 text-primary" />,
    skills: [
      {
        name: "Protokol Cupping",
        level: 94,
        description: "Sangat memahami protokol cupping standar SCAA/SCA. Mampu melakukan evaluasi kopi secara objektif dan konsisten, mulai dari 'fragrance', 'aroma', hingga 'aftertaste' untuk menilai kualitas kopi secara profesional."
      },
      {
        name: "Identifikasi Rasa & Aroma",
        level: 96,
        description: "Memiliki palet rasa yang terlatih untuk mengidentifikasi dan mendeskripsikan nuansa rasa dan aroma yang spesifik dalam kopi, menggunakan referensi dari 'SCA Flavor Wheel' untuk memberikan deskripsi yang akurat dan detail."
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
