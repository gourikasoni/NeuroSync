"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { getMoodFrequency } from "@/lib/utils/getMoodFrequency";
import { moodMeta } from "@/lib/constants/moodMeta";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";

const MoodTrendsPage = () => {
  const { user } = useUser();
  const [range, setRange] = useState<"7d" | "30d" | "all">("7d");
  const [moodData, setMoodData] = useState<{ label: string; count: number; color: string }[]>([]);
  const [dominantMood, setDominantMood] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;
      const rawData = await getMoodFrequency(range, user.id);

      const mapped = rawData.map((entry) => {
        const moodInfo = moodMeta.find((m) => m.emoji === entry.mood);
        return {
          label: moodInfo?.label || entry.mood,
          count: entry.count,
          color: moodInfo?.color || "#d1d5db",

        };
      });

      setMoodData(mapped);

      const max = mapped.reduce(
        (prev, curr) => (curr.count > prev.count ? curr : prev),
        mapped[0]
      );
      setDominantMood(max?.label || null);
    };

    fetchMoodData();
  }, [range, user]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#fdf9f3] to-[#f5eaf4] text-[#5f3a5d]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            💫 Here’s your vibe breakdown, bestie 💖
          </h1>
          <p className="text-sm text-[#9b6b8e] mt-2">Mood analytics across time ranges</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {["7d", "30d", "all"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as any)}
              className={`px-4 py-2 rounded-full shadow text-sm font-medium transition-all backdrop-blur border ${
                range === r
                  ? "bg-[#f6e0f5] text-[#5f3a5d] border-[#dfb3e5]"
                  : "text-gray-500 border-gray-300 hover:bg-[#f6e0f5]/50"
              }`}
            >
              {r === "7d" ? "Last 7 Days" : r === "30d" ? "Last 30 Days" : "All Time"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/70 border border-[#f3d1ef] p-4 rounded-2xl shadow-xl text-center">
            <h2 className="text-lg font-semibold">📊 Journals</h2>
            <p className="text-2xl">{moodData.reduce((acc, m) => acc + m.count, 0)}</p>
          </div>
          <div className="bg-white/70 border border-[#f3d1ef] p-4 rounded-2xl shadow-xl text-center">
            <h2 className="text-lg font-semibold">💡 Moods Felt</h2>
            <p className="text-2xl">{moodData.length}</p>
          </div>
          <div className="bg-white/70 border border-[#f3d1ef] p-4 rounded-2xl shadow-xl text-center">
            <h2 className="text-lg font-semibold">🌟 Dominant Mood</h2>
            <p className="text-xl font-bold">{dominantMood || "—"}</p>
          </div>
          <div className="bg-white/70 border border-[#f3d1ef] p-4 rounded-2xl shadow-xl text-center">
            <h2 className="text-lg font-semibold">✨ Mood Variety</h2>
            <p className="text-2xl">{new Set(moodData.map((m) => m.label)).size}</p>
          </div>
        </div>

        {/* Bar Chart - Upgraded */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-3">🔋 Mood Frequency</h2>
          <div className="h-[320px] rounded-xl backdrop-blur bg-white/60 border border-[#dab5e3] p-6 shadow-2xl transition-all hover:scale-[1.01]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodData} barSize={42}>
                <XAxis dataKey="label" tick={{ fill: "#5f3a5d" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#5f3a5d" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff0f6", borderRadius: "10px", border: "1px solid #f3c5ea" }}
                  formatter={(value: any, name: any, props: any) => [value, `Count`]}
                  labelFormatter={(label: any) => `Mood: ${label}`}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Mood over Time */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">📈 Mood Trend Timeline</h2>
          <div className="h-[320px] rounded-xl backdrop-blur bg-white/60 border border-[#dab5e3] p-6 shadow-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3d1ef" />
                <XAxis dataKey="label" tick={{ fill: "#5f3a5d" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#5f3a5d" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff0f6", borderRadius: "10px", border: "1px solid #f3c5ea" }}
                />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#da8ddc" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-10 text-center text-[#815690] text-sm opacity-70 italic">
          🌈 More vibes + AI emotion summaries coming soon ✨
        </div>
      </div>
    </motion.main>
  );
};

export default MoodTrendsPage;
