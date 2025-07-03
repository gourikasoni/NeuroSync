'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { createSupabaseWithToken } from '@/lib/supabaseClient';

export default function JournalPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = await getToken({ template: 'supabase', skipCache: true });
      if (!token) {
        setMessage('❌ User not authenticated.');
        setLoading(false);
        return;
      }

      const supabase = createSupabaseWithToken(token);
      const { error } = await supabase.from('journal_entries').insert({
        content,
        mood,
      });

      if (error) {
        console.error('❌ Supabase insert error:', error);
        setMessage(`❌ Failed to save journal: ${error.message}`);
      } else {
        setMessage('✅ Journal saved!');
        setContent('');
        setMood('😊');
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setMessage('❌ Something went wrong.');
    }

    setLoading(false);
  };

  const emojis = ['😊','😢','😭','😠','😐','😲','😴','❤️','🤯','😍'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">
          Hi {user?.firstName || 'friend'} 🌷
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Take a deep breath 🌬️ — What’s on your mind today?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-500 mb-2">Pick a mood</label>
            <div className="flex flex-wrap gap-3">
              {emojis.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setMood(emoji)}
                  className={`text-2xl p-3 rounded-full border transition ${
                    mood === emoji
                      ? 'bg-pink-200 border-pink-400 scale-110 shadow-md'
                      : 'hover:bg-pink-50 border-gray-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-500 mb-2">Your thoughts</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dear brain, today I felt..."
              className="w-full p-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none h-40 bg-white/70 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-white bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save My Entry 💾'}
          </button>

          {message && (
            <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </main>
  );
}
