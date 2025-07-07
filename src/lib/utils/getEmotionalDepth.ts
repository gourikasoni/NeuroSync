export function getEmotionalDepth(entries: { ai_summary: string }[]): number {
  if (!entries.length) return 0;

  let totalScore = 0;

  for (const entry of entries) {
    const summary = entry.ai_summary || "";
    const wordCount = summary.split(/\s+/).length;

    // Depth score based on word count (basic for now)
    if (wordCount < 30) totalScore += 25;
    else if (wordCount < 50) totalScore += 50;
    else if (wordCount < 80) totalScore += 75;
    else totalScore += 100;
  }

  return Math.round(totalScore / entries.length); // average out
}
