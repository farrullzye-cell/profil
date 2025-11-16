
'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PenSquare, Send, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'feedback-messages';

export default function PesanPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Gagal memuat pesan dari localStorage:", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Input tidak valid",
        description: "Nama dan pesan tidak boleh kosong.",
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch (error) {
        console.error("Gagal menyimpan pesan ke localStorage:", error);
    }
    
    setName('');
    setMessage('');

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas feedback Anda.",
    });
  };

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
                    <PenSquare className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary">Feedback & Pesan</CardTitle>
                      <CardDescription className="text-muted-foreground">Tinggalkan jejak digital Anda di sini. Sampaikan ide, kritik, atau sekadar sapaan hangat.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Kirim Pesan Baru</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-base"
                    />
                    <Textarea
                      placeholder="Tulis pesan Anda di sini..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="text-base"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Pesan yang Diterima</CardTitle>
                    <CardDescription>Kumpulan pesan dari para pengunjung.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isClient && messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback><UserCircle /></AvatarFallback>
                                </Avatar>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-primary">{msg.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true, locale: id })}
                                        </p>
                                    </div>
                                    <div className="mt-1 rounded-lg bg-muted/50 p-3 text-muted-foreground">
                                        <p className="whitespace-pre-wrap">{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <p>{isClient ? "Belum ada pesan yang diterima." : "Memuat pesan..."}</p>
                        </div>
                    )}
                </CardContent>
              </Card>
            </div>
          </main>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
