// lib/utils/getHeatmapData.ts

export function getHeatmapData(entries: { created_at: string }[]) {
  const countMap: Record<string, number> = {};

  for (const entry of entries) {
    const date = entry.created_at.slice(0, 10); // format: YYYY-MM-DD
    countMap[date] = (countMap[date] || 0) + 1;
  }

  return Object.keys(countMap).map((date) => ({
    date,
    count: countMap[date],
  }));
}
