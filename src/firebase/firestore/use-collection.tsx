'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
  Query,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

type CollectionHookResponse<T> = {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
};

export function useCollection<T extends DocumentData>(
  q: Query | null
): CollectionHookResponse<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (err: Error) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: (q as any)._query.path.segments.join('/'),
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
}
