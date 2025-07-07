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
  const [barSize, setBarSize] = useState(40);


  const [range, setRange] = useState<"7d" | "30d" | "all">("7d");

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;
      setLoading(true);
      const { data: entries } = await supabase
        .from("journal_entries")
        .select("created_at, ai_summary")
        .eq("user_id", user.id);

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

      const res2 = await fetch("/api/mood-time-map");
      const moodMap = await res2.json();
      setMoodTimeMap(moodMap);

      setLoading(false);
    };

    fetchMoodData();
     if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 640;
    setBarSize(isMobile ? 20 : 40);
  }
  }, [user, range]);
  const CustomTick = ({ x, y, payload }: any) => {
  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="end"
      transform={`rotate(-30, ${x}, ${y})`}
      fill="#5f3a5d"
      fontSize={11}
      fontWeight={600}
    >
      {payload.value}
    </text>
  );
};


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
            className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#815690] to-[#e5b5e7]"
          >
            Here’s what your heart’s been saying lately
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
            {['7d', '30d', 'all'].map((option) => (
              <button
                key={option}
                onClick={() => setRange(option as '7d' | '30d' | 'all')}
                className={`px-4 py-1 text-sm rounded-full border ${
                  range === option
                    ? 'bg-[#eecff7] border-[#ca89db] text-[#6c2a73]'
                    : 'bg-white/50 border-[#e7c6ed] text-[#b08bb9] hover:bg-[#f8e9ff]'
                } transition`}
              >
                {option === '7d' ? 'Last 7 days' : option === '30d' ? 'Last 30 days' : 'All time'}
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
                  {/* Bar Chart Enhancements */}
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="rounded-[2rem] backdrop-blur-xl border border-[#f0e1f7] bg-white/60 shadow-[0_0_40px_rgba(255,230,255,0.3)] p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#6c2a73] flex items-center gap-2">
            <span className="text-2xl">📊</span> <span>Mood Frequency</span>
          </h3>
          <div className="min-w-0"></div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
  data={moodData}
  barSize={barSize}
  margin={{ top: 20, right: 30, left: 30, bottom: 50 }}
>

             <XAxis dataKey="label" tick={<CustomTick />}  interval={0}/>

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#815690", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff0f7",
                  border: "1px solid #e7bce3",
                  borderRadius: "10px",
                }}
              />
              <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                {moodData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
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
                          ["#fcd34d", "#f9a8d4", "#c4b5fd", "#fdba74"][index % 4]
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
      </div>
    </motion.main>
  );
};

export default MoodTrendsPage;
