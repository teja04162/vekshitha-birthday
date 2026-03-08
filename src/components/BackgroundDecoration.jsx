import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function BackgroundDecoration() {
    const { scrollY } = useScroll();

    // Create parallax offsets based on scroll position
    const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -800]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -300]);

    const [particles] = useState(() => {
        return Array.from({ length: 35 }).map((_, i) => {
            const types = ['circle', 'heart', 'sparkle'];
            return {
                id: i,
                type: types[Math.floor(Math.random() * types.length)],
                x: Math.random() * 100, // percentage
                y: Math.random() * 100, // percentage
                size: Math.random() * 12 + 6, // 6 to 18px
                duration: Math.random() * 15 + 12, // 12 to 27s
                delay: Math.random() * 5,
                rotation: Math.random() * 360,
                xOffset: Math.random() * 40 - 20,
            }
        });
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute mix-blend-overlay flex items-center justify-center text-white"
                    style={{
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -80, -160, -240],
                        x: [0, p.xOffset, -p.xOffset, 0],
                        opacity: [0, 0.6, 0.3, 0],
                        scale: [0, 1.2, 1, 0],
                        rotate: [p.rotation, p.rotation + 180, p.rotation + 360]
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {p.type === 'circle' && (
                        <div
                            className="rounded-full bg-white/80 blur-[1px]"
                            style={{ width: p.size, height: p.size }}
                        />
                    )}
                    {p.type === 'heart' && <Heart size={p.size * 1.5} fill="currentColor" strokeWidth={0} />}
                    {p.type === 'sparkle' && <Sparkles size={p.size * 1.5} strokeWidth={1} />}
                </motion.div>
            ))}

            {/* Decorative parallax gradient glowing orbs */}
            <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-400/30 blur-[140px] mix-blend-overlay" />
            <motion.div style={{ y: y2 }} className="absolute top-[35%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-purple-500/20 blur-[160px] mix-blend-overlay animate-pulse-slow" />
            <motion.div style={{ y: y3 }} className="absolute bottom-[-20%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-yellow-300/20 blur-[120px] mix-blend-overlay" />
            <motion.div style={{ y: y1 }} className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-pink-400/20 blur-[120px] mix-blend-overlay animate-pulse-slow" />
        </div>
    );
}
