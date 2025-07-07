import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Mapping based on hour of the day
function getTimeOfDay(dateStr: string): string {
  const hour = new Date(dateStr).getHours();
  if (hour >= 4 && hour < 8) return "🌅 Early Morning";
  if (hour >= 8 && hour < 12) return "🌞 Morning";
  if (hour >= 12 && hour < 18) return "🌤 Afternoon";
  return "🌙 Night";
}

export async function GET() {
  const { data: entries, error } = await supabase
    .from("journal_entries")
    .select("created_at, mood");

  if (error || !entries) {
    console.error("Error fetching entries:", error);
    return NextResponse.json([]);
  }

  const moodTimeTotals: Record<string, number> = {
    "🌅 Early Morning": 0,
    "🌞 Morning": 0,
    "🌤 Afternoon": 0,
    "🌙 Night": 0,
  };

  for (const entry of entries) {
    const timeOfDay = getTimeOfDay(entry.created_at);
    moodTimeTotals[timeOfDay] += 1;
  }

  const result = Object.entries(moodTimeTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return NextResponse.json(result);
}
