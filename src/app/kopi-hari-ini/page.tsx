
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
              .loader {
                --cup: hsl(var(--card));
                --coffee: hsl(var(--primary));
                --accent-color: hsl(var(--accent));
                --size: 220px;
                width: var(--size);
                height: var(--size);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }
              .coffee-svg {
                width: 100%;
                height: 100%;
                overflow: visible;
              }
              .stream {
                transform-origin: 60% 10%;
                animation: pour 1.6s cubic-bezier(.2,.8,.2,1) infinite;
              }
              .drop {
                transform-origin: center top;
                animation: drip 1.6s linear infinite;
              }
              .coffee-fill {
                transform-origin: 50% 50%;
                animation: swell 1.6s ease-in-out infinite;
              }
              .glint {
                opacity: .9;
                animation: glint 1.6s linear infinite;
              }
              .steam {
                opacity: 0.0;
                animation: steam 1.6s ease-in-out infinite;
              }
              @keyframes pour {
                0%   { transform: rotate(-18deg) translateY(-6px) scaleY(1); opacity:1; }
                40%  { transform: rotate(4deg) translateY(0) scaleY(1.02); opacity:1; }
                70%  { transform: rotate(10deg) translateY(2px) scaleY(0.98); opacity:0.95; }
                100% { transform: rotate(-18deg) translateY(-6px) scaleY(1); opacity:1; }
              }
              @keyframes drip {
                0%   { transform: translateY(-4px) scaleY(0.2); opacity:0; }
                30%  { transform: translateY(8px) scaleY(1); opacity:1; }
                50%  { transform: translateY(22px) scaleY(1.0); opacity:1; }
                70%  { transform: translateY(36px) scaleY(0.8); opacity:0.6; }
                100% { transform: translateY(56px) scaleY(0.2); opacity:0; }
              }
              @keyframes swell {
                0%   { transform: translateY(0) scaleY(1); }
                35%  { transform: translateY(-2px) scaleY(1.02); }
                60%  { transform: translateY(0px) scaleY(0.99); }
                100% { transform: translateY(0) scaleY(1); }
              }
              @keyframes glint {
                0%   { transform: translateX(-6px) translateY(-2px) scaleX(.9); opacity:.85; }
                45%  { transform: translateX(0) translateY(0) scaleX(1.0); opacity:1; }
                100% { transform: translateX(-6px) translateY(-2px) scaleX(.9); opacity:.85; }
              }
              @keyframes steam {
                0%   { transform: translateY(6px) scaleY(.6); opacity:0; }
                30%  { transform: translateY(-8px) scaleY(1.0); opacity:.6; }
                60%  { transform: translateY(-20px) scaleY(1.1); opacity:0.25; }
                100% { transform: translateY(6px) scaleY(.6); opacity:0; }
              }
              @media (max-width:420px){
                .loader { --size:160px; }
              }
            `}</style>
            <div className="loader" role="img" aria-label="Loading menuang kopi">
              <svg className="coffee-svg" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <linearGradient id="coffeeGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))"/>
                    <stop offset="55%" stopColor="hsl(var(--primary))"/>
                    <stop offset="100%" stopColor="hsl(var(--accent))"/>
                  </linearGradient>
                   <clipPath id="cupClip">
                    <path d="M24 44 C26 60, 66 60, 94 48 C98 46,104 36,102 30 C98 16,84 8,62 8 C40 8,22 16,18 28 C16 32,18 40,24 44 Z"/>
                  </clipPath>
                </defs>
                <ellipse cx="110" cy="180" rx="56" ry="8" fill="rgba(0,0,0,0.1)"/>
                <g className="stream" transform="translate(10,8)">
                  <path d="M120 10 C120 10, 150 8, 160 28 C170 46, 155 62, 135 58 C125 56, 110 44, 110 44" fill="none" stroke="none"/>
                  <path d="M92 22 C88 40, 92 60, 116 66" fill="none" stroke="transparent" strokeWidth="2"/>
                  <g transform="translate(70,40)">
                    <path d="M0 0 C -2 12, 6 24, 8 40 C 10 56, 18 70, 24 86 C 30 100, 34 116, 36 130 L 40 130 C 36 114, 28 98, 18 84 C 8 70, 4 56, -2 40 C -8 24, -2 12, 0 0 Z"
                          fill="url(#coffeeGradient)" opacity="0.98"/>
                  </g>
                </g>
                <g transform="translate(36,68)">
                  <path d="M24 44 C26 60, 66 60, 94 48 C98 46,104 36,102 30 C98 16,84 8,62 8 C40 8,22 16,18 28 C16 32,18 40,24 44 Z"
                        fill="var(--cup)" stroke="hsl(var(--border))" strokeWidth="1"/>
                  <path d="M92 34 C108 36,120 52,106 64 C94 74,74 78,64 66"
                        fill="none" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round"/>
                  <g clipPath="url(#cupClip)">
                    <rect className="coffee-fill" x="16" y="30" width="96" height="60" rx="20" ry="20" fill="url(#coffeeGradient)" />
                    <ellipse className="glint" cx="56" cy="44" rx="18" ry="6" fill="rgba(255,255,255,0.15)"/>
                  </g>
                  <g className="steam" transform="translate(32,18)">
                    <path d="M6 0 C 8 -6, 2 -12, 6 -18" stroke="hsla(var(--foreground), 0.2)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M20 0 C 22 -8, 18 -14, 20 -22" stroke="hsla(var(--foreground), 0.15)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  </g>
                </g>
                <g transform="translate(110,60)">
                  <path className="drop" d="M0 0 C -2 8, 2 14, 0 20 C -2 14, 2 8, 0 0 Z" fill="var(--coffee)"/>
                </g>
              </svg>
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
