'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';
import { fetchAISummary } from '@/lib/utils/fetchAISummary'; // ✅ real AI logic

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  ai_summary: string;
  created_at: string;
  user_id: string;
}

 export async function addJournalEntry(content: string, mood: string): Promise<JournalEntry | null> {

  const user = await currentUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // ✨ Use real AI summary generation
  const ai_summary = await fetchAISummary(content);
  console.log("💬 AI Summary before saving to Supabase:", ai_summary);

const { data, error } = await supabase
  .from('journal_entries')
  .insert([
    {
      user_id: user.id,
      content,
      mood,
      ai_summary,
    },
  ])
  .select()
  .single();


  if (error) {
    console.error('Insert error:', error.message);
    throw new Error(error.message);
  }

  return data || null;



}
