"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "../libs/utils";

export default function QuoteMaskSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  // IMPORTANT: We cannot return null early if that causes Hooks to be skipped.
  // Instead, we handle the 'mounted' check only for the rendering part involving theme, or use a layout effect.
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // --- 1. Mouse Tracking Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add physics (spring) to the mouse movement for that "fluid" feel
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const maskX = useSpring(mouseX, springConfig);
  const maskY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // --- 2. Motion Value Templates (Hooks) ---
  // Must be called unconditionally at top level
  const maskImage = useMotionTemplate(maskX, maskY, isHovered);
  const webkitMaskImage = useMotionTemplate(maskX, maskY, isHovered);

  const isDark = theme === "dark";

  // If not mounted, render a placeholder or nothing, BUT AFTER all hooks
  if (!mounted) {
    return (
      <section className="relative w-full h-[80vh] bg-gray-100 dark:bg-[#0a0a0a] border-t border-b border-gray-200 dark:border-white/10" />
    );
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[80vh] overflow-hidden cursor-none bg-gray-100 dark:bg-[#0a0a0a] border-t border-b border-gray-200 dark:border-white/10"
    >
      {/* --- LAYER 1: BASE (Visible by default) --- */}
      <div className="absolute inset-0 z-0">
        {isDark ? <DarkContent /> : <LightContent />}
      </div>

      {/* --- LAYER 2: THE REVEAL MASK (Visible only inside cursor) --- */}
      <motion.div
        className="absolute inset-0 z-10 bg-black dark:bg-white"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: webkitMaskImage,
        }}
      >
        {/* Inside the mask, we show the OPPOSITE content */}
        {isDark ? (
          <div className="w-full h-full bg-white text-black">
            <LightContent />
          </div>
        ) : (
          <div className="w-full h-full bg-[#0a0a0a] text-white">
            <DarkContent />
          </div>
        )}
      </motion.div>

      {/* --- LAYER 3: VISUAL CURSOR RING --- */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-current pointer-events-none z-50 flex items-center justify-center text-slate-900 dark:text-white"
        style={{ x: maskX, y: maskY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-1 h-1 bg-current rounded-full" />
      </motion.div>
    </section>
  );
}

// --- Content Components ---
const LightContent = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-10">
    <h2 className="text-[10vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter text-slate-900 uppercase text-center select-none">
      Think <br /> Simple
    </h2>
    <p className="mt-8 text-xl md:text-2xl font-medium text-slate-600 max-w-lg text-center font-serif">
      "Simplicity is the ultimate sophistication."
    </p>
  </div>
);

const DarkContent = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-10">
    <h2 className="text-[10vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter text-white uppercase text-center select-none">
      Build <br /> Complex
    </h2>
    <p className="mt-8 text-xl md:text-2xl font-medium text-slate-300 max-w-lg text-center font-serif">
      "Chaos is the engine of innovation."
    </p>
  </div>
);

// --- Custom Hook for Template ---
function useMotionTemplate(x: any, y: any, isHovered: boolean) {
  return useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const size = isHovered ? 400 : 0;
      return `radial-gradient(circle ${size}px at ${latestX}px ${latestY}px, black 100%, transparent 100%)`;
    }
  );
}