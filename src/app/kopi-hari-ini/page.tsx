
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
              .coffee-loader {
                width: 120px;
                height: 120px;
                position: relative;
                margin: 20px auto;
              }
              .cup-container {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
              }
              .cup {
                width: 80px;
                height: 40px;
                border: 4px solid hsl(var(--primary));
                border-top: none;
                border-radius: 0 0 40px 40px;
                position: relative; /* Changed to relative */
                overflow: hidden; /* This will contain the liquid */
              }
              .handle {
                width: 24px;
                height: 24px;
                border: 4px solid hsl(var(--primary));
                border-left: none;
                border-radius: 0 24px 24px 0;
                position: absolute;
                right: -28px; /* Adjusted to account for border */
                top: 4px;
              }
              .coffee {
                width: 100%;
                height: 10px;
                background: hsl(var(--accent));
                position: absolute;
                bottom: 0;
                left: 0;
                border-radius: 0 0 30px 30px;
                animation: fill 1.8s infinite ease-in-out;
              }
              @keyframes fill {
                0% { height: 0; }
                40% { height: 24px; }
                70% { height: 20px; }
                100% { height: 0; }
              }
              .pour {
                width: 6px;
                height: 40px;
                background: hsl(var(--accent));
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 3px;
                opacity: 0;
                animation: pouring 1.8s infinite ease-in-out;
              }
              @keyframes pouring {
                0% { opacity: 0; height: 0; }
                20% { opacity: 1; height: 40px; }
                60% { opacity: 1; height: 40px; }
                100% { opacity: 0; height: 0; }
              }
              .steam {
                width: 6px;
                height: 20px;
                border-right: 3px solid hsla(var(--primary), 0.7);
                border-radius: 50%;
                position: absolute;
                top: -10px;
                left: 46%;
                opacity: 0;
                animation: steam 1.8s infinite ease-in-out;
              }
              @keyframes steam {
                0% { opacity: 0; transform: translateY(10px) }
                40% { opacity: .8; transform: translateY(-6px) }
                70% { opacity: 0; transform: translateY(-12px) }
                100% { opacity: 0; transform: translateY(10px) }
              }
            `}</style>
            <div className="coffee-loader">
                <div className="steam"></div>
                <div className="pour"></div>
                <div className="cup-container">
                    <div className="cup">
                        <div className="coffee"></div>
                        <div className="handle"></div>
                    </div>
                </div>
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
