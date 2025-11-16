
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Crown, LogIn, UserPlus, UserCircle, Bot, Hourglass, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, useDoc, useUser, useCollection } from '@/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, limit, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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

interface UserProfile {
    uid: string;
    email: string;
    approvalStatus: 'pending' | 'approved' | 'rejected';
}

function AuthForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firebase tidak terinisialisasi.' });
      return;
    }
    setLoading(true);
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userDocRef = doc(firestore, 'users', user.uid);
        const newUserProfile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            approvalStatus: 'pending',
        };
        
        // This operation's security is handled by Firestore Rules.
        // The rule allows a user to create their own profile document.
        setDoc(userDocRef, newUserProfile).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: newUserProfile,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

        toast({
          title: 'Pendaftaran Berhasil!',
          description: 'Akun Anda telah dibuat dan sedang menunggu persetujuan admin.',
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Login Berhasil!',
          description: 'Selamat datang kembali di Special Chat.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: isRegistering ? 'Pendaftaran Gagal' : 'Login Gagal',
        description: error.message || 'Terjadi kesalahan.',
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-4">
        <Crown className="h-16 w-16 text-primary" />
        <h2 className="text-2xl font-bold">Akses Eksklusif VIP</h2>
        <p className="max-w-sm text-muted-foreground">
            {isRegistering ? 'Buat akun untuk meminta akses.' : 'Masuk untuk bergabung dalam percakapan.'}
        </p>
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-6">
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        disabled={loading}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Memproses...' : isRegistering ? <><UserPlus className="mr-2 h-5 w-5" />Daftar</> : <><LogIn className="mr-2 h-5 w-5" />Login</>}
                    </Button>
                     <Button variant="link" type="button" onClick={() => setIsRegistering(!isRegistering)} disabled={loading}>
                        {isRegistering ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}

function PendingApproval() {
    const { user } = useUser();
    // Ganti dengan nomor WhatsApp Admin yang sebenarnya
    const adminPhoneNumber = "6281234567890"; 
    const message = `Halo Admin, saya telah mendaftar di Special Chat dengan email ${user?.email}. Mohon untuk menyetujui akun saya. Terima kasih.`;
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-4">
            <Hourglass className="h-16 w-16 text-primary" />
            <h2 className="text-2xl font-bold">Menunggu Persetujuan Admin</h2>
            <p className="max-w-sm text-muted-foreground">
                Akun Anda telah berhasil dibuat. Silakan hubungi admin via WhatsApp untuk mempercepat proses persetujuan.
                Admin akan mengubah status akun Anda secara manual.
            </p>
            <Button asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" /> Hubungi Admin
                </a>
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
  
  const userProfileRef = useMemo(() => {
      if (!firestore || !user) return null;
      return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

  const messagesCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'vip_messages');
  }, [firestore]);

  const messagesQuery = useMemo(() => {
    if (!messagesCollection) return null;
    return query(messagesCollection, orderBy('createdAt', 'asc'), limit(50));
  }, [messagesCollection]);

  const { data: rawMessages, loading: messagesLoading } = useCollection<VipMessage>(messagesQuery);
  
  const messages = useMemo(() => {
    if (!rawMessages) return [];
    if (rawMessages.length === 0 && userProfile?.approvalStatus === 'approved') {
      return [
        {
          id: 'bot-welcome',
          uid: 'bot',
          displayName: 'System Bot',
          photoURL: '',
          message: `Selamat datang di Special Chat, ${user?.email}! Anda sekarang adalah anggota VIP.`,
          isBot: true,
          createdAt: null
        }
      ];
    }
    return rawMessages;
  }, [rawMessages, userProfile, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      displayName: user.email || "Anonymous",
      photoURL: user.photoURL || "",
      message,
      createdAt: serverTimestamp(),
    };

    // Security is handled by Firestore rules, which check for approved status.
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
  
  const renderContent = () => {
    if (userLoading || profileLoading) {
       return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-muted-foreground">Memeriksa status otentikasi...</p>
            </div>
       );
    }

    if (!user) {
        return <AuthForm />;
    }
    
    if (userProfile?.approvalStatus === 'pending') {
        return <PendingApproval />;
    }

    if (userProfile?.approvalStatus === 'rejected') {
        return <div className="flex flex-1 items-center justify-center text-center text-destructive p-4">Akun Anda ditolak oleh admin. Silakan hubungi admin untuk informasi lebih lanjut.</div>
    }
    
    if (userProfile?.approvalStatus === 'approved') {
        return (
            <>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messagesLoading ? (
                   <div className="flex h-full items-center justify-center text-muted-foreground">
                        <p>Memuat pesan...</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.uid === user.uid ? 'justify-end' : 'justify-start'} ${msg.isBot ? 'justify-center' : ''}`}>
                            {msg.uid !== user.uid && !msg.isBot && (
                                <Avatar className="h-8 w-8 border">
                                    <AvatarImage src={msg.photoURL || undefined} alt={msg.displayName} />
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
                                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'Me'} />
                                    <AvatarFallback>{(user.email || 'Me').substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
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
            </>
        );
    }

    // Fallback case: user exists but profile doesn't. Show pending.
    if(user && !userProfile) {
        return <PendingApproval />;
    }

    return <AuthForm />;
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
                    {user && userProfile?.approvalStatus === 'approved' && <Button onClick={handleLogout} variant="outline">Logout</Button>}
                  </div>
                </CardHeader>
              </Card>

              <div className="flex flex-1 flex-col rounded-xl border bg-card shadow-lg">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

    