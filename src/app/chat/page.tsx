'use client';

import { useEffect, useRef, useState } from 'react';
import ClientOnly from '@/components/ClientOnly';
import { Heart, Sparkles, Star, Moon } from 'lucide-react';


export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ userMessage: input }),
    });
    const data = await res.json();
    const botMessage = { role: 'bot', content: data.reply };

    setMessages((prev) => [...prev, botMessage]);
  };
return (
  <div className="relative min-h-screen bg-[#fdf9f3] flex items-center justify-center p-4 overflow-hidden">
   {/* ✨ Floating Lucide Background Doodles */}
{/* 🌸 Floating Lucide Doodles (Cute + Visible) */}
<div className="absolute inset-0 z-0 pointer-events-none">
  <Sparkles className="absolute top-12 left-10 w-12 h-12 text-pink-300 opacity-60 animate-float" />
  <Star className="absolute top-[40%] right-10 w-10 h-10 text-purple-300 opacity-50 animate-float-alt" />
  <Heart className="absolute bottom-10 left-3 w-14 h-14 text-rose-300 opacity-60 animate-float-slow" />
  <Moon className="absolute bottom-1 right-10 w-16 h-16 text-indigo-300 opacity-50 animate-float" />
</div>



      <div className="w-full max-w-2xl h-[70vh] rounded-3xl shadow-2xl border-2 border-[#f0e6d6] bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#f4d9c6] to-[#e3d7c9] p-4 text-center">
          <h2 className="text-lg font-semibold text-[#8B4513] flex items-center justify-center gap-2">
            <span className="text-xl">💬</span>
            Chat with Syna
            <span className="text-xl">✨</span>
          </h2>
        </div>

        {/* Message List */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 space-y-4 bg-gradient-to-b from-[#fffbf7] to-[#fdf9f3]"
        >
          {messages.length === 0 && (
            <div className="text-center text-[#A0522D] opacity-60 mt-8">
              <div className="text-4xl mb-2">🌸</div>
              <p className="text-sm">Start a conversation with Syna!</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#e3d7c9] to-[#d4c4b0] text-[#5D4037] rounded-br-md max-w-[75%]'
                    : 'bg-gradient-to-r from-[#fff1e6] to-[#ffecd1] text-[#8B4513] rounded-bl-md max-w-[75%]'
                }`}
                style={{ 
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  minWidth: '60px'
                }}
              >
                <div className="break-words whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
                {msg.role === 'bot' && (
                  <div className="text-xs text-[#A0522D] opacity-60 mt-1">
                    Syna 🤖
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        

        <div className="p-3 border-t flex gap-2">
          <ClientOnly>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-xl border-2 border-[#f0e6d6] p-3 outline-none bg-[#fffaf5] placeholder:text-[#a88e7d]"
              placeholder="Tell Syna what’s on your mind... 💭"
              autoComplete="off"
              spellCheck={false}
              name="syna-chat-input"
            />
            <button
              onClick={sendMessage}
              className="bg-[#f4d9c6] text-black rounded-xl px-4 py-2 font-medium hover:bg-[#f3cdb1]"
            >
              Send
            </button>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
