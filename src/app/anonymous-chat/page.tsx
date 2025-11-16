
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppFooter } from '@/components/app-footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, UserCircle, ShieldQuestion } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

// Cookie utility functions
function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Generate a simple unique ID
function generateId() {
    return Math.random().toString(36).substring(2, 10);
}


interface AnonymousMessage {
  id: string;
  anonymousId: string;
  message: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

export default function AnonymousChatPage() {
  const [message, setMessage] = useState('');
  const [anonymousId, setAnonymousId] = useState<string | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    let userId = getCookie('anonymousId');
    if (!userId) {
      userId = `anon_${generateId()}`;
      setCookie('anonymousId', userId, 365);
    }
    setAnonymousId(userId);
  }, []);

  const messagesCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'anonymous_messages');
  }, [firestore]);

  const messagesQuery = useMemo(() => {
    if (!messagesCollection) return null;
    return query(messagesCollection, orderBy('createdAt', 'asc'));
  }, [messagesCollection]);

  const { data: messages, loading } = useCollection<AnonymousMessage>(messagesQuery);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Pesan tidak boleh kosong",
      });
      return;
    }
    if (!firestore || !messagesCollection || !anonymousId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Gagal terhubung ke layanan chat.' });
        return;
    }

    const newMessage = {
      anonymousId,
      message,
      createdAt: serverTimestamp(),
    };

    addDoc(messagesCollection, newMessage)
      .then(() => {
        setMessage('');
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
        <div className="flex max-h-svh min-h-svh flex-col bg-background">
          <AppHeader />
          <main className="flex flex-1 flex-col overflow-y-auto">
            <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-4 md:p-8">
              <Card className="mb-4 overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="bg-card p-6">
                  <div className="flex items-center gap-4">
                    <ShieldQuestion className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-3xl font-bold text-primary">Anonymous Chat</CardTitle>
                      <CardDescription className="text-muted-foreground">Kirim pesan secara anonim. Identitas Anda disimpan di browser.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="flex flex-1 flex-col rounded-xl border bg-card shadow-lg">
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {loading ? (
                       <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>Memuat pesan...</p>
                        </div>
                    ) : messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-3 ${msg.anonymousId === anonymousId ? 'justify-end' : 'justify-start'}`}>
                                {msg.anonymousId !== anonymousId && (
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback><UserCircle className="h-5 w-5" /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-xs rounded-lg p-3 md:max-w-md ${msg.anonymousId === anonymousId ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-muted'}`}>
                                    <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                                    <p className={`mt-1 text-xs opacity-70 ${msg.anonymousId === anonymousId ? 'text-right' : 'text-left'}`}>
                                        {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt.seconds * 1000), { addSuffix: true, locale: id }) : ''}
                                    </p>
                                </div>
                                {msg.anonymousId === anonymousId && (
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback className="bg-primary text-primary-foreground">Me</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>Belum ada pesan. Jadilah yang pertama!</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="border-t bg-card p-4">
                    <form onSubmit={handleSubmit} className="flex items-center gap-4">
                        <Input
                        placeholder="Ketik pesan anonim Anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="text-base"
                        autoComplete="off"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
