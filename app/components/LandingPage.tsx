"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const LandingPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <section
      className={`
        relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-700 ease-in-out
        bg-[#f4f4f4] text-slate-900 selection:bg-lime-300 selection:text-black
        dark:bg-[#050a05] dark:text-white dark:selection:bg-lime-500 dark:selection:text-black
      `}
    >

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 1. Paint Splash / Omnitrix Energy (Left Down Side) */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] pointer-events-none z-0"
        animate={{
          filter: isDark ? "blur(80px)" : "blur(90px)",
          opacity: isDark ? 0.5 : 0.8
        }}
        transition={{ duration: 0 }}
      >
        <div
          className={`
                w-full h-full rounded-full transition-colors duration-1000
                bg-gradient-to-tr from-green-500 via-lime-400 to-transparent mix-blend-multiply
                dark:bg-gradient-to-tr dark:from-green-900 dark:via-lime-600 dark:to-transparent dark:mix-blend-screen
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
          src="/newimage.png"
          alt="Ben 10 Style Character"
          className={`
            w-full h-full object-contain object-bottom transition-all duration-700
            drop-shadow-2xl
            dark:brightness-100 dark:contrast-110 
            dark:drop-shadow-[0_0_40px_rgba(50,255,50,0.3)]
          `}
        />
      </motion.div>

      {/* Noise Texture Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-[5] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-700 opacity-[0.03] dark:opacity-[0.05]`}></div>

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-20 max-w-6xl px-6 text-center flex flex-col items-center">

        {/* Name */}
        <motion.div className="overflow-hidden mb-2">
          <motion.h1
            layout
            className={`
                  text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] transition-colors duration-700
                  text-slate-900 dark:text-white
                `}
          >
            Ujjwal{" "}
            <span className={`transition-colors duration-700 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600 dark:from-lime-400 dark:to-green-500`}>
              Thakur
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col gap-4 items-center max-w-xl"
        >
          <p className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-700 text-slate-600 dark:text-slate-300`}>
            Designing interfaces that feel <span className={`font-bold transition-colors duration-700 text-green-600 dark:text-lime-400`}>heroic</span> in a digital world.
          </p>
          <p className={`text-lg md:text-xl transition-colors duration-700 text-slate-500 dark:text-slate-400`}>
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
          <Link
            href="/projects"
            className={`
                  group relative inline-flex items-center justify-center px-10 py-4 font-bold text-lg border-2 overflow-hidden transition-all duration-300
                  border-slate-900 text-slate-900 hover:text-white
                  dark:border-lime-500 dark:text-lime-400 dark:hover:text-black dark:hover:border-lime-400 dark:hover:shadow-[0_0_25px_rgba(132,204,22,0.5)]
                `}
          >
            {/* Button Hover Fill Effect */}
            <div className={`absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1] bg-slate-900 dark:bg-lime-500`}></div>

            <span className="flex items-center gap-3">
              VIEW MY WORK
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

      </div>

    </section>
  );
};

export default LandingPage;