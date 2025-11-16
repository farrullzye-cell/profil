'use server';
/**
 * @fileOverview Alur AI untuk merekomendasikan kopi berdasarkan cuaca.
 *
 * - recommendCoffeeByWeather - Fungsi untuk mendapatkan rekomendasi kopi.
 * - CoffeeRecommendationInputSchema - Skema input untuk alur.
 * - CoffeeRecommendationOutputSchema - Skema output untuk alur.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const CoffeeRecommendationInputSchema = z.object({
  city: z.string().describe('Kota saat ini, contoh: Semarang'),
  weather: z.string().describe('Kondisi cuaca saat ini, contoh: Cerah, Hujan, Berawan'),
});
export type CoffeeRecommendationInput = z.infer<typeof CoffeeRecommendationInputSchema>;

export const CoffeeRecommendationOutputSchema = z.object({
  coffeeName: z.string().describe('Nama biji kopi atau minuman kopi yang direkomendasikan.'),
  reason: z.string().describe('Alasan singkat mengapa kopi ini cocok untuk cuaca dan kota yang diberikan.'),
  tastingNotes: z.array(z.string()).describe('Tiga atau empat catatan rasa utama dari kopi yang direkomendasikan.'),
  brewingMethod: z.string().describe('Metode seduh yang paling disarankan untuk kopi ini.'),
});
export type CoffeeRecommendationOutput = z.infer<typeof CoffeeRecommendationOutputSchema>;

export async function recommendCoffeeByWeather(
  input: CoffeeRecommendationInput
): Promise<CoffeeRecommendationOutput> {
  return coffeeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coffeeRecommendationPrompt',
  input: { schema: CoffeeRecommendationInputSchema },
  output: { schema: CoffeeRecommendationOutputSchema },
  prompt: `Anda adalah seorang barista ahli dan kurator kopi di sebuah kedai kopi spesialti di {{city}}.
Tugas Anda adalah memberikan satu rekomendasi kopi hari ini kepada pelanggan berdasarkan kondisi cuaca saat ini.
Buat rekomendasi yang menarik dan berikan alasan yang kuat.

Kondisi cuaca di {{city}} hari ini: {{weather}}.

Berdasarkan cuaca tersebut, berikan rekomendasi kopi yang paling pas untuk dinikmati.
- Jika cuaca panas atau cerah, rekomendasikan sesuatu yang menyegarkan seperti Cold Brew, Japanese Iced Coffee, atau biji kopi dengan profil rasa buah yang cerah.
- Jika cuaca hujan atau dingin, rekomendasikan sesuatu yang hangat dan nyaman, seperti kopi dengan proses honey/natural, atau kopi tubruk dengan body tebal.
- Jika cuaca berawan atau sejuk, berikan rekomendasi yang seimbang, mungkin pour over dengan biji medium roast.

Pastikan output Anda sesuai dengan skema yang diminta.
Hasilkan nama kopi, alasan, 3-4 catatan rasa, dan satu metode seduh yang paling disarankan.`,
});

const coffeeRecommendationFlow = ai.defineFlow(
  {
    name: 'coffeeRecommendationFlow',
    inputSchema: CoffeeRecommendationInputSchema,
    outputSchema: CoffeeRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
