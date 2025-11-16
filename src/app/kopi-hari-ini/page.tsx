
'use client';

import React from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Coffee, Wrench } from 'lucide-react';

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
                                <Wrench className="h-12 w-12 text-primary" />
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
