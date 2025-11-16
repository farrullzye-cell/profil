'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Info, Bell, Phone, Search, AtSign } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

export function ProfileSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-1');

  return (
    <div className="bg-card text-card-foreground">
      <div className="relative h-48 w-full md:h-64">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Name</h2>
        </div>
        <p className="text-primary">@yourusername</p>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 text-lg font-semibold">About</h3>
          <p className="text-muted-foreground">
            I'm a passionate developer who loves building amazing web applications. Skilled in React,
            Next.js, and creating beautiful user interfaces. In my free time, I enjoy contributing
            to open-source projects and exploring new technologies.
          </p>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 text-lg font-semibold">Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-foreground">your.email@example.com</span>
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col">
                <span className="text-foreground">+1 234 567 890</span>
                <span className="text-xs text-muted-foreground">Mobile</span>
              </div>
            </li>
             <li className="flex items-center gap-4">
              <AtSign className="h-5 w-5 text-muted-foreground" />
               <div className="flex flex-col">
                <span className="text-foreground">@yourusername</span>
                <span className="text-xs text-muted-foreground">Username</span>
              </div>
            </li>
          </ul>
        </div>
        
        <Separator className="my-6" />

        <div>
          <h3 className="mb-4 text-lg font-semibold">Social</h3>
           <ul className="space-y-4 text-sm">
             <li className="flex items-center gap-4">
              <Github className="h-5 w-5 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                github.com/yourusername
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                linkedin.com/in/yourusername
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Twitter className="h-5 w-5 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                twitter.com/yourusername
              </a>
            </li>
           </ul>
        </div>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">
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
