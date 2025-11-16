
import { Separator } from '@/components/ui/separator';

export function AppFooter() {
  return (
    <footer className="bg-card p-6 text-center text-sm text-muted-foreground">
      <Separator className="mb-6" />
      <p>&copy; {new Date().getFullYear()} Nama Anda. Hak cipta dilindungi undang-undang.</p>
      <p className="mt-2">
        Dibuat dengan Next.js dan ShadCN UI. Terinspirasi dari Telegram.
      </p>
    </footer>
  );
}
