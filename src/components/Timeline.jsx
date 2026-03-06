import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data';

export default function Timeline() {
    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 z-10 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-4">
                    Our Journey
                </h2>
                <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full" />
            </motion.div>

            <div className="max-w-4xl w-full relative">
                {/* Animated Vertical Line */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-rose-300 via-purple-300 to-rose-300 rounded-full transform md:-translate-x-1/2 opacity-50"
                />

                {siteData.timeline.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className={`relative flex items-center justify-between md:justify-normal w-full mb-12 py-4 ${isEven ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Animated Dot icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                                className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full border-4 border-white shadow-lg transform -translate-x-[10px] md:-translate-x-1/2 z-10"
                            />

                            <div className="w-full pl-12 md:pl-0 md:w-5/12"></div>

                            <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="glass p-6 md:p-8 rounded-3xl hover:bg-white/60 transition-all duration-300 shadow-xl hover:shadow-2xl relative cursor-default group overflow-hidden"
                                >
                                    {/* Ambient glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200/40 to-purple-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                                    <h3 className="font-accent text-3xl md:text-4xl text-rose-600 font-bold mb-3 drop-shadow-sm group-hover:scale-105 transform origin-left transition-transform">
                                        {item.year}
                                    </h3>
                                    <p className="font-body text-gray-700 md:text-lg">
                                        {item.event}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
