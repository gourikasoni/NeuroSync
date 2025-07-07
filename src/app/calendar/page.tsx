"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Sparkles } from "lucide-react";
import "react-day-picker/dist/style.css";
import { getJournalsByDate } from "@/lib/actions/getJournalsByDate";
import FloatingDoodles from "@/components/FloatingDoodles";


// ✅ Define JournalEntry type
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
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!selectedDate) return;
      const formatted = format(selectedDate, "yyyy-MM-dd");
      const res = await getJournalsByDate(formatted);
      setEntries(res || []);
    };

    fetchEntries();
  }, [selectedDate]);

  // 👇 Dynamic animation CSS
useEffect(() => {
  if (typeof window !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse-fade {
        0% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0.4; transform: scale(1); }
      }

      .animate-pulse-slow {
        animation: pulse-fade 4s ease-in-out infinite;
      }

      .animate-pulse-slower {
        animation: pulse-fade 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }
}, []);


  return (
    <motion.main
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative min-h-screen bg-[#fdf9f3] py-10 px-4"
>

      {/* 🌈 Animated background doodles */}
      {/* 🌸 Scattered Floating Doodles */}



<FloatingDoodles />

      <div className="max-w-3xl mx-auto">
        <div className="relative inline-block">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#815690]">📅 My Journal Calendar</h1>
          <Sparkles className="absolute -top-2 -right-6 text-[#f6a6b2] animate-ping-slow w-6 h-6" />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
            classNames={{
              caption: "text-[#815690] font-bold text-xl",
              nav_button: "text-[#815690] hover:bg-[#fcefee] rounded-full p-1",
              table: "w-full border-spacing-2",
              head_row: "text-[#a37cb4]",
              head_cell: "text-sm font-semibold text-center",
              row: "text-center",
              cell: "w-10 h-10 text-center text-sm rounded-full transition-all duration-300", // ← ⭕ made it a circle
              day: "hover:bg-[#f6a6b2]/20 text-[#5e3d67] rounded-full",
              day_selected: "bg-[#eac2d2] text-white font-bold",
              day_today: "border border-[#f6a6b2]",
              day_disabled: "text-gray-300",
            }}
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
    </motion.main>
  );
}
