import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("journal_entries")
    .select("created_at, mood")
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }

  const moodByDate: Record<string, Record<string, number>> = {};

  for (const entry of data || []) {
    const date = new Date(entry.created_at).toISOString().split("T")[0]; // yyyy-mm-dd
    const mood = entry.mood;

    if (!moodByDate[date]) moodByDate[date] = {};
    if (!moodByDate[date][mood]) moodByDate[date][mood] = 0;
    moodByDate[date][mood]++;
  }

  const result = Object.entries(moodByDate).map(([date, moods]) => {
    const mostFrequentMood = Object.entries(moods).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    return {
      date,
      moods,                // ✅ full mood breakdown
      mostFrequentMood,     // ✅ used for color
    };
  });

  return NextResponse.json(result);
}
