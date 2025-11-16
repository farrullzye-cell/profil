
'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookText, Loader2, Coffee, Sparkles } from 'lucide-react';
import { generateCoffeeRecipes, type CoffeeRecipesOutput } from '@/ai/flows/coffee-recipes-flow';

type Recipe = CoffeeRecipesOutput['recipes'][0];

export default function ResepKopiSimplePage() {
  const [recipesOutput, setRecipesOutput] = useState<CoffeeRecipesOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);
        const result = await generateCoffeeRecipes();
        setRecipesOutput(result);
      } catch (e) {
        console.error(e);
        setError('Gagal memuat resep kopi. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

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
                    <BookText className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary">Resep Kopi Simple</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-muted-foreground">
                        20 Resep Kopi Klasik Dihasilkan oleh AI <Sparkles className="h-4 w-4 text-amber-500" />
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {loading && (
                <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 shadow-lg">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-lg font-semibold text-muted-foreground">Memuat resep kopi untuk Anda...</p>
                  <p className="text-sm text-muted-foreground">Harap tunggu sebentar.</p>
                </div>
              )}

              {error && (
                <Card className="border-destructive bg-destructive/10 text-destructive-foreground">
                  <CardContent className="p-6">
                    <p className="font-semibold">{error}</p>
                  </CardContent>
                </Card>
              )}

              {recipesOutput && (
                <div className="grid gap-6 md:grid-cols-2">
                  {recipesOutput.recipes.map((recipe: Recipe, index: number) => (
                    <Card key={index} className="flex h-full flex-col">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                           <Coffee className="h-6 w-6 shrink-0 text-primary mt-1" />
                           <div>
                            <CardTitle className="text-xl font-semibold text-primary">{recipe.name}</CardTitle>
                            <CardDescription className="mt-1 text-sm">{recipe.description}</CardDescription>
                           </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-end">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="ingredients">
                            <AccordionTrigger className="font-medium">Bahan-Bahan</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                                {recipe.ingredients.map((ingredient, i) => (
                                  <li key={i}>{ingredient}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="steps">
                            <AccordionTrigger className="font-medium">Langkah Pembuatan</AccordionTrigger>
                            <AccordionContent>
                              <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
                                {recipe.steps.map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ol>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
