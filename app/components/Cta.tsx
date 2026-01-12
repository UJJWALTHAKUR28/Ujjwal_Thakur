"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  const text = "If you've read this far, you might be interested in what I do.";

  return (
    <section
      ref={ref}
      className="relative w-full py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500
      bg-[#f5f5f4] dark:bg-black" // Stone-100 for Light, Pure Black for Dark
    >
      <div className="container mx-auto px-4 text-center z-10">
        
        {/* --- Text Reveal Animation --- */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12 max-w-4xl mx-auto leading-tight text-stone-900 dark:text-stone-100">
          <span className="sr-only">{text}</span>
          <motion.span
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.05 }}
            aria-hidden
          >
            {text.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-2 md:mr-3 pb-2">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "100%" },
                    visible: { 
                      y: 0, 
                      transition: { 
                        ease: [0.33, 1, 0.68, 1],
                        duration: 0.6 
                      } 
                    },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h2>

        {/* --- Static Badge "Let's Build Together" --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        >
          <div
            className={cn(
              "relative inline-flex items-center justify-center",
              "rounded-full px-10 py-4 md:px-12 md:py-5", // Large padding for "smashed" look
              "font-bold text-xl md:text-2xl tracking-wide", // Bold and larger text
              "bg-orange-700 text-white", // Deep Burnt Orange background, White text
              "dark:bg-orange-600", // Slightly brighter orange for dark mode contrast
              "cursor-default select-none shadow-xl" // Static behavior (no pointer)
            )}
          >
            Let&apos;s Build Together
          </div>
        </motion.div>
      </div>

      {/* Optional: Subtle Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-400 to-transparent dark:from-stone-700"></div>
    </section>
  );
}