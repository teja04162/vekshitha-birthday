import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1200); // Wait at 100% to let finishing animations play
                    return 100;
                }
                // Ease out speed towards the end for more anticipation
                const increment = prev > 80 ? 1 : (prev > 40 ? 2 : 3);
                return Math.min(prev + increment, 100);
            });
        }, 50);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#faf5f5]"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Ethereal Animated Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-purple-50 to-pink-100 animate-[gradientShift_8s_ease_infinite]"
                    style={{ backgroundSize: '400% 400%' }}
                />

                {/* Floating Magical Orbs */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-rose-300/40 rounded-full blur-[100px] mix-blend-multiply"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-purple-300/40 rounded-full blur-[120px] mix-blend-multiply"
                />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, type: "spring", damping: 20 }}
                    className="relative z-10 flex flex-col items-center justify-center"
                >
                    {/* Glowing Circular Heart Container */}
                    <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
                        {/* Soft glow behind */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full blur-3xl opacity-40"
                        />

                        {/* SVG Path drawing of a Heart */}
                        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_#fb718580]" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fb7185" />
                                    <stop offset="100%" stopColor="#c084fc" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: progress / 100, opacity: 1 }}
                                transition={{ ease: "easeInOut" }}
                            />
                            {/* Inner fill revealing */}
                            <motion.path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                fill="url(#gradient)"
                                className="opacity-0"
                                animate={{ opacity: progress === 100 ? 1 : progress * 0.005 }}
                                transition={{ ease: "easeOut" }}
                            />
                        </svg>

                        {/* Beating inner heart at 100% */}
                        <motion.div
                            animate={{ scale: progress === 100 ? [1, 1.3, 1] : 1 }}
                            transition={{ repeat: progress === 100 ? Infinity : 0, duration: 0.8 }}
                            className="absolute flex items-center justify-center text-white z-10"
                        >
                            <Heart fill="currentColor" size={48} className={`transition-all duration-1000 ${progress === 100 ? 'opacity-100 drop-shadow-[0_0_20px_#ffffff]' : 'opacity-0 scale-50'}`} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: progress > 30 ? 1 : 0, scale: progress > 30 ? 1 : 0, rotate: 180 }}
                            className="absolute -top-6 -right-6 text-yellow-400"
                        >
                            <Sparkles size={40} className="animate-spin-slow drop-shadow-lg" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: progress > 70 ? 1 : 0, scale: progress > 70 ? 1 : 0, rotate: -90 }}
                            className="absolute -bottom-4 -left-4 text-rose-300"
                        >
                            <Sparkles size={32} className="animate-pulse drop-shadow-lg" />
                        </motion.div>
                    </div>

                    <h2 className="font-heading text-4xl md:text-5xl mb-12 font-extrabold tracking-widest drop-shadow-sm flex items-end gap-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400">
                        {progress < 100 ? "Brewing Magic" : "Ready"}
                        {progress < 100 && (
                            <div className="flex text-rose-500 pb-1">
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>.</motion.span>
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                            </div>
                        )}
                    </h2>

                    {/* Progress Bar & Percentage Container */}
                    <div className="flex flex-col items-center w-full max-w-sm relative">
                        <div className="text-5xl md:text-7xl font-accent bg-clip-text text-transparent bg-gradient-to-t from-rose-500 to-purple-400 font-bold tracking-wider mb-8 relative drop-shadow-md flex items-baseline justify-center w-32">
                            <motion.span
                                className="inline-block relative z-10 tabular-nums"
                            >
                                {Math.floor(progress)}
                            </motion.span>
                            <span className="text-3xl md:text-4xl text-rose-400 absolute top-0 -right-8">%</span>
                        </div>

                        <div className="w-full h-2 bg-rose-200/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm self-center">
                            <motion.div
                                className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-full relative"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            >
                                <motion.div
                                    className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/60"
                                    animate={{ x: [-40, 200] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
