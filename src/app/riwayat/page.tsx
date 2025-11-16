
'use client';

import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Briefcase, GraduationCap } from 'lucide-react';

const historyItems = [
    {
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
        period: "2010 - 2014",
        title: "Sarjana Teknologi Pangan",
        subtitle: "Universitas Gadjah Mada",
        description: "Mempelajari dasar-dasar ilmu pangan, termasuk kimia dan mikrobiologi, yang kemudian menjadi fondasi pemahaman mendalam tentang proses fermentasi dan ekstraksi pada kopi."
    },
    {
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        period: "2015 - 2017",
        title: "Quality Control Specialist",
        subtitle: "Perusahaan Makanan & Minuman",
        description: "Mengasah kemampuan analisis sensorik dan kontrol kualitas, memastikan konsistensi produk. Pengalaman ini sangat berharga dalam mengevaluasi profil biji kopi."
    },
    {
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
        period: "2017",
        title: "Sertifikasi Q-Grader",
        subtitle: "Coffee Quality Institute",
        description: "Secara resmi mendapatkan lisensi untuk menilai kualitas kopi arabika secara profesional. Sebuah pencapaian penting dalam perjalanan menjadi seorang ahli kopi."
    },
    {
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        period: "2018 - Sekarang",
        title: "Head Barista & Roaster",
        subtitle: "Kopi Kita Roastery",
        description: "Memimpin tim barista, mengembangkan profil sangrai, dan mengkurasi biji kopi dari seluruh nusantara. Berbagi hasrat dan pengetahuan kopi kepada komunitas."
    }
];

export default function RiwayatPage() {
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
                        <CardDescription className="text-muted-foreground">Jejak langkah dalam pendidikan dan karir yang membentuk seorang maestro kopi.</CardDescription>
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
