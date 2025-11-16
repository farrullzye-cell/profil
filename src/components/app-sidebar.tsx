'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookText,
  Flame,
  Home,
  Mail,
  Search,
  Sparkles,
  User,
  LayoutGrid,
  ShieldQuestion,
  Crown,
  HelpCircle,
  PenSquare,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();

  const profileMenuItems = [
    { icon: Home, label: 'Beranda', href: '/' },
    { icon: User, label: 'Tentang Saya', href: '/tentang-saya' },
    { icon: Sparkles, label: 'Keahlian', href: '/keahlian' },
    { icon: LayoutGrid, label: 'Portofolio', href: '/portofolio' },
    { icon: Flame, label: 'Riwayat', href: '/riwayat' },
  ];
  
  const interactionMenuItems = [
    { icon: ShieldQuestion, label: 'Anonymous Talk', href: '#' },
    { icon: Crown, label: 'Special Chat (VIP)', href: '#' },
    { icon: HelpCircle, label: 'Ask Me Anything', href: '#' },
    { icon: PenSquare, label: 'Feedback / Pesan', href: '#' },
  ];

  const contactMenuItems = [{ icon: Mail, label: 'Kontak', href: '#' }];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <SidebarInput
            placeholder="Cari"
            className="border-none bg-muted pl-9 focus-visible:ring-transparent"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profil</SidebarGroupLabel>
          <SidebarMenu>
            {profileMenuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    asChild
                    tooltip={{
                      children: item.label,
                      side: 'right',
                      align: 'center',
                    }}
                    isActive={pathname === item.href}
                  >
                    <div>
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Interaksi &amp; Komunikasi</SidebarGroupLabel>
          <SidebarMenu>
            {interactionMenuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    asChild
                    tooltip={{
                      children: item.label,
                      side: 'right',
                      align: 'center',
                    }}
                    isActive={pathname === item.href}
                  >
                    <div>
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
          <SidebarMenu>
            {contactMenuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    asChild
                    tooltip={{
                      children: item.label,
                      side: 'right',
                      align: 'center',
                    }}
                    isActive={pathname === item.href}
                  >
                    <div>
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
