
'use client';

import React from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Coffee } from 'lucide-react';

const PouringCoffeeAnimation = () => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
        >
            <defs>
                <style>
                    {`
                    .pour-stream {
                        animation: pour 1.5s linear infinite;
                        transform-origin: 50px 0;
                    }
                    @keyframes pour {
                        0% { transform: translateY(-20px); opacity: 0; }
                        20% { opacity: 1; }
                        80% { transform: translateY(45px); opacity: 1; }
                        100% { transform: translateY(50px); opacity: 0; }
                    }
                    `}
                </style>
            </defs>
            <g className="pour-stream">
                <path d="M 48 0 L 48 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 52 0 L 52 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </g>
            <path
                d="M 20 60 H 80 C 85 60 90 65 90 75 C 90 85 85 90 80 90 H 20 C 15 90 10 85 10 75 C 10 65 15 60 20 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                d="M 80 65 C 88 68 88 78 80 82"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path d="M 25 55 Q 35 45, 40 55 T 55 55 T 70 55" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8">
                 <animate attributeName="d" values="M 25 55 Q 35 45, 40 55 T 55 55 T 70 55; M 25 55 Q 40 50, 45 55 T 60 55 T 75 55; M 25 55 Q 35 45, 40 55 T 55 55 T 70 55" dur="3s" repeatCount="indefinite" />
            </path>
        </svg>
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
                                <PouringCoffeeAnimation />
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
