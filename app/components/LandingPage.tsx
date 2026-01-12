"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const LandingPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  // --- SOCIAL SATELLITE CONFIG ---
  const socialActions = [
    { icon: Github, href: "https://github.com/UJJWALTHAKUR28", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ujjwal-thakur-97b5a7349", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ujjwalthakur.008reena@gmail.com", label: "Email" },
  ];

  // --- INTERCONNECTED CIRCUIT PATHS ---
  // A 'tree' structure: Main trunk splits into branches
  const circuitPaths = [
    // 1. MAIN TRUNK (Top-Left -> Down)
    {
      d: "M0,60 L40,60 L60,80 L60,250 L30,280 L30,450",
      delay: 0,
      duration: 3.5
    },
    // 2. BRANCH A (Splits right from Main Trunk)
    {
      d: "M60,120 L120,120 L140,140 L140,320 L110,350",
      delay: 0.5,
      duration: 4
    },
    // 3. BRANCH B (Small cute detail off Branch A)
    {
      d: "M140,200 L180,200 L180,240",
      delay: 1.2,
      duration: 2.5
    },
    // 4. BRANCH C (Splits from Main Trunk lower down)
    {
      d: "M60,220 L90,220 L90,180", // Small loop back up
      delay: 2.0,
      duration: 3
    },
    // 5. BRANCH D (Bottom extension)
    {
      d: "M30,400 L70,440 L70,550",
      delay: 1.5,
      duration: 4
    }
  ];

  // Nodes (Solder points)
  const circuitNodes = [
    { cx: 60, cy: 80 },
    { cx: 60, cy: 250 },
    { cx: 140, cy: 140 },
    { cx: 180, cy: 240 },
    { cx: 110, cy: 350 },
    { cx: 30, cy: 450 },
    { cx: 70, cy: 550 },
  ];

  return (
    <section
      className={`
        relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-700 ease-in-out
        bg-[#f4f4f4] text-slate-900 selection:bg-lime-300 selection:text-black
        dark:bg-[#050a05] dark:text-white dark:selection:bg-lime-500 dark:selection:text-black
      `}
    >

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 1. INTERCONNECTED CIRCUIT NETWORK */}
      <div className="absolute top-0 left-0 w-[300px] h-full z-10 pointer-events-none opacity-50 dark:opacity-90">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* A. The Static Tracks (The "PCB Board" look) */}
          {circuitPaths.map((path, i) => (
            <path
              key={`track-${i}`}
              d={path.d}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-slate-300 dark:text-lime-900/30"
            />
          ))}

          {/* B. The Nodes (Static Dots) */}
          {circuitNodes.map((node, i) => (
            <circle
              key={`node-bg-${i}`}
              cx={node.cx} cy={node.cy} r="3"
              className="fill-slate-300 dark:fill-lime-900/50"
            />
          ))}

          {/* C. The Animated Electricity Flow */}
          {circuitPaths.map((path, i) => (
            <motion.path
              key={`pulse-${i}`}
              d={path.d}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1], // Draw line
                opacity: [0, 1, 0],    // Fade out at end
                strokeDashoffset: [0, 0, -20] // Slight movement
              }}
              transition={{
                duration: path.duration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.2,
                delay: path.delay
              }}
              className={`
                stroke-slate-800 dark:stroke-lime-400
                filter drop-shadow-[0_0_3px_rgba(132,204,22,0.5)]
              `}
            />
          ))}

          {/* D. Glowing Active Nodes (Flash when electricity hits) */}
          {circuitNodes.map((node, i) => (
            <motion.circle
              key={`node-active-${i}`}
              cx={node.cx} cy={node.cy} r="3.5"
              className="fill-slate-800 dark:fill-lime-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4, // Randomize slightly based on index
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>

      {/* 2. Character Image */}
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
            drop-shadow-2xl pointer-events-none
            dark:brightness-100 dark:contrast-110 
            dark:drop-shadow-[0_0_40px_rgba(50,255,50,0.3)]
          `}
        />
      </motion.div>

      {/* Noise Texture */}
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
            <div className={`absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1] bg-slate-900 dark:bg-lime-500`}></div>
            <span className="flex items-center gap-3">
              VIEW MY WORK
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* --- PERMANENT ORBIT HUB --- */}
      <div className="absolute bottom-16 left-16 md:bottom-20 md:left-24 z-30 w-0 h-0 flex items-center justify-center">

        {/* 1. Orbit Visual Ring */}
        <div className="absolute bottom-0 left-0 w-[240px] h-[240px] border-2 border-dashed rounded-full border-slate-400 dark:border-lime-500/30 opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/2" />

        {/* 2. The Satellites (Icons) */}
        {socialActions.map((social, index) => {
          // Calculate position on the arc
          const totalItems = socialActions.length;
          const step = 90 / (totalItems - 1);
          const angle = index * step;
          const radians = (angle * Math.PI) / 180;
          const radius = 120; // Distance from center

          const x = Math.cos(radians) * radius;
          const y = -Math.sin(radians) * radius;

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{ x, y }} // Position set via style to avoid layout thrashing

              // ANIMATION: Gentle Float + Hover Scale
              animate={{
                y: [y - 4, y + 4, y - 4],
              }}
              whileHover={{
                scale: 1.25,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }
              }}

              className={`
                  absolute flex items-center justify-center w-12 h-12 rounded-full shadow-lg border-2 z-40
                  bg-white border-slate-200 text-slate-700 
                  dark:bg-[#0a0f0a] dark:border-lime-500 dark:text-lime-400 
                  
                  hover:border-green-500 hover:text-green-600 hover:z-50
                  dark:hover:bg-lime-950 dark:hover:border-white dark:hover:text-white dark:hover:shadow-[0_0_20px_rgba(132,204,22,0.8)]
                  transition-colors duration-300
               `}
              title={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          )
        })}

        {/* 3. The Central "Connect" Hub (Text Only, No Icon, Glowing) */}
        <div
          className={`
            absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center z-50 pointer-events-none
          `}
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`
              text-xl font-black tracking-[0.2em] uppercase
              text-slate-900 
              dark:text-lime-400
              
              /* GLOW EFFECTS */
              drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]
              dark:drop-shadow-[0_0_15px_rgba(132,204,22,0.9)]
            `}
          >
            Connect
          </motion.span>
        </div>

      </div>

    </section>
  );
};

export default LandingPage;