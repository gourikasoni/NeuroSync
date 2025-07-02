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
        {/* Floating Heart + Badge side by side */}
        {/* Floating Heart + Badge side by side */}
<div className="absolute top-20 left-10 flex items-center gap-2 animate-bounce">
  <Heart className="w-6 h-6 text-[#f9c88f]" />
  <div className="bg-white/60 backdrop-blur-sm text-[#7c9f87] text-xs px-3 py-1 rounded-full border border-[#cde4d6] shadow-sm font-medium">
    Your Mental Wellness Journey
  </div>
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
              {/* Spacer to avoid overlap with floating badge */}
<div className="h-20 sm:h-3 lg:h-11"></div>


              {/* Main Heading */}
              <div className="space-y-4">
                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
  <span className="text-[#676767]">Soft Brains. </span>
  <span className="text-[#9e7bb5]">Loud Feelings. </span>
  <span className="text-[#cc859a]">Welcome to NeuroSync.</span>
</h1>

                <div className="flex justify-center lg:justify-start">
                  <div className="w-20 h-1 bg-gradient-to-r from-[#d88bde] to-[#f9c88f] rounded-full"></div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-[#676767] leading-relaxed max-w-lg mx-auto lg:mx-0">
               Journal the chaos, track your vibes, cry if needed   NeuroSync got you 🌷

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
  className="group relative rounded-full px-8 py-5 text-base font-semibold text-[#646363] bg-gradient-to-r from-[#d6dfcb] to-[#8fad87] hover:from-[#8fad87] hover:to-[#d6dfcb] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
  onClick={() => router.push('/dashboard')}
>
  <span className="flex items-center gap-2">
    Start Your Journey
    <span className="group-hover:translate-x-1 transition-transform duration-300">✨</span>
  </span>
</Button>


                <p className="text-sm text-[#888]">Free to start • </p>
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
                    src="/brain-cute.png"
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
