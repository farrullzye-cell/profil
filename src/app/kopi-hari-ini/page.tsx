
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Coffee, Loader2, Thermometer, Cloud, Sun, CloudRain, Wind, BookOpen, Clock } from 'lucide-react';
import { recommendCoffeeByWeather, type CoffeeRecommendationOutput } from '@/ai/flows/coffee-recommendation-flow';
import { getWeather, WeatherCondition, HourlyForecast } from '@/services/weather-service';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

type RecommendationState = {
  data: CoffeeRecommendationOutput | null;
  weather: WeatherCondition | null;
  loading: boolean;
  error: string | null;
};

const WeatherIcon = ({ iconUrl, condition, className }: { iconUrl: string, condition: WeatherCondition['condition'] | null, className?: string }) => {
    if (!condition) return <Thermometer className={cn('h-6 w-6', className)} />;
    return <Image src={iconUrl} alt={condition} width={50} height={50} className={cn('h-12 w-12', className)} />;
};

export default function KopiHariIniPage() {
    const [recommendation, setRecommendation] = useState<RecommendationState>({
        data: null,
        weather: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchRecommendation() {
            try {
                setRecommendation({ data: null, weather: null, loading: true, error: null });
                
                // 1. Get weather
                const weatherData = await getWeather('Semarang');

                // 2. Get coffee recommendation from AI
                const result = await recommendCoffeeByWeather({
                    city: 'Semarang',
                    weather: weatherData.condition,
                });

                setRecommendation({ data: result, weather: weatherData, loading: false, error: null });
            } catch (e: any) {
                console.error(e);
                setRecommendation({ 
                    data: null, 
                    weather: null,
                    loading: false, 
                    error: e.message || 'Gagal mendapatkan rekomendasi kopi. Silakan coba lagi nanti.' 
                });
            }
        }
        fetchRecommendation();
    }, []);

    const { data, weather, loading, error } = recommendation;

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

                            {loading && (
                                <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 shadow-lg">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="mt-4 text-lg font-semibold text-muted-foreground">Mencari inspirasi kopi untuk Anda...</p>
                                    <p className="text-sm text-muted-foreground">Mengambil data cuaca aktual & memproses...</p>
                                </div>
                            )}

                            {error && (
                                <Card className="border-destructive bg-destructive/10 text-destructive-foreground">
                                <CardHeader>
                                    <CardTitle>Terjadi Kesalahan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{error}</p>
                                    {error.includes("API Key") && <p className="mt-2 text-sm">Silakan periksa file `.env` dan pastikan Anda telah memasukkan API Key yang valid dari OpenWeatherMap dengan prefix `NEXT_PUBLIC_`.</p>}
                                </CardContent>
                                </Card>
                            )}

                            {data && weather && (
                                <>
                                <Card className="overflow-hidden rounded-xl shadow-lg transition-all animate-in fade-in-50">
                                    <CardHeader className="bg-muted/50 p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <WeatherIcon iconUrl={weather.iconUrl} condition={weather.condition} className="h-12 w-12 -ml-2" />
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Cuaca di Semarang</p>
                                                    <p className="text-xl font-bold text-foreground">{weather.condition}, {weather.temperature}°C</p>
                                                </div>
                                            </div>
                                             <Badge variant="secondary" className="self-start sm:self-center">
                                                Rekomendasi Hari Ini
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div>
                                            <p className="text-sm font-semibold text-primary">Rekomendasi</p>
                                            <h3 className="text-2xl font-bold text-accent">{data.coffeeName}</h3>
                                        </div>
                                        <p className="italic text-muted-foreground">"{data.reason}"</p>
                                        
                                        <Separator />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <h4 className="font-semibold flex items-center gap-2"><Wind className="h-5 w-5 text-primary" />Catatan Rasa</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {data.tastingNotes.map((note, index) => (
                                                        <Badge key={index} variant="outline">{note}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Saran Penyeduhan</h4>
                                                <p className="text-muted-foreground">{data.brewingMethod}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="overflow-hidden rounded-xl shadow-lg transition-all animate-in fade-in-50 delay-150">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Clock className="h-5 w-5 text-primary"/>
                                            Prediksi Per Jam
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between text-center">
                                            {weather.hourlyForecast.map((forecast, index) => (
                                                <div key={index} className="flex flex-col items-center gap-2">
                                                    <span className="text-sm font-medium text-muted-foreground">{forecast.time}</span>
                                                    <Image src={forecast.iconUrl} alt={forecast.condition} width={40} height={40}/>
                                                    <span className="text-base font-bold">{forecast.temperature}°C</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                </>
                            )}

                        </div>
                    </main>
                    <AppFooter />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
