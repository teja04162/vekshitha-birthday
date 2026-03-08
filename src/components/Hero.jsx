import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero({ onExplore }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date(siteData.birthdayDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    const wordAnimation = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        })
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 pt-20">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="glass-card relative px-8 py-12 md:py-16 max-w-5xl w-full border-t border-white/80 shadow-[0_20px_60px_-15px_rgba(255,192,203,0.3)]"
            >
                {/* Decorative Elements */}
                <Sparkles className="absolute top-8 left-8 text-rose-300 w-8 h-8 animate-pulse" />
                <Sparkles className="absolute bottom-8 right-8 text-purple-300 w-6 h-6 animate-pulse delay-700" />

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-500 to-rose-400 mb-6 drop-shadow-md leading-tight"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span custom={1} variants={wordAnimation} className="inline-block">{siteData.hero.title}</motion.span> <br className="md:hidden" />
                    <motion.span
                        custom={3}
                        variants={wordAnimation}
                        className="font-accent text-7xl md:text-9xl text-rose-500 block mt-4 drop-shadow-[0_0_15px_rgba(251,113,133,0.2)]"
                    >
                        {siteData.name}
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-3xl font-body text-gray-700 mb-10 italic max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {siteData.hero.subtitle}
                </motion.p>

                {/* Magical Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, staggerChildren: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
                >
                    {timeBlocks.map((block, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center group"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 glass flex items-center justify-center rounded-2xl shadow-xl border border-white/60 bg-white/40 backdrop-blur-xl text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-3 group-hover:bg-white/60 transition-colors">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={block.value}
                                        initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {String(block.value).padStart(2, '0')}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <span className="text-sm md:text-base font-body text-gray-600 uppercase tracking-widest font-bold">
                                {block.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button
                    onClick={onExplore}
                    className="px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-body text-xl rounded-full shadow-[0_10px_30px_-10px_rgba(251,113,133,0.8)] hover:shadow-[0_10px_40px_-10px_rgba(251,113,133,1)] transition-all duration-300 relative overflow-hidden group font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {siteData.hero.buttonText}
                        <ArrowDown className="w-5 h-5 animate-bounce" />
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                </motion.button>
            </motion.div>
        </section>
    );
}
