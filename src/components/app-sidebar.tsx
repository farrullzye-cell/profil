'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookText,
  Flame,
  Home,
  User,
  LayoutGrid,
  Coffee,
  MapPin,
  Route,
  BarChart2,
  Sparkles
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
  
  const coffeeMenuItems = [
    { icon: Coffee, label: 'Kopi Hari Ini', href: '/kopi-hari-ini' },
    { icon: BookText, label: 'Resep Kopi Simple', href: '/resep-kopi-simple' },
    { icon: MapPin, label: 'Tempat Ngopi Favorit', href: '/tempat-ngopi-favorit' },
    { icon: Route, label: 'Coffee Journey', href: '/coffee-journey' },
    { icon: BarChart2, label: 'Kopi Mood Chart', href: '/kopi-mood-chart' },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-2">
        {/* Placeholder for future search functionality */}
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
          <SidebarGroupLabel>Tema Kopi</SidebarGroupLabel>
          <SidebarMenu>
            {coffeeMenuItems.map((item, index) => (
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
