'use server';

import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';

export async function getJournalsByDate(date: string) {
  const { userId } = await auth(); // ✅ Add await here


  if (!userId) return [];

  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', start.toISOString())
    .lt('created_at', end.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching journal entries:', error);
    return [];
  }

  return data;
}
