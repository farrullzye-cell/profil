import { MessageSquare } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-svh flex-col">
          <AppHeader />
          <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Welcome to Telegram Profile
            </h1>
            <p className="mt-2 text-muted-foreground">
              Select an item from the menu to display its content here.
            </p>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
