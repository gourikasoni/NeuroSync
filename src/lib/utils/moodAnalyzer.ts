// lib/utils/moodAnalyzer.ts

export function generateAISummary(content: string, mood: string): string {
  const lowerContent = content.toLowerCase();

  // Detect distressing content
  const distressKeywords = ['suicide', 'kill myself', 'die', 'end it', 'worthless'];
  const hasDistress = distressKeywords.some(keyword => lowerContent.includes(keyword));

  if (hasDistress) {
    return [
      "💬 It sounds like you're going through something incredibly difficult.",
      "You're not alone — even in your darkest moments, help is available.",
      "Please reach out to a trusted friend, family member, or a mental health professional.",
      "Your life has value, and your presence matters more than you know.",
      "This moment is painful, but it's not the end of your story.",
      "Consider talking to a therapist or calling a support line — you're worth it.",
      "❤️ You are loved, even when it doesn't feel that way.",
      "There is no shame in asking for help — it's a brave thing to do.",
      "You’ve already taken a step by expressing how you feel. That’s strength.",
      "Please be kind to yourself — you matter. 💖"
    ].join('\n');
  }

  // General summary generator based on mood
  const moodTemplates: { [key: string]: string[] } = {
    '😊': [
      "Your happiness is radiant and truly uplifting!",
      "Celebrate every small joy — it adds up 🌟",
      "You deserve to feel this lightness.",
      "Keep doing what sparks this joy in you.",
      "Remember, sharing happiness multiplies it ✨",
      "Maybe capture this moment in photos or a playlist?",
      "Let this mood inspire others around you!",
      "Gratitude journals are great for days like this 🌸",
      "You’ve earned this peace.",
      "Keep smiling — it looks good on you 😊"
    ],
    '😢': [
      "I'm so sorry you're feeling this way today.",
      "Your sadness is valid and deserves space.",
      "Crying doesn’t make you weak — it makes you real.",
      "Try writing a letter to yourself filled with kindness 💌",
      "Watch something comforting or revisit good memories.",
      "Drink water, eat something soothing, and rest a bit.",
      "This feeling won’t last forever — you’re healing.",
      "Let music or journaling carry some of the weight.",
      "You're not alone in this sadness.",
      "You're doing your best, and that’s enough 💙"
    ],
    '😰': [
      "Anxiety is so tough, and you're facing it head-on.",
      "Take slow, deep breaths. Inhale... exhale 🌬️",
      "You’ve survived every hard moment so far — this too will pass.",
      "Try grounding: 5 things you see, 4 you can touch...",
      "Stretch your body — even for 1 minute.",
      "Talk to someone safe about your worries.",
      "Remember, thoughts aren’t always truths.",
      "Try soft instrumental music or nature sounds.",
      "It's okay to take a break.",
      "You’re strong for showing up today 💜"
    ],
    '😡': [
      "Your anger is telling you something matters deeply.",
      "It’s okay to feel mad — it doesn’t define you.",
      "Try punching a pillow or scribbling on paper.",
      "Take a walk or do a quick shake-out.",
      "Write an unsent letter to release emotions.",
      "Breathe before you speak — even 3 seconds helps.",
      "You have the right to feel and be heard.",
      "Use that fire to assert your needs healthily.",
      "You're not ‘too much’. You're passionate.",
      "Keep protecting your peace 🔥"
    ],
    '😴': [
      "You sound so exhausted. It’s okay to rest.",
      "Sleep isn't a reward — it's a necessity 💤",
      "Try a 10-minute nap or stretch with soft lighting.",
      "Drink some warm tea or water.",
      "Your body is asking for care, not punishment.",
      "Turn off screens early if you can tonight.",
      "Listen to sleep stories or calming music.",
      "Let go of productivity guilt.",
      "Healing happens in rest too.",
      "You deserve peace and stillness tonight 🌙"
    ],
    '🤗': [
      "Gratitude is such a beautiful emotion 💖",
      "Cherish the good — even the tiniest joys matter.",
      "Take a moment to say thank you out loud.",
      "Let others know they matter to you today.",
      "Capture this gratitude in a note or a photo.",
      "Your heart is open and warm — how lovely.",
      "Kindness attracts kindness 🌸",
      "Gratitude helps us stay grounded.",
      "Spread that positive energy around!",
      "You're glowing — keep it up ✨"
    ],
    '😌': [
      "What a calming energy you’re radiating today 🕊️",
      "Soak in this peace — it’s well deserved.",
      "Let this calmness recharge your soul.",
      "Write down what brought this feeling.",
      "Enjoy the silence — it’s healing too.",
      "Treat yourself gently — no rush.",
      "Let this inner stillness guide your decisions.",
      "Read, rest, or just be — it’s enough.",
      "You’re glowing with serenity.",
      "Keep choosing peace 💫"
    ],
    '🥺': [
      "It seems like today is overwhelming — and that’s okay.",
      "You’re carrying a lot, and still moving forward.",
      "Be gentle with yourself today 💞",
      "Break tasks into tiny steps.",
      "Ask for help — it’s a brave move.",
      "Cry if you need to — release helps.",
      "Pause. Breathe. Reset.",
      "You won’t feel like this forever.",
      "This storm will pass.",
      "You are stronger than you think 💪"
    ]
  };

  const fallback = [
    "Your emotions are valid — all of them.",
    "No matter what you're feeling, it's okay.",
    "You took time to reflect, and that’s powerful.",
    "Your journal is a safe space for honesty.",
    "Keep writing — your story matters."
  ];

  return (moodTemplates[mood] || fallback).join('\n');
}
