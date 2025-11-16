'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firestore Permission Error:', error.toDetailedString());
      toast({
        variant: 'destructive',
        title: 'Kesalahan Izin Firestore',
        description: (
          <div className="text-xs w-full">
            <p>Operasi ditolak oleh Aturan Keamanan.</p>
            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.toDetailedString()}</code>
            </pre>
          </div>
        ),
        duration: 30000,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
