"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './client';
import { useRouter } from 'next/navigation';

interface SupabaseContext {
  supabase: SupabaseClient;
  session: Session | null;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};