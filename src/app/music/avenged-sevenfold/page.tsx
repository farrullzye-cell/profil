
'use client';

import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Guitar, Music, Play, Pause, Rewind, FastForward, Volume2, Cast, VolumeX, Volume1 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const songsData = [
  {
    title: 'A Little Piece of Heaven',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 481, // 8:01
  },
  {
    title: 'Dear God',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 396, // 6:36
  },
  {
    title: 'So Far Away',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 327, // 5:27
  },
  {
    title: 'Natural Born Killer',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 315, // 5:15
  },
  {
    title: 'Seize the Day',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil',
    duration: 334, // 5:34
  },
  {
    title: 'Gunslinger',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 251, // 4:11
  },
  {
    title: 'Nightmare',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 374, // 6:14
  },
  {
    title: 'Afterlife',
    album: 'Avenged Sevenfold',
    year: '2007',
    albumId: 'a7x-avenged-sevenfold',
    duration: 351, // 5:51
  },
  {
    title: 'Buried Alive',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 404, // 6:44
  },
  {
    title: 'Bat Country',
    album: 'City of Evil',
    year: '2005',
    albumId: 'a7x-city-of-evil',
    duration: 311, // 5:11
  },
  {
    title: 'Danger Line',
    album: 'Nightmare',
    year: '2010',
    albumId: 'a7x-nightmare',
    duration: 328, // 5:28
  },
  {
    title: 'Hail to the King',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king',
    duration: 305, // 5:05
  },
  {
    title: 'Shepherd of Fire',
    album: 'Hail to the King',
    year: '2013',
    albumId: 'a7x-hail-to-the-king',
    duration: 323, // 5:23
  }
];

type Song = (typeof songsData)[0] & { placeholder: (typeof PlaceHolderImages)[0] | undefined };

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const VolumeIcon = ({ volume }: { volume: number }) => {
    if (volume === 0) return <VolumeX className="h-5 w-5 text-neutral-400"/>;
    if (volume < 50) return <Volume1 className="h-5 w-5 text-neutral-400"/>;
    return <Volume2 className="h-5 w-5 text-neutral-400"/>;
};


export default function AvengedSevenfoldPage() {
  const songsWithImages: Song[] = useMemo(() =>
    songsData.map(song => ({
        ...song,
        placeholder: PlaceHolderImages.find(p => p.id === song.albumId)
    })), []);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState([40]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedSong) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + (100 / selectedSong.duration);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedSong]);

  useEffect(() => {
    if (!isDialogOpen) {
      // Reset state when dialog is closed
      setSelectedSong(null);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isDialogOpen]);

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setProgress(0);
    setIsPlaying(true); // Auto-play when a new song is selected
    setIsDialogOpen(true);
  }

  const handlePlayPause = () => {
    if(progress >= 100) {
        setProgress(0);
        setIsPlaying(true);
    } else {
        setIsPlaying(prev => !prev);
    }
  }

  const handleRewind = () => {
    setProgress(prev => Math.max(0, prev - 5));
  }

  const handleFastForward = () => {
    setProgress(prev => Math.min(100, prev + 5));
  }

  const currentTime = selectedSong ? (progress / 100) * selectedSong.duration : 0;
  const remainingTime = selectedSong ? selectedSong.duration - currentTime : 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-8">
                <Card className="overflow-hidden rounded-xl shadow-lg">
                    <CardHeader className="bg-card p-6">
                        <div className="flex items-center gap-4">
                            <Guitar className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary">Avenged Sevenfold</CardTitle>
                                <CardDescription className="text-muted-foreground">Koleksi lagu favorit dari A7X.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {songsWithImages.map((song, index) => (
                            <DialogTrigger asChild key={index} onClick={() => handleSelectSong(song)}>
                                <Card className="group flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                                    {song.placeholder && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={song.placeholder.imageUrl}
                                                alt={`Album art for ${song.album}`}
                                                fill
                                                objectFit="cover"
                                                data-ai-hint={song.placeholder.imageHint}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Play className="h-16 w-16 text-white fill-white" />
                                            </div>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-lg text-primary">{song.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 pt-1">
                                            {song.album} &middot; {song.year}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </DialogTrigger>
                        ))}
                    </div>

                    {selectedSong && (
                        <DialogContent className="max-w-sm rounded-2xl border-none bg-neutral-900/80 p-6 text-white backdrop-blur-xl">
                           <DialogHeader className="sr-only">
                             <DialogTitle>Pemutar Musik: {selectedSong.title}</DialogTitle>
                             <DialogDescription>Memutar lagu {selectedSong.title} oleh Avenged Sevenfold dari album {selectedSong.album}.</DialogDescription>
                           </DialogHeader>
                           <div className="space-y-4">
                                {selectedSong.placeholder && (
                                     <Image
                                        src={selectedSong.placeholder.imageUrl}
                                        alt={`Album art for ${selectedSong.album}`}
                                        width={400}
                                        height={400}
                                        className="rounded-lg object-cover shadow-2xl"
                                        data-ai-hint={selectedSong.placeholder.imageHint}
                                    />
                                )}
                                <div>
                                    <h3 className="text-2xl font-bold">{selectedSong.title}</h3>
                                    <p className="text-lg text-neutral-300">Avenged Sevenfold</p>
                                </div>
                                <div className="space-y-1">
                                    <Progress value={progress} className="h-1 bg-neutral-600 [&>div]:bg-white"/>
                                    <div className="flex justify-between text-xs font-mono text-neutral-400">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>-{formatTime(remainingTime)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <Button variant="ghost" size="icon" onClick={handleRewind} className="h-10 w-10 text-neutral-300 hover:bg-white/10 hover:text-white">
                                        <Rewind className="h-8 w-8"/>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={handlePlayPause} className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200">
                                       {isPlaying ? <Pause className="h-10 w-10 fill-black" /> : <Play className="h-10 w-10 fill-black translate-x-0.5" />}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={handleFastForward} className="h-10 w-10 text-neutral-300 hover:bg-white/10 hover:text-white">
                                        <FastForward className="h-8 w-8"/>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <VolumeIcon volume={volume[0]} />
                                    <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full [&>span]:h-1 [&>span>span]:bg-white [&>span>span]:h-1 [&>span>span]:w-1 [&_button]:h-3 [&_button]:w-3 [&_button]:bg-white"/>
                                    <Cast className="h-5 w-5 text-neutral-400"/>
                                </div>
                           </div>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

    