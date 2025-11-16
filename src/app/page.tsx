
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { ProfileSection } from '@/components/profile-section';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1">
            <ProfileSection />
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
