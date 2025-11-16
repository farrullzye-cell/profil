
'use client';

import React from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Coffee } from 'lucide-react';

const PouringCoffeeLoader = () => {
    return (
        <>
            <style jsx>{`
                .coffee-wrapper {
                  position: relative;
                  width: 120px;
                  height: 150px;
                  margin: 20px auto;
                }

                .cup-body {
                  width: 100px;
                  height: 50px;
                  border: 4px solid hsl(var(--primary));
                  border-top: none;
                  border-radius: 0 0 50px 50px;
                  position: absolute;
                  bottom: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: hsl(var(--card));
                }

                .cup-handle {
                  width: 28px;
                  height: 28px;
                  border: 4px solid hsl(var(--primary));
                  border-left: none;
                  border-radius: 0 28px 28px 0;
                  position: absolute;
                  bottom: 32px;
                  left: 100px; /* Adjusted to position it next to the cup body */
                  transform: translateX(-50%);
                }

                .coffee-drop {
                  width: 10px;
                  height: 20px;
                  background: hsl(var(--accent));
                  border-radius: 50%;
                  position: absolute;
                  top: 0;
                  left: 55px;
                  animation: drip 1.2s infinite ease-in-out;
                }

                @keyframes drip {
                  0% {
                    opacity: 0;
                    transform: translateY(0) scaleY(0.3);
                  }
                  20% {
                    opacity: 1;
                  }
                  70% {
                    transform: translateY(60px) scaleY(1);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(90px) scaleY(0.4);
                    opacity: 0;
                  }
                }
            `}</style>
            <div className="coffee-wrapper">
              <div className="cup-body"></div>
              <div className="cup-handle"></div>
              <div className="coffee-drop"></div>
            </div>
        </>
    );
};


export default function KopiHariIniPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex min-h-svh flex-col bg-background">
                    <AppHeader />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="mx-auto max-w-2xl space-y-8">
                            <Card className="overflow-hidden rounded-xl shadow-lg">
                                <CardHeader className="bg-card p-6">
                                    <div className="flex items-center gap-4">
                                        <Coffee className="h-8 w-8 text-primary" />
                                        <div>
                                            <CardTitle className="text-3xl font-bold text-primary">Kopi Hari Ini</CardTitle>
                                            <CardDescription className="text-muted-foreground">Rekomendasi AI berdasarkan cuaca di Semarang.</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>

                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-card p-12 text-center shadow-lg">
                                <PouringCoffeeLoader />
                                <h3 className="mt-4 text-2xl font-bold text-accent">Fitur Sedang Ngopi Dulu!</h3>
                                <p className="mt-2 max-w-md text-muted-foreground">
                                    Halaman ini sedang dalam perbaikan. Sepertinya Arul lagi sibuk nyeduh kopi atau mungkin kehabisan biji kopi.
                                </p>
                                <p className="mt-2 font-semibold text-muted-foreground">Coba lagi nanti ya, wkwk!</p>
                            </div>

                        </div>
                    </main>
                    <AppFooter />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
