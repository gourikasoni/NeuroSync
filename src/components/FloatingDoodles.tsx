"use client";

import { motion, easeInOut } from "framer-motion";


const transitionDefaults = (duration: number) => ({
  duration,
  repeat: Infinity,
  ease: easeInOut, // ✅ Now it's a real easing function
  repeatType: "mirror" as const, // ✅ Explicitly typed
});



export default function FloatingDoodles() {
const doodles = [
  { emoji: "✨", className: "top-16 right-20 text-purple-300 text-xl", duration: 10 },
  { emoji: "🧸", className: "top-1/3 right-1/4 text-pink-200 text-2xl", duration: 8 },
  { emoji: "💝", className: "top-1/2 left-20 text-pink-300 text-xl", duration: 10 },
  { emoji: "🎀", className: "bottom-20 right-16 text-purple-200 text-xl", duration: 8 },
  { emoji: "🌷", className: "bottom-28 left-16 text-[#f6a6b2] text-xl", duration: 10 },
];

  return (
   <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

      {doodles.map(({ emoji, className, duration }, index) => (
        <motion.div
          key={index}
          className={`absolute ${className}`}
          animate={{
            y: [0, -10, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.05, 1],
          }}
          transition={transitionDefaults(duration)}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
