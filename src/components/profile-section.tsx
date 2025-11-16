'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, Info, Bell, Phone, Search, AtSign, Coffee, Wind, Droplets } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function ProfileSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-3');
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const projectImage1 = PlaceHolderImages.find((p) => p.id === 'project-image-1');
  const projectImage2 = PlaceHolderImages.find((p) => p.id === 'project-image-2');

  return (
    <div className="bg-background text-card-foreground">
      <div className="relative h-48 w-full md:h-56">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Header background"
            fill
            objectFit="cover"
            objectPosition="center"
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
        <p className="text-primary">@coffee_maestro</p>
        
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
            I'm a passionate coffee enthusiast and brewer. Skilled in various brewing methods and creating beautiful latte art. In my free time, I enjoy exploring new coffee origins and roasting my own beans.
          </p>
        </div>

        <Separator className="my-6" />
        
        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">My Projects</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              {projectImage1 && 
                <Image src={projectImage1.imageUrl} alt="Project 1" width={400} height={250} className="rounded-t-lg object-cover" data-ai-hint={projectImage1.imageHint} />
              }
              <CardContent className="p-4">
                <h4 className="font-semibold">Artisan Coffee Blog</h4>
                <p className="text-sm text-muted-foreground">A blog sharing brewing tips and coffee stories.</p>
              </CardContent>
            </Card>
            <Card>
              {projectImage2 && 
                <Image src={projectImage2.imageUrl} alt="Project 2" width={400} height={250} className="rounded-t-lg object-cover" data-ai-hint={projectImage2.imageHint} />
              }
              <CardContent className="p-4">
                <h4 className="font-semibold">Home Roasting Setup</h4>
                <p className="text-sm text-muted-foreground">My personal setup for roasting beans at home.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-left">
          <h3 className="mb-4 text-lg font-semibold">Skills</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  <span className="font-medium">Espresso</span>
                </div>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5" />
                    <span className="font-medium">Aeropress</span>
                </div>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    <span className="font-medium">Latte Art</span>
                </div>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} />
            </div>
             <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Bean Roasting</span>
                </div>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  <span className="font-medium">Cortado</span>
                </div>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  <span className="font-medium">Ristretto</span>
                </div>
                <span className="text-sm text-muted-foreground">88%</span>
              </div>
              <Progress value={88} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  <span className="font-medium">Lungo</span>
                </div>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} />
            </div>
          </div>
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
                <span className="text-foreground">@coffee_maestro</span>
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

    