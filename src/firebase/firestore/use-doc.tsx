'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  doc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

type DocHookResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useDoc<T extends DocumentData>(
  ref: DocumentReference | null
): DocHookResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(
      ref,
      (docSnapshot: DocumentSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err: Error) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading, error };
}
