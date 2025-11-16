
import { Separator } from '@/components/ui/separator';

export function AppFooter() {
  return (
    <footer className="bg-card p-6 text-center text-sm text-muted-foreground">
      <Separator className="mb-6" />
      <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      <p className="mt-2">
        Built with Next.js and ShadCN UI. Inspired by Telegram.
      </p>
    </footer>
  );
}
