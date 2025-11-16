
'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, GraduationCap, Coffee, Cake, School, Microscope } from 'lucide-react';

const RiwayatPage: React.FC = () => {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const birthDate = new Date('2006-06-06');
    const today = new Date();
    let currentAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      currentAge--;
    }
    setAge(currentAge);
  }, []);

  const historyItems = [
    {
        icon: <Cake className="h-6 w-6 text-primary" />,
        period: "Juni 2006",
        title: "Lahir ke Dunia",
        subtitle: "Awal dari sebuah perjalanan",
        description: "Sebuah babak baru dimulai. Dunia dengan segala rasa dan aromanya menanti untuk dijelajahi."
    },
    {
        icon: <School className="h-6 w-6 text-primary" />,
        period: "2012 - 2018",
        title: "Pendidikan Dasar (SD)",
        subtitle: "Masa Kanak-Kanak",
        description: "Menjalani masa kecil dan mulai mempelajari hal-hal dasar yang membentuk fondasi pengetahuan."
    },
    {
        icon: <School className="h-6 w-6 text-primary" />,
        period: "2018 - 2021",
        title: "Pendidikan Menengah Pertama (SMP)",
        subtitle: "Masa Remaja",
        description: "Memasuki masa remaja, di mana berbagai minat dan hobi baru mulai dieksplorasi di luar lingkungan sekolah."
    },
    {
        icon: <Microscope className="h-6 w-6 text-primary" />,
        period: "2021 - 2024",
        title: "Pendidikan SMK Jurusan Farmasi",
        subtitle: "Masa Penemuan",
        description: "Di tengah kesibukan akademis di dunia farmasi, ketertarikan pada 'seni meracik' lainnya mulai tumbuh. Kunjungan sesekali ke kedai kopi membuka mata pada kompleksitas rasa yang tak terduga."
    },
    {
        icon: <Coffee className="h-6 w-6 text-primary" />,
        period: "2024 - Sekarang",
        title: "Memasuki Dunia Kopi",
        subtitle: "Perjalanan Seorang Pemula",
        description: `Di usia ${age || '18'} tahun, saya memutuskan untuk mendalami hobi ini lebih serius. Dari sekadar penikmat, saya mulai belajar menyeduh sendiri, bereksperimen, dan mencatat setiap hasilnya. Sebuah perjalanan yang baru dimulai.`
    }
  ];

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
                        <Flame className="h-8 w-8 text-primary" />
                        <div>
                        <CardTitle className="text-3xl font-bold text-primary">Linimasa Perjalanan</CardTitle>
                        <CardDescription className="text-muted-foreground">Jejak langkah awal yang membentuk Arul Faathir.</CardDescription>
                        </div>
                    </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardContent className="p-6 md:p-8">
                        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-9 after:w-px after:bg-border">
                            {historyItems.map((item, index) => (
                                <div key={index} className="relative mb-10 grid grid-cols-[auto_1fr] items-start gap-6">
                                    <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-8 ring-background">
                                        {item.icon}
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-sm text-muted-foreground">{item.period}</p>
                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                        <p className="text-md font-medium text-primary">{item.subtitle}</p>
                                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
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

export default RiwayatPage;
