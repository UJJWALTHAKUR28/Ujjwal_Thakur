"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Globe, 
  Layers, 
  Cpu, 
  ArrowUpRight,
  Code2 // Fallback icon
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CTASection from "../components/Cta";
import ContactSection from "../components/ContactSection";

// --- Utility for Tailwind Classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Icon Mapping (Tech Name -> SimpleIcons Slug) ---
// We use simpleicons.org CDN for lightweight, real brand logos
const techSlugMap = {
  "Next.js": "nextdotjs",
  "Next.js 14": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express": "express",
  "Socket.IO": "socketdotio",
  "MongoDB": "mongodb",
  "Google Maps API": "googlemaps",
  "JWT": "jsonwebtokens",
  "Python": "python",
  "FastAPI": "fastapi",
  "PyTorch": "pytorch",
  "WebRTC": "webrtc",
  "React": "react",
  "TypeScript": "typescript",
  "TailwindCSS": "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  "Vite": "vite",
  "MySQL": "mysql",
  "TensorFlow": "tensorflow",
  "Keras": "keras",
  "PostgreSQL": "postgresql",
  "AWS": "amazonaws",
  "Prisma": "prisma",
  "Google Gemini 1.5": "googlegemini",
  "Gemini AI": "googlegemini",
  "Flask": "flask",
  "Pandas": "pandas",
  "NumPy": "numpy",
  "Bootstrap": "bootstrap",
  "Scikit-learn": "scikitlearn",
  "Framer Motion": "framer",
  "LangChain": "langchain",
  "Docker": "docker",
  "Kubernetes": "kubernetes",
  "Redis": "redis",
  "GraphQL": "graphql",
};

// --- Mock Data ---
const projects = [
  {
    id: 1,
    title: "SwiftMedic",
    image: "/swiftmedic.png",
    githubLink: "https://github.com/UJJWALTHAKUR28/SwiftMedic",
    liveLink: null,
    status: "operational",
    techStack: ["Next.js", "Node.js", "Express", "Socket.IO", "MongoDB", "Google Maps API", "JWT"],
    description: [
      "Real-time ambulance dispatch system achieving sub-2s latency.",
      "Geo-indexed MongoDB implementation for sub-100ms coordination.",
      "Secure critical data transmission using JWT authentication."
    ],
  },
  {
    id: 2,
    title: "Cognivoice",
    image: "/cognivoicde.jpeg",
    githubLink: "https://github.com/UJJWALTHAKUR28/COGNIVOICE",
    liveLink: null,
    status: "operational",
    techStack: ["Next.js", "Python", "FastAPI", "PyTorch", "WebRTC", "MongoDB"],
    description: [
      "Live speech emotion detection with <200ms latency for streams.",
      "95% accuracy using 4-layer CNN on Mel spectrograms.",
      "Real-time audio processing pipeline via WebRTC and Librosa."
    ],
  },
  {
    id: 3,
    title: "TalentFlow",
    image: "/talentflow.png",
    githubLink: "https://github.com/UJJWALTHAKUR28/TalentFlow",
    liveLink: "https://talent-flow-dun.vercel.app/",
    status: "operational",
    techStack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    description: [
      "Drag-and-drop recruitment dashboard for workflow automation.",
      "Adaptive assessment module with 50+ question types and logic.",
      "Robust offline capabilities using IndexedDB local storage."
    ],
  },
  
  {
    id: 5,
    title: "DeployIQ",
    image: "/deploy.png",
    githubLink: "https://github.com/UJJWALTHAKUR28/DeployIQ",
    liveLink: null,
    status: "operational",
    techStack: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "AWS"],
    description: [
      "One-click deployment for open-source LLMs like Llama 3.",
      "Automated hosting and secure API key generation/management.",
      "Centralized dashboard for monitoring model endpoints."
    ],
  },

  {
    id: 6,
    title: "CodeX",
    image: "/codex.png",
    githubLink: "https://github.com/UJJWALTHAKUR28/codex",
    liveLink: null,
    status: "operational",
    techStack: ["Next.js 14", "Tailwind CSS", "Framer Motion", "FastAPI", "LangChain", "Gemini AI"],
    description: [
      "Enterprise static analysis identifying deep security risks.",
      "Agentic workflow for context-aware code review and fixes.",
      "Automated GitHub integration for PR generation and scanning."
    ],
  },
  {
    id: 4,
    title: "HealthPredictor",
    image: "/healthrisk.png",
    githubLink: "https://github.com/UJJWALTHAKUR28/HEALTHRISKPREDICTOR",
    liveLink: "https://healthriskpredictor.onrender.com/",
    status: "operational",
    techStack: ["Flask", "Python", "Scikit-learn", "Pandas", "NumPy", "Bootstrap"],
    description: [
      "AI-driven risk assessment based on vitals and lifestyle data.",
      "Personalized recommendations for preventive healthcare.",
      "Accessible platform bridging medical data with actionable insights."
    ],
  }
];

