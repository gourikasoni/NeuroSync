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

    if (!moodByDate[date]) moodByDate[date] = {};
    moodByDate[date][entry.mood] = (moodByDate[date][entry.mood] || 0) + 1;
  }

  const result = Object.entries(moodByDate).map(([date, moodCounts]) => {
    // Find most frequent mood for color
    const sorted = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
    const mostFrequentMood = sorted[0][0];

    return {
      date,
      count: Object.values(moodCounts).reduce((a, b) => a + b, 0),
      mood: mostFrequentMood,
      tooltip: Object.entries(moodCounts)
        .map(([mood, count]) => `${mood}: ${count}`)
        .join(", "),
    };
  });

  return NextResponse.json(result);
}
