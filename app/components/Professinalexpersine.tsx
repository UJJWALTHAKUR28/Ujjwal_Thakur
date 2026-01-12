"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Server,
  Terminal,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import { cn } from "../libs/utils";

// --- TYPES ---
type TechItem = {
  name: string;
  icon: React.ElementType;
};

type Experience = {
  id: number;
  role: string;
  company: string;
  status: string | null;
  date: string;
  location: string;
  logo: string;
  tech: TechItem[];
  description: string[];
  // We use a single string containing both Light and Dark classes
  backgroundClass: string;
  textClass: string;
  cardClass: string; // For the glassmorphism card
};

// --- DATA ---
const experiences: Experience[] = [
  {
    id: 1,
    role: "Software Development Engineer Intern",
    company: "Mobizo",
    status: "CURRENT",
    date: "Dec 2025 - Present",
    location: "Remote",
    logo: "M",
    backgroundClass: "bg-gradient-to-br from-violet-50 to-fuchsia-100 dark:from-[#2e0b36] dark:to-[#1a0b2e]",
    textClass: "text-violet-950 dark:text-white",
    cardClass: "bg-white/60 dark:bg-white/5 border-violet-200 dark:border-white/10",
    tech: [
      { name: "Next.js", icon: Layout },
      { name: "Tailwind", icon: Code2 },
      { name: "TypeScript", icon: Terminal },
      { name: "MongoDB", icon: Database },
      { name: "Node.js", icon: Server },
      { name: "Framer Motion", icon: Layout },
    ],
    description: [
      "Spearheaded the complete redesign and architectural restructuring of the company’s web platform, utilizing Framer Motion to deliver a responsive, high-performance interface with seamless animations.",

      "Engineered and maintained robust backend infrastructure, developing scalable RESTful APIs to ensure secure, efficient data flow between the server and client-side application.",

      "Modernized the full-stack codebase by optimizing component structures and implementing UI/UX best practices, significantly elevating the overall user experience and system maintainability.",
    ],
  },

  {
    id: 2,
    role: "Software Development Intern",
    company: "Infosys Springboard",
    status: null,
    date: "Apr 2024 – Jun 2024",
    location: "Remote",
    logo: "I",
    // Light: Sky Blue Gradient | Dark: Ocean Blue/Green
    backgroundClass: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364]",
    textClass: "text-blue-950 dark:text-white",
    cardClass: "bg-white/60 dark:bg-white/5 border-blue-200 dark:border-white/10",
    tech: [
      { name: "React", icon: Code2 },
      { name: "Python", icon: Code2 },
      { name: "Postgres", icon: Database },
    ],
    description: [
      "Spearheaded and deployed a multi-service platform using Next.js (UI), Strapi CMS, and a Python FastAPI wrapper, integrating with 5+ external platforms. This implementation automated content workflows and reduced manual deployment steps by 40%",
      "Built a dedicated, automated media generation API service that handled visual asset creation, streamlining 90% of internal media creation workflows",
    ],
  },

];

// --- SUB-COMPONENTS ---

const TechBadge = ({ name, icon: Icon, textClass }: { name: string; icon: React.ElementType, textClass: string }) => (
  <div className={cn(
    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-sm transition-colors duration-300",
    // Adaptive colors
    "bg-white/50 border border-black/5 text-black", // Light mode default
    "dark:bg-white/10 dark:border-white/20 dark:text-white" // Dark mode override
  )}>
    <Icon size={14} />
    {name}
  </div>
);

