'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getJournalsByDate } from '@/lib/actions/getJournalsByDate';
import { motion } from 'framer-motion';


// ✅ Define JournalEntry type (if not globally available)
type JournalEntry = {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
  mood: string;
  ai_summary: string;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([]); // ✅ Fixed typing here

  useEffect(() => {
    const fetchEntries = async () => {
      if (!selectedDate) return;

      const formatted = format(selectedDate, 'yyyy-MM-dd');
      const res = await getJournalsByDate(formatted);
      setEntries(res || []);
    };

    fetchEntries();
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-[#fdf9f3] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#815690]">📅 My Journal Calendar</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
          />
        </div>

        <div className="space-y-6">
          {entries.length === 0 ? (
            <p className="text-center text-gray-500">No journal entries found for this date 💭</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="border border-[#d4c0ea] rounded-xl p-4 bg-gradient-to-br from-[#fcefee] to-[#f5f0fa] shadow"
              >
                <p className="text-sm text-gray-500 mb-1">
                  🕒 {new Date(entry.created_at).toLocaleTimeString()}
                </p>
                <p className="text-base text-gray-800 whitespace-pre-wrap mb-2">
                  {entry.content}
                </p>
                {entry.ai_summary && (
                  <div className="mt-2 p-3 rounded-xl border border-[#e1c8f7] bg-white/80 text-[#4a3554]">
                    <p className="text-sm font-semibold mb-1">AI Vibe Check 💖</p>
                    <p className="text-sm">{entry.ai_summary}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
