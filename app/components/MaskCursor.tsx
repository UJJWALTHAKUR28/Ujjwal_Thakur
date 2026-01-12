"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MaskCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for fluid movement
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            // Center the blob on the cursor (assuming 400px width)
            mouseX.set(clientX - 200);
            mouseY.set(clientY - 200);
        };

        window.addEventListener("mousemove", manageMouseMove);
        return () => window.removeEventListener("mousemove", manageMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x, y }}
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-white pointer-events-none z-40 hidden md:block"
            // This is the magic line that inverts colors
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
        </motion.div>
    );
}