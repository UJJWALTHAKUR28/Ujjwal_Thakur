"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import {
  Home,
  FolderGit2,
  Menu,
  X,
  Sun,
  Moon,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "../libs/utils";

// --- Types ---
type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Scroll Animations ---
  // Width starts at 100% and shrinks to 60% (centered)
  const width = useTransform(scrollY, [0, 100], ["100%", "60%"]);
  // Top spacing adds a floating effect
  const top = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  // Border radius rounds the edges when floating
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);
  
  // Track scroll logic for style switches if needed
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  // --- Styles ---
  
  // Premium Glassmorphism
  const glassClasses = cn(
    "backdrop-blur-xl supports-[backdrop-filter]:bg-white/10",
    "bg-white/10 dark:bg-black/10", // Ultra subtle background
    "border border-white/20 dark:border-white/10", // Crisp border
    "shadow-xl shadow-black/5 dark:shadow-black/20", // Soft depth
    "ring-1 ring-white/10 dark:ring-white/5" // Highlight ring
  );
  
  const solidClasses = cn(
     "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800"
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.nav
        style={{
          width: isMobileMenuOpen ? "100%" : width,
          top: isMobileMenuOpen ? "0px" : top,
          borderRadius: isMobileMenuOpen ? "0px" : borderRadius,
        }}
        className={cn(
          "fixed z-50 left-1/2 -translate-x-1/2 flex items-center justify-between px-6 transition-all duration-300 ease-out",
          // Base Height
          "h-[70px] md:h-[64px]",
          // Apply Glass styles
          glassClasses,
          
          // Mobile overrides: Always full width, top 0
          "max-md:!w-full max-md:!top-0 max-md:!rounded-none max-md:bg-white/95 max-md:dark:bg-neutral-950/95 max-md:backdrop-blur-xl max-md:border-b max-md:border-neutral-200 max-md:dark:border-neutral-800"
        )}
      >
        {/* --- Logo / Branding --- */}
        <Link href="/" className="relative z-50 group flex items-center gap-2">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex flex-col"
          >
            <span className={cn(
              "text-lg font-bold tracking-tight transition-colors duration-300",
              "text-emerald-800 dark:text-white"
            )}>
              Ujjwal Thakur
            </span>
          </motion.div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <DesktopNavItem key={item.name} item={item} />
          ))}

          {/* Divider */}
          <div className="mx-2 h-5 w-[1px] bg-emerald-200/50 dark:bg-white/10" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
                "relative p-2 rounded-full transition-all duration-300",
                "hover:bg-emerald-100/50 dark:hover:bg-white/10",
                "text-emerald-700 dark:text-neutral-200"
            )}
          >
            {mounted && (
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0, scale: 1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            )}
          </button>
        </div>

        {/* --- Mobile Hamburger --- */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-emerald-700 dark:text-white">
             {mounted && theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-emerald-800 dark:text-white focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  {/* Distinct 3-line Menu Icon */}
                  <Menu size={24} /> 
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="p-4 rounded-full bg-emerald-50 dark:bg-white/5 group-active:scale-95 transition-transform">
                      <item.icon size={32} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-3xl font-bold text-emerald-900 dark:text-neutral-100 tracking-tight">
                     {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Sub-component: Desktop Nav Item ---
function DesktopNavItem({ item }: { item: NavItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.href}
      className="relative px-4 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Background (Pill) */}
      {isHovered && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-emerald-100/50 dark:bg-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}

      <div className="relative z-10 flex items-center gap-2">
        {/* Icon */}
        <motion.div
          animate={{ rotate: isHovered ? 15 : 0, scale: isHovered ? 1.1 : 1 }}
          className="text-emerald-600 dark:text-emerald-400"
        >
          <item.icon size={16} strokeWidth={2.5} />
        </motion.div>

        {/* Text */}
        <span className={cn(
            "text-base font-medium transition-colors",
            "text-emerald-900 dark:text-neutral-100"
        )}>
          {item.name}
        </span>
      </div>
    </Link>
  );
}