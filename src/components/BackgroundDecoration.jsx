import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundDecoration() {
    const { scrollY } = useScroll();

    // Create parallax offsets based on scroll position
    const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -800]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -300]);

    const particles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            y: Math.random() * 100, // percentage
            size: Math.random() * 6 + 2, // 2 to 8px
            duration: Math.random() * 8 + 10, // 10 to 18s
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/70 blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                    }}
                    animate={{
                        y: [0, -50, -100, -150],
                        x: [0, 15, -15, 0],
                        opacity: [0, 1, 0.5, 0],
                        scale: [0, 1.5, 1, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
            {/* Decorative parallax gradient glowing orbs */}
            <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-400/20 blur-[120px] mix-blend-overlay" />
            <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 blur-[150px] mix-blend-overlay animate-pulse-slow" />
            <motion.div style={{ y: y3 }} className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-yellow-300/20 blur-[100px] mix-blend-overlay" />
        </div>
    );
}
