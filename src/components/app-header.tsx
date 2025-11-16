
'use client';

import { Menu, MoreVertical, Phone, Search, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const phoneNumber = "6285848651208";
  const message = encodeURIComponent("Assalamualaikum, websitemu keren banget! Boleh dong kita ngobrol-ngobrol soal kopi atau coding, wkwk");
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Profil Arul Faathir',
      text: 'Lihat profil keren milik Arul Faathir!',
      url: window.location.href,
    };
    try {
        if (navigator.share && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link disalin!",
                description: "Link halaman telah disalin ke clipboard.",
            });
        }
    } catch (error) {
        console.error('Error sharing:', error);
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link disalin!",
                description: "Gagal berbagi, link halaman telah disalin ke clipboard.",
            });
        } catch (copyError) {
            console.error('Error copying to clipboard:', copyError);
            toast({
                variant: "destructive",
                title: "Gagal",
                description: "Tidak dapat berbagi atau menyalin link.",
            });
        }
    }
  };


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
            alt="Arul Faathir"
            data-ai-hint={userAvatar?.imageHint}
          />
          <AvatarFallback>AF</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">Arul Faathir</p>
          <p className="text-xs text-muted-foreground">daring</p>
        </div>
      </div>
      <div className="flex flex-1 justify-end items-center gap-1">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Cari</span>
        </Button>
        <a href={`https://wa.me/${phoneNumber}?text=${message}`} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Panggil</span>
          </Button>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
              <span className="sr-only">Opsi lainnya</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/review">
                <Star className="mr-2 h-4 w-4" />
                <span>Beri Penilaian</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Bagikan Halaman</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
