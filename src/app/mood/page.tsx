"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getMoodFrequency } from "@/lib/utils/getMoodFrequency";
import { moodMeta } from "@/lib/constants/moodMeta";

export default function MoodTrendsPage() {
  const { user, isLoaded } = useUser(); // ✅ Only declare once
  const [range, setRange] = useState<"7d" | "30d" | "all">("7d");
  const [moodData, setMoodData] = useState<{
    label: string;
    count: number;
    color: string;
  }[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchMoodData = async () => {
      const rawData = await getMoodFrequency(range, user.id);

      const mapped = rawData.map((entry) => {
        const moodInfo = moodMeta.find((m) => m.emoji === entry.mood);
        return {
          label: `${entry.mood} ${moodInfo?.label || ""}`.trim(),
          count: entry.count,
          color: moodInfo?.color || "#e2e8f0",
        };
      });

      setMoodData(mapped);
    };

    fetchMoodData();
  }, [range, isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="text-center py-20 text-[#815690] font-semibold">
        Loading your mood data...
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#fdf9f3] py-10 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative inline-block mb-6">
          <h1 className="text-3xl font-bold text-center text-[#815690]">
            📈 Mood Trends
          </h1>
          <Sparkles className="absolute -top-2 -right-6 text-[#f6a6b2] animate-ping w-6 h-6" />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {["7d", "30d", "all"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as "7d" | "30d" | "all")}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                range === r
                  ? "bg-[#fcefee] text-[#815690] border-[#e9c4f1]"
                  : "text-gray-500 border-gray-300 hover:bg-[#fcefee]/50"
              }`}
            >
              {r === "7d"
                ? "Last 7 Days"
                : r === "30d"
                ? "Last 30 Days"
                : "All Time"}
            </button>
          ))}
        </div>

        {/* Mood Chart */}
        <div className="h-[300px] bg-white/90 border border-[#dab5e3] rounded-xl p-4 shadow-xl">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moodData} barSize={38}>
              <XAxis dataKey="label" tick={{ fill: "#815690", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "#815690", fontSize: 12 }} />
              <Tooltip cursor={{ fill: "#fcefee" }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} isAnimationActive>
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Coming Soon Sections */}
        <div className="h-[300px] bg-white/60 border border-dashed border-[#dab5e3] rounded-xl flex items-center justify-center text-[#815690] text-sm mt-6">
          📈 Mood Over Time Chart Coming Soon
        </div>

        <div className="h-[200px] bg-white/60 border border-dashed border-[#dab5e3] rounded-xl flex items-center justify-center text-[#815690] text-sm mt-4">
          🥧 Mood Share Pie Chart Coming Soon
        </div>

        <div className="text-center text-[#815690] text-lg font-semibold mt-6">
          💡 Dominant Mood: Coming Soon!
        </div>
      </div>
    </motion.main>
  );
}
