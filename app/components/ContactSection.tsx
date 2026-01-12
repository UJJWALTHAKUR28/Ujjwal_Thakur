"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/UJJWALTHAKUR28",
      icon: <FaGithub className="w-6 h-6" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ujwal-thakur-97b5a7349/",
      icon: <FaLinkedin className="w-6 h-6" />,
    },
    {
      name: "Mail",
      url: "ujjwalthakur.008reena@gmail.com",
      icon: <FaEnvelope className="w-6 h-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section className="relative w-full py-24 overflow-hidden transition-colors duration-500 bg-gray-50 text-neutral-900 dark:bg-black dark:text-white">
      
      {/* --- Premium Background Effects --- */}
      
      {/* 1. Grid Pattern (Dark Grey in Dark Mode / Light Grey in Light Mode) */}
      <div className="absolute inset-0 
        bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] 
        bg-[size:4rem_4rem] 
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] 
        opacity-40 dark:opacity-20 pointer-events-none transition-all duration-500" 
      />

      {/* 2. Top Spotlight (Subtle Warmth in Light Mode / White Mist in Dark Mode) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] 
        bg-neutral-200 dark:bg-white 
        opacity-30 dark:opacity-[0.03] 
        blur-[120px] rounded-full pointer-events-none transition-colors duration-500" 
      />

      <div className="container relative px-6 mx-auto md:px-12 lg:px-20 z-10">
        <div className="flex flex-col-reverse items-center lg:items-center lg:flex-row lg:justify-between gap-12">
          
          {/* LEFT SIDE: Content */}
          <motion.div 
            className="flex flex-col items-center w-full text-center lg:items-start lg:text-left lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-br from-neutral-600 via-neutral-500 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-600">Build.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="max-w-lg mb-10 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              Transforming ideas into digital reality. Available for projects and partnerships.
            </motion.p>

            {/* Social Buttons */}
            <div className="flex flex-wrap justify-center gap-5 mb-10 lg:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Mail" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center w-14 h-14 transition-all duration-300 rounded-xl
                    
                    /* LIGHT MODE: White bg, Gray border, Dark Text -> Hover: Black bg, White Text */
                    bg-white border border-neutral-200 text-neutral-800 shadow-sm
                    hover:bg-neutral-900 hover:border-neutral-900 hover:text-white

                    /* DARK MODE: Black bg, Gray border, White Text -> Hover: White bg, Black Text */
                    dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
                    dark:hover:bg-white dark:hover:border-white dark:hover:text-black
                  "
                >
                  <span className="relative z-10">{link.icon}</span>
                </motion.a>
              ))}
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-600 uppercase tracking-[0.2em]">
              <div className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700" />
              © 2026 All Rights Reserved
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            viewport={{ once:false }}
            className="relative w-full max-w-sm lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
                {/* Glow Effect (Darker in light mode to be visible) */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />
                
                <img
                  src="/untitled.png" 
                  alt="Profile"
                  className="relative z-0 w-auto h-auto max-h-[350px] lg:max-h-[450px] object-contain rounded-2xl 
                  
                  /* Borders & Shadow */
                  border border-neutral-200 dark:border-neutral-800 
                  bg-white dark:bg-neutral-900/50 
                  shadow-2xl 
                  
                  /* Grayscale Logic */
                  grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;