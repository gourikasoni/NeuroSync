// hooks/useJournal.ts
'use client';

import { useAuth } from '@clerk/nextjs';
import { createSupabaseWithToken } from '@/lib/supabaseClient';

export const useJournal = () => {
  const { getToken } = useAuth();

  const addJournalEntry = async (content: string, mood: string) => {
    const token = await getToken({ template: 'supabase' });

    if (!token) {
      throw new Error("User is not authenticated.");
    }

    // ✅ Create a client with the Clerk token attached
    const supabase = createSupabaseWithToken(token);

    const { error } = await supabase.from('journal_entries').insert({
      content,
      mood,
    });

    if (error) {
      console.error('Supabase insert error:', error.message);
      throw error;
    }

    console.log('✅ Journal entry saved!');
  };

  return { addJournalEntry };
};
