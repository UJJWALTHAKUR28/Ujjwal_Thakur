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

// --- The Decoder Component ---
const PremiumDecoder = ({ text, className }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [revealIndex, setRevealIndex] = useState(0);

  // Pre-calculate the "shape map"
  const shapeMap = useMemo(() => {
    return text.split("").map((char) => {
      if (char === " ") return "space";
      return Math.random() > 0.5 ? "dot" : "dash";
    });
  }, [text]);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setRevealIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 2; // Speed of reveal
        });
      }, 15);

      return () => clearInterval(interval);
    }
  }, [isInView, text.length]);

  // We split the text by spaces to handle "words" individually
  const words = text.split(" ");

  // We need a mutable counter to track the global index across the nested loops
  // so the animation stays synced with the shapeMap.
  let globalCharIndex = 0;

  return (
    <div
      ref={containerRef}
      // Changed: Use flex-wrap + gap to handle spacing and wrapping perfectly
      className={cn("flex flex-wrap gap-x-2 gap-y-1 leading-relaxed", className)}
    >
      {words.map((word, wIndex) => {
        return (
          // WRAPPER: keeps the word intact (whitespace-nowrap)
          <span key={wIndex} className="inline-flex items-center whitespace-nowrap">
            {word.split("").map((char, cIndex) => {
              const currentGlobalIndex = globalCharIndex;
              globalCharIndex++; // Increment for every character rendered

              const isRevealed = currentGlobalIndex < revealIndex;
              const shape = shapeMap[currentGlobalIndex];

              if (isRevealed) {
                return (
                  <motion.span
                    key={`${wIndex}-${cIndex}`}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-block text-neutral-900 dark:text-neutral-100"
                  >
                    {char}
                  </motion.span>
                );
              }

              return shape === "dot" ? (
                <CipherDot key={`${wIndex}-${cIndex}`} />
              ) : (
                <CipherDash key={`${wIndex}-${cIndex}`} />
              );
            })}

            {/* After rendering the word, we manually increment the global index 
               to account for the space we split out.
            */}
            <span className="hidden">{globalCharIndex++}</span>
          </span>
        );
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

  const yMove = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const contentText = "I am a Software Engineer bridging the gap between creative design and algorithmic logic. Specializing in Next.js, Python, and AI, I build end-to-end digital products that are not only intelligent but visually stunning. I treat every line of code as a design decision, blending robust backend architectures with intuitive UI/UX. My goal is simple: to help forward-thinking companies build the future of the web fast, functional, and flawless. Beyond just shipping features, I focus on creating scalable systems that deliver real value and long-term performance. I am ready to bring this unique blend of technical precision and creative vision to your next ambitious project.";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden bg-white dark:bg-black transition-colors duration-700"
    >
      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
          backgroundSize: '6rem 6rem'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- Main Content --- */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: 120, rotate: 3 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[9rem] font-bold tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-100 dark:to-neutral-600"
          >
            About
          </motion.h2>
        </div>

        {/* DECODING TEXT BLOCK */}
        <div className="w-full max-w-3xl text-xl md:text-2xl font-medium md:leading-loose leading-relaxed">
          <PremiumDecoder text={contentText} />
        </div>

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