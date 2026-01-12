"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiOpenjdk, // Using OpenJDK for Java icon
  SiCplusplus,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiStrapi,
  SiFlask,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiJavascript,
  SiC,
} from "react-icons/si";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
// Defining specific brand colors for the hover state
const techStack = [
  { name: "React", icon: SiReact, color: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-black dark:group-hover:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "group-hover:text-[#3178C6]" },
  { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-[#339933]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
  { name: "Python", icon: SiPython, color: "group-hover:text-[#3776AB]" },
  { name: "Java", icon: SiOpenjdk, color: "group-hover:text-[#007396]" },
  { name: "C++", icon: SiCplusplus, color: "group-hover:text-[#00599C]" },
  { name: "FastAPI", icon: SiFastapi, color: "group-hover:text-[#009688]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "group-hover:text-[#4169E1]" },
  { name: "MongoDB", icon: SiMongodb, color: "group-hover:text-[#47A248]" },
  { name: "Git", icon: SiGit, color: "group-hover:text-[#F05032]" },
  { name: "Strapi", icon: SiStrapi, color: "group-hover:text-[#2F2E8B]" },
  { name: "Flask", icon: SiFlask, color: "group-hover:text-black dark:group-hover:text-white" },
  { name: "Express", icon: SiExpress, color: "group-hover:text-gray-500" },
  { name: "HTML5", icon: SiHtml5, color: "group-hover:text-[#E34F26]" },
  { name: "CSS3", icon: SiCss3, color: "group-hover:text-[#1572B6]" },
  { name: "MySQL", icon: SiMysql, color: "group-hover:text-[#4479A1]" },
  { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" },
  { name: "C", icon: SiC, color: "group-hover:text-[#A8B9CC]" },
];

// Split data for two rows
const row1 = techStack.slice(0, techStack.length / 2);
const row2 = techStack.slice(techStack.length / 2);

// --- Sub-Component: The Card ---
const TechCard = ({ item }: { item: (typeof techStack)[0] }) => {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 px-5 py-3 mx-4 rounded-xl cursor-default",
        // Glassmorphism base
        "bg-white/60 dark:bg-slate-900/40 backdrop-blur-md",
        // Borders
        "border border-slate-200 dark:border-slate-800",
        // Hover interactions
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
      )}
    >
      {/* Icon */}
      <div className={cn("text-2xl transition-colors duration-300 text-slate-400", item.color)}>
        <item.icon />
      </div>
      
      {/* Text */}
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
        {item.name}
      </span>
    </div>
  );
};

// --- Main Component ---
const TechStack = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500">
      
      {/* Background Decorative Blobs (Optional for extra UI flair) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 mb-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-6">
            Stack I Use
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I build robust applications using modern technologies that solve real-world problems.
          </p>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="flex flex-col gap-6 relative z-10">
        
        {/* Row 1: Left -> Right */}
        <div className="flex relative overflow-hidden w-full">
           {/* Gradient Masks to fade edges */}
           <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent" />
           <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent" />

          <motion.div
            className="flex min-w-full"
            animate={{ x: [0, -1500] }} // Adjust logic based on item width
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...row1, ...row1, ...row1].map((item, i) => (
               <TechCard key={`r1-${i}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right -> Left */}
        <div className="flex relative overflow-hidden w-full">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent" />
           <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent" />

          <motion.div
            className="flex min-w-full"
            animate={{ x: [-1500, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
             {[...row2, ...row2, ...row2].map((item, i) => (
               <TechCard key={`r2-${i}`} item={item} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;