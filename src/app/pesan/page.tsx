
'use client';

import React, { useState, useMemo } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PenSquare, Send, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

interface Message {
  id: string;
  name: string;
  message: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

export default function PesanPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const firestore = useFirestore();

  const messagesCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'messages');
  }, [firestore]);

  const messagesQuery = useMemo(() => {
    if (!messagesCollection) return null;
    return query(messagesCollection, orderBy('createdAt', 'desc'));
  }, [messagesCollection]);

  const { data: messages, loading } = useCollection<Message>(messagesQuery);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Input tidak valid",
        description: "Nama dan pesan tidak boleh kosong.",
      });
      return;
    }
    if (!firestore || !messagesCollection) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not initialized.' });
        return;
    }

    const newMessage = {
      name,
      message,
      createdAt: serverTimestamp(),
    };

    addDoc(messagesCollection, newMessage)
      .then(() => {
        setName('');
        setMessage('');
        toast({
          title: "Pesan Terkirim!",
          description: "Terima kasih atas feedback Anda.",
        });
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: messagesCollection.path,
            operation: 'create',
            requestResourceData: newMessage,
        });
        errorEmitter.emit('permission-error', permissionError);
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
                    {loading ? (
                       <div className="text-center text-muted-foreground py-8">
                            <p>Memuat pesan...</p>
                        </div>
                    ) : messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback><UserCircle /></AvatarFallback>
                                </Avatar>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-primary">{msg.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt.seconds * 1000), { addSuffix: true, locale: id }) : 'beberapa saat lalu'}
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
                            <p>Belum ada pesan yang diterima.</p>
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
