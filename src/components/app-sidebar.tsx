
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
  Sparkles,
  ChevronDown
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

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

  const [openCollapsible, setOpenCollapsible] = React.useState('Profil');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-2">
        {/* Placeholder for future search functionality */}
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="space-y-2">
        <Collapsible open={openCollapsible === 'Profil'} onOpenChange={() => setOpenCollapsible(openCollapsible === 'Profil' ? '' : 'Profil')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 font-semibold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                Profil
                <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'Profil' && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenu className="py-2">
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
            </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openCollapsible === 'Tema Kopi'} onOpenChange={() => setOpenCollapsible(openCollapsible === 'Tema Kopi' ? '' : 'Tema Kopi')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 font-semibold text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                Tema Kopi
                <ChevronDown className={cn("h-4 w-4 transition-transform", openCollapsible === 'Tema Kopi' && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenu className="py-2">
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
            </CollapsibleContent>
        </Collapsible>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
