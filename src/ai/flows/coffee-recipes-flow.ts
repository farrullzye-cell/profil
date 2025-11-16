'use server';
/**
 * @fileOverview Alur AI untuk menghasilkan resep kopi sederhana.
 *
 * - generateCoffeeRecipes - Fungsi untuk menghasilkan 20 resep kopi.
 * - CoffeeRecipeSchema - Skema output untuk satu resep kopi.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoffeeRecipeSchema = z.object({
  name: z.string().describe("Nama resep kopi yang unik dan menarik."),
  description: z.string().describe("Deskripsi singkat tentang rasa dan karakteristik kopi ini."),
  ingredients: z.array(z.string()).describe("Daftar bahan yang dibutuhkan. Gula harus bersifat opsional."),
  steps: z.array(z.string()).describe("Langkah-langkah pembuatan kopi secara berurutan."),
});

const CoffeeRecipesOutputSchema = z.object({
    recipes: z.array(CoffeeRecipeSchema).length(20).describe("Daftar 20 resep kopi."),
});
export type CoffeeRecipesOutput = z.infer<typeof CoffeeRecipesOutputSchema>;

export async function generateCoffeeRecipes(): Promise<CoffeeRecipesOutput> {
  return coffeeRecipeFlow();
}

const prompt = ai.definePrompt({
  name: 'coffeeRecipePrompt',
  output: {schema: CoffeeRecipesOutputSchema},
  prompt: `Anda adalah seorang ahli barista yang sangat berpengalaman dalam kopi klasik.
Buatkan 20 resep kopi yang sederhana dan klasik.
Setiap resep harus memenuhi kriteria berikut:
1.  Tidak menggunakan susu atau produk dairy lainnya.
2.  Gula harus bersifat opsional dan disebutkan seperti itu dalam daftar bahan (contoh: "1 sdt gula (opsional)").
3.  Fokus pada metode seduh manual atau metode klasik yang tidak memerlukan mesin espresso yang rumit. Contohnya: Kopi Tubruk, French Press, Pour Over, Aeropress, Vietnam Drip, dll.
4.  Berikan nama yang khas untuk setiap resep.
5.  Berikan deskripsi singkat yang menggugah selera.
6.  Pastikan langkah-langkahnya jelas dan mudah diikuti oleh pemula.
Hasilkan 20 resep yang berbeda setiap kali prompt ini dijalankan.`,
});

const coffeeRecipeFlow = ai.defineFlow(
  {
    name: 'coffeeRecipeFlow',
    outputSchema: CoffeeRecipesOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
