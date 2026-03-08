import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { siteData } from '../data';

export default function Timeline() {
    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 z-10 flex flex-col items-center overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-rose-300/20 rounded-full blur-[100px] -z-10 mix-blend-overlay" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-[120px] -z-10 mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <h2 className="text-5xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 mb-6 drop-shadow-sm">
                    Our Journey
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full shadow-[0_0_15px_rgba(251,113,133,0.5)]" />
            </motion.div>

            <div className="max-w-5xl w-full relative">
                {/* Animated Vertical Center Line */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute left-6 md:left-1/2 top-0 w-1.5 bg-gradient-to-b from-rose-300 via-purple-400 to-rose-300 rounded-full transform md:-translate-x-1/2 opacity-70"
                >
                    {/* Glowing pulse moving down the line */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 -translate-x-1/2 w-3 h-24 bg-white/60 blur-sm rounded-full"
                    />
                </motion.div>

                {siteData.timeline.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, rotateX: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, type: "spring", bounce: 0.3 }}
                            style={{ perspective: 1000 }}
                            className={`relative flex items-center justify-between md:justify-normal w-full mb-16 py-4 ${isEven ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Animated Center Dot/Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 + 0.4, type: "spring" }}
                                className="absolute left-6 md:left-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(251,113,133,0.6)] transform -translate-x-1/2 z-20 flex items-center justify-center text-white"
                            >
                                <Heart size={18} className="md:w-5 md:h-5 drop-shadow-sm" fill="currentColor" />
                            </motion.div>

                            {/* Connecting Line from Card to Center Dot (Desktop Only) */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                                className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-rose-300 to-purple-300 w-[calc(50%-3rem)] z-0 ${isEven ? "right-1/2 origin-right" : "left-1/2 origin-left"
                                    }`}
                            />

                            <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-3rem)]"></div>

                            <div className={`w-full pl-16 md:pl-0 md:w-[calc(50%-3rem)] z-10 ${isEven ? "md:text-left" : "md:text-right"}`}>
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className="glass-card bg-white/60 border border-white/80 p-8 md:p-10 rounded-[2rem] hover:bg-white/80 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(251,113,133,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(251,113,133,0.5)] relative group overflow-hidden text-left"
                                >
                                    {/* Ambient subtle glow inside card */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 via-transparent to-purple-200/20 pointer-events-none" />

                                    {/* Shimmer sweep on hover */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />

                                    <h3 className="font-display italic text-3xl md:text-4xl lg:text-5xl text-rose-600 font-bold mb-4 drop-shadow-sm group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 block">
                                        {item.year}
                                    </h3>
                                    <p className="font-body text-gray-700 md:text-xl lg:text-2xl leading-relaxed font-medium">
                                        {item.event}
                                    </p>

                                    {/* Decorative subtle heart watermark */}
                                    <Heart className="absolute -bottom-4 -right-4 w-24 h-24 text-rose-100/30 group-hover:text-rose-200/40 transition-colors pointer-events-none -z-10" fill="currentColor" />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
