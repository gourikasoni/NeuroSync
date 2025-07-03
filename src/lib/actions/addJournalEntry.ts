'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';

export async function addJournalEntry(content: string, mood: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.from('journal_entries').insert([
    {
      user_id: user.id, // manual user_id (text)
      content,
      mood,
    },
  ]);

  if (error) {
    console.error('Insert error:', error.message);
    throw new Error(error.message);
  }

  return data;
}
