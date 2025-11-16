'use client';

import { Menu, MoreVertical, Phone, Search } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Buka/Tutup Sidebar</span>
      </Button>
      <div className="hidden flex-1 cursor-pointer items-center gap-3 md:flex">
        <Avatar className="h-10 w-10 border">
          <AvatarImage
            src={userAvatar?.imageUrl}
            alt="Nama Anda"
            data-ai-hint={userAvatar?.imageHint}
          />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">Nama Anda</p>
          <p className="text-xs text-muted-foreground">daring</p>
        </div>
      </div>
      <div className="flex flex-1 justify-end items-center gap-1">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Cari</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
          <span className="sr-only">Panggil</span>
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Opsi lainnya</span>
        </Button>
      </div>
    </header>
  );
}
