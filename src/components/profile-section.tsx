'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Info, Bell, Phone, Search, AtSign } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-2');
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');

  return (
    <div className="bg-background text-card-foreground">
      <div className="relative h-48 w-full md:h-56">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Header background"
            layout="fill"
            objectFit="cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>

      <div className="relative -mt-16 rounded-t-3xl bg-card p-6 pt-20 text-center">
        <Avatar className="absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 border-4 border-card">
          {userAvatar && (
            <AvatarImage src={userAvatar.imageUrl} alt="Your Name" data-ai-hint={userAvatar.imageHint} />
          )}
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-bold">Your Name</h2>
        <p className="text-primary">@yourusername</p>
        
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Mail className="h-6 w-6" />
          </a>
        </div>


        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">About</h3>
          <p className="text-muted-foreground">
            I'm a passionate developer who loves building amazing web applications. Skilled in React,
            Next.js, and creating beautiful user interfaces. In my free time, I enjoy contributing
            to open-source projects and exploring new technologies.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col text-left">
                <span className="text-foreground">your.email@example.com</span>
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col text-left">
                <span className="text-foreground">+1 234 567 890</span>
                <span className="text-xs text-muted-foreground">Mobile</span>
              </div>
            </li>
             <li className="flex items-center gap-4">
              <AtSign className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col text-left">
                <span className="text-foreground">@yourusername</span>
                <span className="text-xs text-muted-foreground">Username</span>
              </div>
            </li>
          </ul>
        </div>
        
        <Separator className="my-6" />

        <div className="flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Notifications</span>
          </div>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            On
          </span>
        </div>
      </div>
    </div>
  );
}