// --- Sub-Components ---

const TechIcon = ({ name }: { name: string }) => {
  const slug = techSlugMap[name as keyof typeof techSlugMap];
  
  // List of icons that are black/dark by default and need inversion in dark mode
  const invertInDarkMode = ["nextdotjs", "flask", "express", "socketdotio", "jsonwebtokens"];
  
  return (
    <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 px-3 py-1.5 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-orange-500/50 transition-colors cursor-default select-none">
      {slug ? (
        <img 
          src={`https://cdn.simpleicons.org/${slug}`} 
          alt={`${name} icon`}
          width={14} 
          height={14}
          className={cn(
            "w-3.5 h-3.5",
            invertInDarkMode.includes(slug) && "dark:invert"
          )}
        />
      ) : (
        <Code2 size={14} className="text-orange-600 dark:text-orange-500" />
      )}
      <span>{name}</span>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const isOperational = project.status === "operational";

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col w-full max-w-4xl mx-auto bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-orange-900/10 transition-all duration-500 mb-16"
    >
      {/* 1. Image Covering Top */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
        <img
          src={project.image}
          alt={project.title}
          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6 md:p-10">
        
        {/* 2. Project Name & Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-orange-600 transition-colors">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white transition-all font-medium text-sm"
            >
              <Github size={18} />
              <span>Code</span>
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white transition-all font-medium text-sm shadow-lg shadow-orange-600/20"
              >
                <Globe size={18} />
                <span>Live Demo</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        {/* 3. Tech Stack Section */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">
            <Layers size={14} />
            <span>Technology Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <TechIcon key={i} name={tech} />
            ))}
          </div>
        </div>

        {/* 4. Description */}
        <div className="flex-grow mb-8">
           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            <Cpu size={14} />
            <span>Key Features</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-1 gap-3">
            {project.description.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Separator & Status */}
        <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">Current Status</span>
            <div className={cn(
                "flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide uppercase",
                isOperational 
                    ? "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400 dark:border-green-500/20" 
                    : "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/20"
            )}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                     isOperational ? "bg-green-500" : "bg-yellow-500"
                  )}></span>
                  <span className={cn(
                    "relative inline-flex rounded-full h-2.5 w-2.5",
                     isOperational ? "bg-green-500" : "bg-yellow-500"
                  )}></span>
                </span>
                {isOperational ? "Operational" : "In Development"}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white relative overflow-x-hidden selection:bg-orange-600 selection:text-white">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-0 transition-opacity duration-300"
           style={{
             backgroundImage: `linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      ></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
        
        {/* CENTERED Header Section */}
        <section className="mb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-neutral-900 dark:text-white">
              SHOWCASE
            </h1>
            {/* Centered orange bar */}
            <div className="h-3 w-40 bg-orange-600 mb-8 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 tracking-tight">All Projects</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A curated collection of my work, side projects, and experiments. 
              From complex full-stack applications to small, efficient utilities.
            </p>
          </motion.div>
        </section>

        {/* Projects List - Vertical Stack */}
        <section className="flex flex-col w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 dark:border-neutral-900 text-center relative z-10 bg-white dark:bg-black">
        <p className="text-neutral-500 dark:text-neutral-600 font-mono text-sm">
          // DESIGNED_WITH_NEXTJS_AND_TAILWIND
        </p>
      </footer>

      <CTASection/>
      <ContactSection/>
    </div>
  );
}