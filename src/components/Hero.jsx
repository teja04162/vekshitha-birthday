import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data';

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

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 pt-20">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="glass-card px-8 py-10 md:py-14 max-w-4xl w-full"
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 mb-4 drop-shadow-sm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                >
                    {siteData.hero.title} <br className="md:hidden" />
                    <span className="font-accent text-6xl md:text-8xl text-rose-600 block mt-2">
                        {siteData.name}
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl font-body text-gray-700 mb-8 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {siteData.hero.subtitle}
                </motion.p>

                {/* Magical Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
                >
                    {timeBlocks.map((block, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 glass flex items-center justify-center rounded-2xl shadow-lg border border-white/60 bg-white/50 backdrop-blur-md text-3xl md:text-4xl font-heading font-bold text-rose-600 mb-2">
                                {String(block.value).padStart(2, '0')}
                            </div>
                            <span className="text-sm md:text-base font-body text-gray-600 uppercase tracking-widest font-semibold">
                                {block.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.button
                    onClick={onExplore}
                    className="px-8 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-body text-lg rounded-full shadow-[0_0_20px_rgba(251,113,133,0.5)] hover:shadow-[0_0_30px_rgba(251,113,133,0.8)] hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {siteData.hero.buttonText}
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </motion.button>
            </motion.div>
        </section>
    );
}
