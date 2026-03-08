import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import { siteData } from '../data';

export default function Wishes() {
    const icons = [Sparkles, Heart, Star];

    return (
        <section className="relative min-h-screen py-32 px-6 md:px-12 z-10 flex flex-col items-center justify-center overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-rose-200/20 rounded-full blur-[120px] -z-10 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-200/20 rounded-full blur-[150px] -z-10 mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-center mb-24 relative"
            >
                {/* Decorative title stars */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -left-10 text-rose-300 opacity-60">
                    <Star size={40} />
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-6 -right-12 text-purple-300 opacity-60">
                    <Sparkles size={48} />
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 mb-6 drop-shadow-sm">
                    A Few Little Wishes
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full shadow-[0_0_15px_rgba(251,113,133,0.5)]" />
            </motion.div>

            {/* Masonry-style staggered grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl w-full">
                {siteData.wishes.map((wish, index) => {
                    const Icon = icons[index % icons.length];
                    // Create a staggered masonry look by pushing middle columns down
                    const marginClass = index % 3 === 1 ? "lg:mt-16" : index % 3 === 2 ? "lg:mt-8" : "";

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
                            className={`relative ${marginClass}`}
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, zIndex: 20 }}
                                className="glass-card bg-white/60 p-8 md:p-10 rounded-[2.5rem] text-center shadow-[0_15px_40px_-15px_rgba(251,113,133,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(251,113,133,0.5)] border border-white/80 relative overflow-hidden transition-all duration-500 group h-full flex flex-col justify-center items-center"
                            >
                                {/* Animated Top Gradient Bar */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 bg-[length:200%_auto] animate-gradient-x opacity-80" />

                                {/* Inner glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                                {/* Subtle background icon */}
                                <Icon className="absolute -bottom-6 -right-6 w-32 h-32 text-rose-100/40 group-hover:text-rose-200/50 transition-colors duration-500 -z-10 rotate-12" fill="currentColor" />

                                {/* Accent Icon */}
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-6 shadow-sm border border-white group-hover:scale-110 transition-transform duration-300"
                                >
                                    <Icon size={20} className="drop-shadow-sm" />
                                </motion.div>

                                <p className="font-display italic text-2xl md:text-3xl lg:text-[2rem] text-gray-800 leading-snug drop-shadow-sm font-bold relative z-10">
                                    "{wish}"
                                </p>

                                {/* Shimmer Sweep */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none z-20" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
