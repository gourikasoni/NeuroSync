import { supabase } from "@/lib/supabaseClient";

import { format, subDays } from "date-fns";

// fallback dummy user ID for resume/demo projects (adjust this if you're using Clerk manually)
const fallbackUserId = "your-hardcoded-user-id"; // replace with your Clerk user id if you're not using RLS

export async function getMoodFrequency(
  range: "7d" | "30d" | "all",
  userId: string
) {
  const today = new Date();
  let fromDate: Date | undefined;

  if (range === "7d") fromDate = subDays(today, 7);
  else if (range === "30d") fromDate = subDays(today, 30);

  const formattedFrom = fromDate ? format(fromDate, "yyyy-MM-dd") : "1900-01-01";

  const { data, error } = await supabase
    .from("journal_entries")
    .select("mood")
    .eq("user_id", userId) // ✅ passed from Clerk
    .gte("created_at", formattedFrom);

  if (error || !data) {
    console.error("Error fetching mood data:", error);
    return [];
  }

  const moodMap: Record<string, number> = {};

  data.forEach((entry) => {
    if (entry.mood) {
      moodMap[entry.mood] = (moodMap[entry.mood] || 0) + 1;
    }
  });

  return Object.entries(moodMap).map(([mood, count]) => ({ mood, count }));
}
