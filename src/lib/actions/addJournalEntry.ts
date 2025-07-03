'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';
import { generateAISummary } from '@/lib/utils/moodAnalyzer';

export async function addJournalEntry(content: string, mood: string) {
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated');

  const ai_summary = generateAISummary(content, mood); // ✅ Use your analyzer

  const { data, error } = await supabase.from('journal_entries').insert([
    {
      user_id: user.id,
      content,
      mood,
      ai_summary, // ✅ Save it to DB
    },
  ]).select(); // 👈 Important: .select() to get `data` back!

  if (error) {
    console.error('Insert error:', error.message);
    throw new Error(error.message);
  }

  return data;
}
