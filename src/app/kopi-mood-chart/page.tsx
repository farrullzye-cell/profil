
'use client';

import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, BrainCircuit, Lightbulb, Wind, Zap, Coffee } from 'lucide-react';
import React from 'react';

const moodData = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    mood: 'Fokus & Produktif',
    recommendation: 'Single Origin Arabica (Washed Process)',
    description: 'Saat Anda membutuhkan kejernihan pikiran dan konsentrasi tinggi. Kopi dengan proses washed (giling basah) biasanya memiliki keasaman yang cerah dan profil rasa yang bersih, tidak terlalu berat. Ini membantu menjaga pikiran tetap tajam tanpa membuat gelisah.',
    examples: ['Gayo Washed', 'Kintamani Washed', 'Colombia Supremo']
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
    mood: 'Kreatif & Inspiratif',
    recommendation: 'Natural Process Specialty Coffee',
    description: 'Untuk memantik ide-ide baru dan imajinasi. Kopi dengan proses natural cenderung memiliki profil rasa yang kompleks, liar, dan fruity. Setiap tegukan bisa memberikan kejutan rasa baru yang merangsang kreativitas dan membuka perspektif baru.',
    examples: ['Ethiopian Yirgacheffe Natural', 'Bali Natural', 'Ciwidey Natural']
  },
  {
    icon: <Wind className="h-10 w-10 text-sky-500" />,
    mood: 'Santai & Rileks',
    recommendation: 'Decaf atau Cold Brew',
    description: 'Ketika Anda ingin menikmati ritual minum kopi tanpa efek kafein yang kuat. Cold brew dengan keasaman rendahnya atau secangkir decaf berkualitas tinggi bisa menjadi teman sempurna untuk membaca buku atau menikmati sore yang tenang.',
    examples: ['Decaf Swiss Water Process', 'Classic Cold Brew', 'Japanese Iced Coffee']
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    mood: 'Semangat & Berenergi',
    recommendation: 'Espresso atau Robusta Blend',
    description: 'Untuk dorongan energi yang cepat dan intens. Sebuah shot espresso yang pekat atau secangkir kopi dengan campuran Robusta akan memberikan tendangan kafein yang Anda butuhkan untuk memulai hari atau mengatasi rasa kantuk di siang hari.',
    examples: ['House Blend Espresso', 'Kopi Tubruk Robusta', 'Vietnam Drip']
  },
  {
    icon: <Coffee className="h-10 w-10 text-stone-500" />,
    mood: 'Hangat & Nyaman',
    recommendation: 'Honey Process atau Medium Roast',
    description: 'Untuk momen yang nyaman dan menenangkan, seperti di hari hujan. Kopi dengan proses honey atau yang disangrai medium biasanya memiliki body yang seimbang dan rasa manis seperti karamel atau cokelat, memberikan perasaan hangat dan nyaman.',
    examples: ['Toraja Semi-Washed', 'Java Preanger Honey', 'Brazil Cerrado']
  }
];

export default function KopiMoodChartPage() {
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
                            <BarChart2 className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Kopi Mood Chart</CardTitle>
                                <CardDescription className="text-muted-foreground">Menemukan jenis kopi yang pas untuk setiap suasana hati.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {moodData.map((item, index) => (
                    <Card key={index} className="flex flex-col rounded-lg shadow-md transition-shadow hover:shadow-xl">
                      <CardHeader className="flex flex-row items-start gap-4">
                        {item.icon}
                        <div className="flex-1">
                          <CardTitle className="text-xl text-accent">{item.mood}</CardTitle>
                          <CardDescription className="font-semibold text-primary">{item.recommendation}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-between">
                        <p className="text-muted-foreground">{item.description}</p>
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-foreground">Contoh Kopi:</h4>
                          <p className="text-sm text-muted-foreground">{item.examples.join(', ')}</p>
                        </div>
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
