// src/lib/utils/getArchetype.ts

type Archetype = {
  label: string;
  emoji: string;
  description: string;
  bg: string;
  moods: string[]; // emoji list
};

const archetypes: Archetype[] = [
  {
    label: "The Healer",
    emoji: "🧘",
    description: "You’ve been calm, grateful, and peaceful this week.",
    bg: "bg-[#e6f5f0]",
    moods: ["😌", "🤗", "😴"],
  },
  {
    label: "The Fighter",
    emoji: "🔥",
    description: "You’ve been battling intense emotions and pushing through.",
    bg: "bg-[#ffe5e9]",
    moods: ["😡", "😰", "😢"],
  },
  {
    label: "The Dreamer",
    emoji: "🌈",
    description: "Your vibe is expressive and imaginative — keep dreaming!",
    bg: "bg-[#f4e1f5]",
    moods: ["😊", "🤗", "😌"],
  },
  {
    label: "The Storm",
    emoji: "🌪️",
    description: "This week felt like an emotional whirlwind — hang in there.",
    bg: "bg-[#eaeaea]",
    moods: ["😰", "😢", "🥺", "😡"],
  },
];

type MoodCount = {
  mood: string;
  count: number;
};

export function getEmotionalArchetype(moods: MoodCount[]) {
  const moodMap = Object.fromEntries(moods.map((m) => [m.mood, m.count]));

  const scored = archetypes.map((a) => ({
    ...a,
    score: a.moods.reduce((sum, mood) => sum + (moodMap[mood] || 0), 0),
  }));

  return scored.reduce((a, b) => (b.score > a.score ? b : a));
}
