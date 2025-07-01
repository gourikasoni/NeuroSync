'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, Sparkles, Star, Moon } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#fdf9f3]">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-[#f9c88f] animate-bounce">
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute top-40 right-20 text-[#d88bde] animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 left-20 text-[#9ac6b5] animate-bounce delay-700">
          <Star className="w-5 h-5" />
        </div>
        <div className="absolute top-60 left-1/3 text-[#ffcbcb] animate-pulse delay-300">
          <Moon className="w-4 h-4" />
        </div>
        <div className="absolute bottom-20 right-10 text-[#b790be] animate-bounce delay-500">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE - TEXT */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-right gap-2 bg-[#fff5f7] rounded-full px-4 py-2 text-sm font-medium text-[#b790be] border border-[#eeddf2] shadow-sm">
                <Sparkles className="w-4 h-4" />
                Your Mental Wellness Journey
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c2c2c] leading-tight">
                  Take Care Of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b790be] to-[#f47c7c]">
                    Your Mental Health
                  </span>
                </h1>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-20 h-1 bg-gradient-to-r from-[#d88bde] to-[#f9c88f] rounded-full"></div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-[#676767] leading-relaxed max-w-lg mx-auto lg:mx-0">
                NeuroSync helps you reflect, journal, and grow. Track your emotions and let AI help you heal 🌱
              </p>

              {/* Features List */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2 bg-[#fdf3f9] rounded-full px-3 py-2 text-[#d88bde]">
                  <Heart className="w-4 h-4" />
                  Emotion Tracking
                </div>
                <div className="flex items-center gap-2 bg-[#f3f9f8] rounded-full px-3 py-2 text-[#9ac6b5]">
                  <Star className="w-4 h-4" />
                  AI Insights
                </div>
                <div className="flex items-center gap-2 bg-[#fbe4e4] rounded-full px-3 py-2 text-[#f9c88f]">
                  <Moon className="w-4 h-4" />
                  Daily Reflection
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button
                  className="group relative rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#d4a0dd] to-[#f8e0b1] hover:from-[#b68dc2] hover:to-[#daaad8] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                  onClick={() => router.push('/dashboard')}
                >
                  <span className="flex items-center gap-2">
                    Start Your Journey
                    <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                  </span>
                </Button>
                <p className="text-sm text-[#888]">Free to start • No credit card required</p>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f3e8ff] rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#fcddec] rounded-full opacity-40 animate-pulse delay-700"></div>
                
                {/* Main image container */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
                  <Image
                    src="/brain-Illustration.png"
                    alt="Cute Brain Illustration"
                    width={400}
                    height={400}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Floating elements around image */}
                <div className="absolute -top-2 right-10 bg-[#fff2b6] rounded-full p-3 shadow-lg animate-bounce delay-300">
                  <Sparkles className="w-5 h-5 text-[#f4b400]" />
                </div>
                <div className="absolute bottom-4 -left-2 bg-[#d4fbe3] rounded-full p-2 shadow-lg animate-bounce delay-500">
                  <Heart className="w-4 h-4 text-[#34d399]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent backdrop-blur-sm"></div>
    </main>
  );
}
