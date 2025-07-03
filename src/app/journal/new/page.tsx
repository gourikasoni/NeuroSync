'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Heart, Flower, Star, Sun, Cloud, Smile, Zap } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { addJournalEntry } from '@/lib/actions/addJournalEntry';

const positiveAffirmations = [
  "You are enough 💕",
  "This feeling will pass 🌙",
  "You're doing great 🌟",
  "Be kind to yourself 🌸",
  "You are loved 💖",
  "Progress over perfection ✨",
  "Your feelings are valid 🦋",
  "You're stronger than you know 💪",
  "Take it one breath at a time 🌿",
  "You matter 🌺"
];

export default function NewJournalPage() {
  const { user } = useUser();

  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hoveredMood, setHoveredMood] = useState('');
  const [randomAffirmation, setRandomAffirmation] = useState('');

  useEffect(() => {
    const random = positiveAffirmations[Math.floor(Math.random() * positiveAffirmations.length)];
    setRandomAffirmation(random);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addJournalEntry(content, mood);
      setMessage('✨ Your feelings are valid and beautiful! Journal saved 💖');
      setContent('');
      setMood('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to save journal.');
    }

    setLoading(false);
  };

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-50 border-yellow-200', hoverColor: 'hover:bg-yellow-100 hover:border-yellow-300' },
    { emoji: '😢', label: 'Sad', color: 'bg-blue-50 border-blue-200', hoverColor: 'hover:bg-blue-100 hover:border-blue-300' },
    { emoji: '😰', label: 'Anxious', color: 'bg-purple-50 border-purple-200', hoverColor: 'hover:bg-purple-100 hover:border-purple-300' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-50 border-red-200', hoverColor: 'hover:bg-red-100 hover:border-red-300' },
    { emoji: '😴', label: 'Tired', color: 'bg-slate-50 border-slate-200', hoverColor: 'hover:bg-slate-100 hover:border-slate-300' },
    { emoji: '🤗', label: 'Grateful', color: 'bg-pink-50 border-pink-200', hoverColor: 'hover:bg-pink-100 hover:border-pink-300' },
    { emoji: '😌', label: 'Peaceful', color: 'bg-green-50 border-green-200', hoverColor: 'hover:bg-green-100 hover:border-green-300' },
    { emoji: '🥺', label: 'Overwhelmed', color: 'bg-orange-50 border-orange-200', hoverColor: 'hover:bg-orange-100 hover:border-orange-300' }
  ];

  const positiveAffirmations = [
    "You are enough 💕",
    "This feeling will pass 🌙",
    "You're doing great 🌟",
    "Be kind to yourself 🌸",
    "You are loved 💖",
    "Progress over perfection ✨",
    "Your feelings are valid 🦋",
    "You're stronger than you know 💪",
    "Take it one breath at a time 🌿",
    "You matter 🌺"
  ];

  const floatingElements = [
    { Icon: Sparkles, className: 'top-20 left-10 animate-pulse' },
    { Icon: Heart, className: 'top-32 right-16 animate-bounce' },
    { Icon: Flower, className: 'bottom-40 left-8 animate-pulse' },
    { Icon: Star, className: 'top-48 right-32 animate-ping' },
    { Icon: Sun, className: 'bottom-32 right-12 animate-pulse' },
    { Icon: Cloud, className: 'top-16 left-1/3 animate-bounce' }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fdf9f3' }}>
      {/* 🌸 Floating icons */}
      {floatingElements.map(({ Icon, className }, i) => (
        <div
          key={i}
          className={`absolute ${className} z-0`}
          style={{
            animationDelay: `${i * 0.5}s`,
            color: i % 2 === 0 ? '#c7afea' : '#f6a6b2'
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
      ))}

      {/* 🌼 Floating affirmations */}
<div className="absolute inset-0 pointer-events-none z-0">
  {[
    { text: "You're doing great 🌟", top: 'top-24', left: 'left-12' },
    { text: "You are enough 💕", top: 'top-1/2', left: 'right-16' },
    { text: "Take it one breath at a time 🌿", top: 'bottom-80', left: 'left-20' },
    { text: "Progress over perfection ✨", top: 'bottom-32', left: 'right-28' }
  ].map(({ text, top, left }, i) => (
    <div
      key={i}
      className={`absolute ${top} ${left} animate-bounce text-xs font-medium px-3 py-1 rounded-full shadow-lg border text-gray-600`}
      style={{
        animationDelay: `${i * 0.8}s`,
        animationDuration: `${2 + i * 0.3}s`,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        borderColor: '#c7afea'
      }}
    >
      {text}
    </div>
  ))}
</div>

      {/* 🌷 Main Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="p-4 rounded-full animate-pulse bg-gradient-to-br from-[#c7afea] to-[#f6a6b2]">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#815690] to-[#e5b5e7]">
            Hey {user?.firstName || 'beautiful'} 💕
          </h1>
          <p className="text-lg font-medium text-gray-500">Your feelings matter. Let's explore them together 🌸</p>
        </div>

        {/* 🌻 Journal Card */}
        <form onSubmit={handleSubmit}>
          <div className="backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-[#c7afea] bg-white/80">
            <div className="space-y-8">
              {/* Emoji Mood Picker */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-center text-gray-700">
                  How are you feeling right now? 🥺
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {moods.map(({ emoji, label, color, hoverColor }, index) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setMood(emoji)}
                      onMouseEnter={() => setHoveredMood(emoji)}
                      onMouseLeave={() => setHoveredMood('')}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform ${color} ${hoverColor} ${
                        mood === emoji
                          ? 'scale-110 shadow-lg ring-2'
                          : hoveredMood === emoji
                          ? 'scale-105 shadow-md -rotate-2'
                          : 'hover:scale-105 hover:shadow-md hover:-rotate-1'
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${mood === emoji ? 'animate-bounce' : ''}`}>{emoji}</div>
                      <div className="text-xs font-medium text-gray-700">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Mood Message */}
              {mood && (
                <div className="text-center p-4 rounded-2xl border bg-gradient-to-br from-[#eedaef] to-[#ba91b6] border-[#745079] text-white animate-float">
                  {mood === '😊' && "Your joy is contagious! ✨"}
                  {mood === '😢' && "It's okay to feel sad. You're being so brave 💙"}
                  {mood === '😰' && "Anxiety is hard, but you're not alone. Take deep breaths 🌸"}
                  {mood === '😡' && "Your anger is valid. Let's process it together 🔥"}
                  {mood === '😴' && "Rest is productive too. You're doing enough 💤"}
                  {mood === '🤗' && "Gratitude looks beautiful on you! 🌺"}
                  {mood === '😌' && "Peace suits you perfectly 🕊️"}
                  {mood === '🥺' && "Feeling overwhelmed is human. You're stronger than you know 💪"}
                </div>
              )}

              {/* Journal Textarea */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-center text-gray-700">
                  Pour your heart out 💭
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Dear self, today I'm feeling... and that's okay."
                  className="w-full p-6 rounded-2xl border-2 border-[#c7afea] bg-white/70 shadow-inner resize-none h-48 text-gray-700"
                  required
                />
              </div>

              {/* Random Affirmation */}
              <div className="text-center p-4 rounded-2xl border bg-[#f3e1e1] border-[#a6d3f2]">
                <Smile className="w-6 h-6 mx-auto mb-2 animate-bounce text-gray-700" />
                <p className="font-medium text-gray-700">
                  💫 {randomAffirmation}

                </p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-white font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 relative overflow-hidden hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, #c7afea, #f6a6b2, #a6d3f2)`
                }}
              >
                <span className="inline-block mr-2 animate-pulse">{loading ? '💕' : '🌸'}</span>
                {loading ? 'Saving your beautiful thoughts...' : 'Save My Feelings'}
              </button>

              {/* Status Message */}
              {message && (
                <div className="text-center p-4 rounded-2xl border  bg-[#b8e0d2] border-[#a6d3f2]">
                  <Zap className="w-5 h-5 mx-auto mb-2 text-gray-700" />
                  <p className="font-medium text-gray-700">{message}</p>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer Affirmation */}
        <div className="text-center mt-8">
          <div className="inline-block px-6 py-3 backdrop-blur-sm rounded-full shadow-lg border animate-bounce bg-white/70 border-[#c7afea]">
            <p className="font-medium flex items-center gap-2 text-gray-700">
              <Heart className="w-4 h-4 text-[#f6a6b2]" />
              You're exactly where you need to be
              <Sparkles className="w-4 h-4 text-[#c7afea]" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
