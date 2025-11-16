'use client';

import {
  BookText,
  Flame,
  Home,
  Mail,
  Search,
  Sparkles,
  User,
  LayoutGrid,
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

const profileMenuItems = [
  { icon: Home, label: 'Beranda', active: true },
  { icon: User, label: 'Tentang Saya' },
  { icon: Sparkles, label: 'Keahlian' },
  { icon: LayoutGrid, label: 'Portofolio' },
  { icon: Flame, label: 'Riwayat' },
  { icon: BookText, label: 'Blog' },
];

const contactMenuItems = [{ icon: Mail, label: 'Kontak' }];

export function AppSidebar() {
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
                <SidebarMenuButton
                  tooltip={{
                    children: item.label,
                    side: 'right',
                    align: 'center',
                  }}
                  isActive={item.active}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
          <SidebarMenu>
            {contactMenuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  tooltip={{
                    children: item.label,
                    side: 'right',
                    align: 'center',
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
