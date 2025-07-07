"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
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
  Legend,
  PieChart,
  Pie,
} from "recharts";

import { supabase } from "@/lib/supabaseClient";


import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getHeatmapData } from "@/lib/utils/getHeatmapData";

import { getMoodFrequency } from "@/lib/utils/getMoodFrequency";
import { getEmotionalDepth } from "@/lib/utils/getEmotionalDepth";
import { getEmotionalArchetype } from "@/lib/utils/getArchetype";
import { moodMeta } from "@/lib/constants/moodMeta";

const MoodTrendsPage = () => {
  const { user } = useUser();
  const [depthScore, setDepthScore] = useState<number>(0);
  const [moodData, setMoodData] = useState<any[]>([]);
  const [dominantMood, setDominantMood] = useState<string | null>(null);
  const [archetype, setArchetype] = useState<any>(null);
  const [moodTimeMap, setMoodTimeMap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);

  const [range, setRange] = useState<"7d" | "30d" | "all">("7d");

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;
      setLoading(true);
const { data: entries } = await supabase
  .from("journal_entries")
  .select("created_at, ai_summary")
  .eq("user_id", user.id);

        const heatmap = getHeatmapData(entries || []);
setHeatmapData(heatmap);


      const depth = getEmotionalDepth(entries || []);
      setDepthScore(depth);

      const rawData = await getMoodFrequency(range, user.id);
      const mapped = rawData.map((entry) => {
        const moodInfo = moodMeta.find((m) => m.emoji === entry.mood);
        return {
          label: moodInfo?.label || entry.mood,
          count: entry.count,
          color: moodInfo?.color || "#d1d5db",
          mood: entry.mood,
        };
      });
      setMoodData(mapped);

      if (mapped.length > 0) {
        const max = mapped.reduce((prev, curr) =>
          curr.count > prev.count ? curr : prev
        );
        setDominantMood(max.label);
        setArchetype(getEmotionalArchetype(mapped));
      } else {
        setDominantMood(null);
        setArchetype(null);
      }

      const res = await fetch("/api/mood-time-map");
      const moodMap = await res.json();
      setMoodTimeMap(moodMap);

      setLoading(false);
    };

    fetchMoodData();
  }, [user, range]);
return loading ? (
    <div className="min-h-screen flex items-center justify-center text-[#815690]">
      Loading your vibes...
    </div>
  ) : (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-12 bg-[#fdf9f3] text-[#5f3a5d] overflow-x-hidden relative"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text drop-shadow-lg"
          >
            💫 Here’s your vibe breakdown, bestie 💖
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-[#9b6b8e] mt-2 italic"
          >
            Your emotions, visualized beautifully ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 flex justify-center gap-4"
          >
            {["7d", "30d", "all"].map((option) => (
              <button
                key={option}
                onClick={() => setRange(option as "7d" | "30d" | "all")}
                className={`px-4 py-1 text-sm rounded-full border ${
                  range === option
                    ? "bg-[#eecff7] border-[#ca89db] text-[#6c2a73]"
                    : "bg-white/50 border-[#e7c6ed] text-[#b08bb9] hover:bg-[#f8e9ff]"
                } transition`}
              >
                {option === "7d"
                  ? "Last 7 days"
                  : option === "30d"
                  ? "Last 30 days"
                  : "All time"}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Scorecards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white/60 border rounded-2xl p-4 text-center">
            <h3 className="text-sm font-semibold">🧠 Depth</h3>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${depthScore}%`,
                  background: "linear-gradient(to right, #f9a8d4, #fcd34d)",
                }}
              />
            </div>
            <p className="text-xs mt-1">{depthScore} / 100</p>
          </div>

          <div className="bg-white/60 border rounded-2xl p-4 text-center">
            <h3 className="text-sm font-semibold">📚 Journals</h3>
            <p className="text-xl font-bold mt-1">
              {moodData.reduce((acc, m) => acc + m.count, 0)}
            </p>
          </div>

          <div className="bg-white/60 border rounded-2xl p-4 text-center">
            <h3 className="text-sm font-semibold">🎨 Variety</h3>
            <p className="text-xl font-bold mt-1">
              {new Set(moodData.map((m) => m.label)).size}
            </p>
          </div>

          <div className="bg-white/60 border rounded-2xl p-4 text-center">
            <h3 className="text-sm font-semibold">🌟 Dominant</h3>
            <p className="text-xl font-bold mt-1">{dominantMood || "—"}</p>
          </div>
        </motion.div>

        {/* Archetype */}
        {archetype && (
          <div
            className={`rounded-[2rem] shadow-xl p-6 text-center ${archetype.bg}`}
          >
            <div className="text-4xl mb-2">{archetype.emoji}</div>
            <h2 className="text-lg font-bold">{archetype.label}</h2>
            <p className="text-sm opacity-80 max-w-md mx-auto">
              {archetype.description}
            </p>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="bg-white/50 border rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">📊 Mood Frequency</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={moodData} barSize={40}>
                <XAxis dataKey="label" tick={{ fill: "#5f3a5d" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#5f3a5d" }} />
                <Tooltip />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {moodData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="bg-white/50 border rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">🍩 Mood Time Map</h3>
            {moodTimeMap.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={moodTimeMap}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name }) => name}
                  >
                    {moodTimeMap.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#fcd34d", "#f9a8d4", "#c4b5fd", "#fdba74"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff0f6",
                      borderRadius: "10px",
                      border: "1px solid #f3c5ea",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm italic text-center text-[#815690] opacity-60">
                No data for time map
              </p>
            )}
          </motion.div>
        </div>

        {/* Line Chart */}
        <div className="bg-white/50 border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">📈 Mood Timeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3d1ef" />
              <XAxis dataKey="label" tick={{ fill: "#5f3a5d" }} />
              <YAxis allowDecimals={false} tick={{ fill: "#5f3a5d" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#da8ddc"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/50 border rounded-2xl p-6">
  <h3 className="text-lg font-semibold mb-4">📅 Mood Calendar</h3>
  <CalendarHeatmap
    startDate={new Date(new Date().setMonth(new Date().getMonth() - 5))}
    endDate={new Date()}
    values={heatmapData}
    classForValue={(value) => {
      if (!value) return "color-empty";
      if (value.count >= 4) return "color-scale-4";
      if (value.count === 3) return "color-scale-3";
      if (value.count === 2) return "color-scale-2";
      return "color-scale-1";
    }}
    showWeekdayLabels
  />
</div>

      </div>
    </motion.main>
  );
};

export default MoodTrendsPage;