"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

const LandingPage = () => {
  const { theme } = useTheme();
  // Handle hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to false (light) if not mounted, otherwise check theme
  const isDark = mounted && theme === "dark";

  return (
    <section
      className={`
        relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-700 ease-in-out
        ${isDark ? "bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white" : "bg-[#f4f4f4] text-slate-900 selection:bg-orange-300 selection:text-black"}
      `}
    >

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 1. Paint Splash (Left Down Side) - Changes 'Glow' based on theme */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] pointer-events-none z-0"
        animate={{
          filter: isDark ? "blur(90px)" : "blur(60px)",
          opacity: isDark ? 0.6 : 0.8
        }}
        transition={{ duration: 1 }}
      >
        <div
          className={`
                w-full h-full rounded-full transition-colors duration-1000
                ${isDark
              ? "bg-gradient-to-tr from-red-900 via-red-600 to-transparent" /* Dark Neon Glow */
              : "bg-gradient-to-tr from-red-500 via-orange-400 to-transparent mix-blend-multiply" /* Light Paint Splash */
            }
            `}
        />
      </motion.div>

      {/* 2. Character Image (Right Down Side) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-[40vw] max-w-100 h-[80vh] z-10 flex items-end justify-end pointer-events-none"
      >
        <img
          src="/image.png"
          alt="Character"
          className={`
            w-full h-full object-contain object-bottom transition-all duration-700
            ${isDark ? "brightness-90 contrast-125 drop-shadow-[0_0_30px_rgba(255,0,0,0.2)]" : "drop-shadow-2xl"}
          `}
        />
      </motion.div>

      {/* Noise Texture Overlay (Subtle grain) */}
      <div className={`absolute inset-0 pointer-events-none z-[5] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-700 ${isDark ? "opacity-[0.05]" : "opacity-[0.03]"}`}></div>

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-20 max-w-5xl px-6 text-center flex flex-col items-center">

        {/* Name */}
        <motion.div className="overflow-hidden mb-2">
          <motion.h1
            layout
            className={`
                    text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] transition-colors duration-700
                    ${isDark ? "text-white" : "text-slate-900"}
                `}
          >
            Ujjwal <br />
            <span className={`transition-colors duration-700 ${isDark ? "text-red-500" : "text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500"}`}>
              Thakur
            </span>
          </motion.h1>
        </motion.div>

        {/* 2-3 Lines of Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col gap-4 items-center max-w-xl"
        >
          <p className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-700 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Designing interfaces that feel <span className={`${isDark ? "text-red-400" : "text-orange-600"} font-bold transition-colors duration-700`}>human</span> in a digital world.
          </p>
          <p className={`text-lg md:text-xl transition-colors duration-700 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            Specializing in visual storytelling, design systems, and creating memorable web experiences for forward-thinking brands.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <button
            className={`
                    group relative px-10 py-4 font-bold text-lg border-2 overflow-hidden transition-all duration-300
                    ${isDark
                ? "border-red-600 text-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                : "border-slate-900 text-slate-900 hover:text-white"
              }
                `}
          >
            {/* Button Hover Fill Effect */}
            <div className={`absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1] ${isDark ? "bg-red-600" : "bg-slate-900"}`}></div>

            <span className="flex items-center gap-3">
              VIEW MY WORK
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

      </div>

    </section>
  );
};

export default LandingPage;