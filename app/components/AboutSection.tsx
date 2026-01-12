"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Custom Shapes for the "Cipher" Effect ---
// These replace standard keyboard characters for a high-end UI look.

const CipherDot = () => (
  <span className="inline-block mx-[1px] align-middle">
    <span className="block w-1.5 h-1.5 rounded-full bg-neutral-400/40 dark:bg-neutral-600/50 animate-pulse" />
  </span>
);

const CipherDash = () => (
  <span className="inline-block mx-[1px] align-middle">
    <span className="block w-3 h-1 rounded-full bg-neutral-400/40 dark:bg-neutral-600/50" />
  </span>
);

const CipherSpace = () => <span className="inline-block w-2" />;

// --- The Decoder Component ---
const PremiumDecoder = ({ text, className }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 }); // Starts when 30% visible
  const [revealIndex, setRevealIndex] = useState(0);

  // Pre-calculate the "shape map" so the dots/dashes stay consistent until revealed
  const shapeMap = useMemo(() => {
    return text.split("").map((char) => {
      if (char === " ") return "space";
      // Randomly decide if a character should be a Dot or a Dash when hidden
      return Math.random() > 0.5 ? "dot" : "dash";
    });
  }, [text]);

  useEffect(() => {
    if (isInView) {
      // Speed of the reveal (lower = faster)
      const interval = setInterval(() => {
        setRevealIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          // Reveal 2 characters per tick for a faster, more fluid flow
          return prev + 2; 
        });
      }, 15); // 15ms per tick = very smooth high refresh rate feel

      return () => clearInterval(interval);
    }
  }, [isInView, text.length]);

  return (
    <div ref={containerRef} className={cn("leading-relaxed break-words", className)}>
      {text.split("").map((char, i) => {
        const isRevealed = i < revealIndex;
        const shape = shapeMap[i];

        // 1. If it's a space, render a space
        if (shape === "space") return <CipherSpace key={i} />;

        // 2. If it is revealed, show the text character
        if (isRevealed) {
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-block text-neutral-900 dark:text-neutral-100"
            >
              {char}
            </motion.span>
          );
        }

        // 3. If hidden, show Custom UI Shape (Dot or Dash)
        return shape === "dot" ? <CipherDot key={i} /> : <CipherDash key={i} />;
      })}
    </div>
  );
};

// --- Main Section Component ---

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax for the decorative elements
  const yMove = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // The content text - Continuous flow
  const contentText = "We exist at the intersection of logic and emotion. Our design philosophy is built on the belief that software should not just be used, but felt. By stripping away the unnecessary, we reveal the essential, crafting digital ecosystems that are intuitive, powerful, and undeniably human. Every dot, every dash, and every pixel is a deliberate choice made to elevate your brand above the noise.";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden bg-white dark:bg-black transition-colors duration-700"
    >
      {/* --- Premium Background Effects --- */}
      
      {/* 1. Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', 
          backgroundSize: '6rem 6rem' 
        }} 
      />
      
      {/* 2. Ambient Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- Main Content --- */}
      <motion.div 
        style={{ opacity: opacityFade }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        
        {/* BIG HEADING */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: 120, rotate: 3 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Ultra-smooth ease
            className="text-7xl md:text-[9rem] font-bold tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-600"
          >
            About
          </motion.h2>
        </div>

        {/* DECODING TEXT BLOCK */}
        <div className="w-full max-w-3xl text-xl md:text-2xl font-medium md:leading-loose leading-relaxed">
          <PremiumDecoder text={contentText} />
        </div>

        {/* DECORATIVE PARALLAX LINE */}
        <motion.div 
            style={{ y: yMove }}
            className="mt-24 flex flex-col items-center gap-4 opacity-30 dark:opacity-50"
        >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-neutral-400 to-transparent dark:via-neutral-500" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>

      </motion.div>
    </section>
  );
}