const CurtainSection = ({
  data,
  index,
}: {
  data: Experience;
  index: number;
}) => {
  return (
    <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center overflow-hidden transition-colors duration-700">

      {/* Dynamic Background Gradient */}
      <div className={cn("absolute inset-0 z-0 transition-colors duration-700", data.backgroundClass)} />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-5 dark:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-overlay pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

        {/* Left Side: Typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Header Data */}
          <div className={cn("flex items-center gap-4 font-mono text-sm tracking-widest uppercase opacity-60", data.textClass)}>
            <span>0{experiences.length - index}</span>
            <span className={cn("w-12 h-[1px]", data.textClass === "text-white" ? "bg-white/50" : "bg-black/20")}></span>
            <span className="flex items-center gap-2"><Calendar size={14} /> {data.date}</span>
            <div className={cn("flex items-center gap-2 text-sm font-mono opacity-50", data.textClass)}>
              <MapPin size={16} /> {data.location}
            </div>
          </div>

          {/* --- FIXED SECTION START --- */}
          {/* Updated Size: text-2xl -> md:text-3xl -> lg:text-4xl 
             This ensures "Software Development Engineer Intern" fits on one line.
          */}
          <h2 className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight transition-colors duration-300 md:whitespace-nowrap",
            data.textClass
          )}>
            {data.role}
          </h2>
          {/* --- FIXED SECTION END --- */}

          <h3 className={cn("text-lg md:text-xl font-light opacity-80 flex items-center gap-3", data.textClass)}>
            {data.company}
            {data.status === "CURRENT" && (
              <span className="text-xs bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/50 px-3 py-1 rounded-full font-bold tracking-wide">
                NOW
              </span>
            )}
          </h3>

          {/* Description */}
          <div className="space-y-4 mt-2">
            {data.description.map((desc, i) => (
              <p key={i} className={cn("text-base md:text-lg leading-relaxed font-light max-w-3xl opacity-80", data.textClass)}>
                {desc}
              </p>
            ))}
          </div>


        </motion.div>

        {/* Right Side: Visuals / Tech Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="hidden md:flex flex-col justify-center items-start md:items-end relative"
        >
          {/* Big Decorative Number or Logo */}
          <div className={cn(
            "absolute -top-20 -right-20 text-[20rem] font-bold select-none pointer-events-none transition-colors duration-500",
            "text-black/5 dark:text-white/5"
          )}>
            {data.logo}
          </div>

          {/* Glassmorphism Card for Tech */}
          <div className={cn(
            "backdrop-blur-xl border p-8 rounded-3xl shadow-2xl max-w-md transition-all duration-300",
            data.cardClass
          )}>
            <h4 className={cn("uppercase tracking-widest text-sm font-bold mb-6 opacity-60", data.textClass)}>Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {data.tech.map((t) => (
                <TechBadge key={t.name} name={t.name} icon={t.icon} textClass={data.textClass} />
              ))}
            </div>

            <div className={cn(
              "mt-8 pt-6 border-t w-full flex justify-between items-center opacity-80",
              "border-black/10 dark:border-white/10"
            )}>
              <span className={cn("font-medium text-sm uppercase tracking-wider", data.textClass)}>
                {data.role.toLowerCase().includes("intern") ? "Internship" : "Full-time"}
              </span>
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold",
                "bg-black/5 dark:bg-white/10",
                data.textClass
              )}>
                <Briefcase size={14} />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function ProfessionalExperience() {
  return (
    <div className="relative w-full bg-white dark:bg-black transition-colors duration-500">

      {/* Introductory Scroll Section */}
      <div className="h-[50vh] flex flex-col items-center justify-center bg-white dark:bg-black z-20 relative transition-colors duration-500">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-neutral-900 dark:text-white text-4xl md:text-6xl font-bold tracking-tighter text-center"
        >
          Professional Experience
        </motion.h2>
        <p className="text-neutral-500 mt-4">Scroll down to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8 text-neutral-400 dark:text-neutral-600"
        >
          ↓
        </motion.div>
      </div>

      {/* The Stacked Curtain Sections */}
      <div className="relative w-full">
        {experiences.map((experience, i) => (
          <CurtainSection
            key={experience.id}
            index={i}
            data={experience}
          />
        ))}
      </div>


    </div>
  );
}