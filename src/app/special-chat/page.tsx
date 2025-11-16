'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Crown, LogIn, UserCircle, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';
import { useCollection } from '@/firebase/firestore/use-collection';
import { addDoc, collection, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

interface VipMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  message: string;
  isBot?: boolean;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

function GoogleLoginButton() {
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Login Berhasil!',
        description: 'Selamat datang di Special Chat.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: error.message || 'Terjadi kesalahan saat mencoba login.',
      });
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <Crown className="h-16 w-16 text-primary" />
        <h2 className="text-2xl font-bold">Akses Eksklusif</h2>
        <p className="max-w-sm text-muted-foreground">
            Fitur ini hanya untuk anggota VIP. Silakan login dengan akun Google Anda untuk bergabung dalam percakapan.
        </p>
        <Button onClick={handleLogin} size="lg">
            <LogIn className="mr-2 h-5 w-5" />
            Login dengan Google
        </Button>
    </div>
  );
}


export default function SpecialChatPage() {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, loading: userLoading } = useUser();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const messagesCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'vip_messages');
  }, [firestore]);

  const messagesQuery = useMemo(() => {
    if (!messagesCollection) return null;
    return query(messagesCollection, orderBy('createdAt', 'asc'), limit(50));
  }, [messagesCollection]);

  const { data: messages, loading: messagesLoading } = useCollection<VipMessage>(messagesQuery);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && messagesCollection) {
        // Welcome message from bot
        const welcomeMessage: Omit<VipMessage, 'id' | 'createdAt'> = {
            uid: 'bot',
            displayName: 'System Bot',
            photoURL: '',
            message: `Selamat datang di obrolan VIP, ${user.displayName}!`,
            isBot: true,
        };
    }
  }, [user, messagesCollection]);


  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({
        title: "Logout Berhasil"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) {
      return;
    }
    if (!firestore || !messagesCollection) {
        toast({ variant: 'destructive', title: 'Error', description: 'Gagal terhubung ke layanan chat.' });
        return;
    }

    const newMessage = {
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
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

  if (userLoading) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex max-h-svh min-h-svh flex-col bg-background">
                <AppHeader />
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-muted-foreground">Memeriksa status login...</p>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
  }

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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Crown className="h-8 w-8 text-primary" />
                        <div>
                        <CardTitle className="text-3xl font-bold text-primary">Special Chat (VIP)</CardTitle>
                        <CardDescription className="text-muted-foreground">Ruang diskusi eksklusif untuk anggota terverifikasi.</CardDescription>
                        </div>
                    </div>
                    {user && <Button onClick={handleLogout} variant="outline">Logout</Button>}
                  </div>
                </CardHeader>
              </Card>

              <div className="flex flex-1 flex-col rounded-xl border bg-card shadow-lg">
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {!user ? <GoogleLoginButton /> :
                    messagesLoading ? (
                       <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>Memuat pesan...</p>
                        </div>
                    ) : messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-3 ${msg.uid === user.uid ? 'justify-end' : 'justify-start'} ${msg.isBot ? 'justify-center' : ''}`}>
                                {msg.uid !== user.uid && !msg.isBot && (
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src={msg.photoURL} alt={msg.displayName} />
                                        <AvatarFallback><UserCircle className="h-5 w-5" /></AvatarFallback>
                                    </Avatar>
                                )}
                                 {msg.isBot && (
                                    <Avatar className="h-8 w-8 border-none bg-transparent">
                                        <AvatarFallback className='bg-transparent'><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-xs rounded-lg p-3 md:max-w-md ${
                                    msg.isBot ? 'text-center text-xs text-muted-foreground' : 
                                    msg.uid === user.uid ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-muted'
                                }`}>
                                    {!msg.isBot && msg.uid !== user.uid && <p className="text-xs font-bold text-primary mb-1">{msg.displayName}</p>}
                                    <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                                    {msg.createdAt && !msg.isBot && (
                                        <p className={`mt-1 text-xs opacity-70 ${msg.uid === user.uid ? 'text-right' : 'text-left'}`}>
                                            {formatDistanceToNow(new Date(msg.createdAt.seconds * 1000), { addSuffix: true, locale: id })}
                                        </p>
                                    )}
                                </div>
                                {msg.uid === user.uid && !msg.isBot && (
                                     <Avatar className="h-8 w-8 border">
                                        <AvatarImage src={msg.photoURL} alt={msg.displayName} />
                                        <AvatarFallback>{user.displayName?.substring(0, 2) || 'Me'}</AvatarFallback>
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
                {user && (
                    <div className="border-t bg-card p-4">
                        <form onSubmit={handleSubmit} className="flex items-center gap-4">
                            <Input
                            placeholder="Ketik pesan Anda sebagai anggota VIP..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="text-base"
                            autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={!message.trim()}>
                                <Send className="h-5 w-5" />
                            </Button>
                      </form>
                    </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
