// getMoodTimeMap.ts

export type TimeOfDay =
  | "🌅 Early Morning"
  | "🌞 Morning"
  | "🌤 Afternoon"
  | "🌙 Night";

export type MoodTimeMap = {
  [mood: string]: Record<TimeOfDay, number>;
};

export async function getMoodTimeMap(userId: string): Promise<MoodTimeMap> {
  // logic...
  return {
    "😊 Happy": {
      "🌅 Early Morning": 2,
      "🌞 Morning": 5,
      "🌤 Afternoon": 3,
      "🌙 Night": 1,
    },
    "😰 Anxious": {
      "🌅 Early Morning": 0,
      "🌞 Morning": 1,
      "🌤 Afternoon": 4,
      "🌙 Night": 6,
    },
  };
}
