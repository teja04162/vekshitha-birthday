import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data';

export default function Wishes() {
    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 z-10 overflow-hidden flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-4 drop-shadow-sm">
                    A Few Little Wishes
                </h2>
                <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
                {siteData.wishes.map((wish, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.4 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, zIndex: 10 }}
                            className={`glass px-8 py-6 rounded-[2rem] max-w-sm text-center shadow-lg hover:shadow-2xl border border-white/50 relative overflow-hidden transition-all duration-300`}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300 via-purple-300 to-rose-300 bg-[length:200%_auto] animate-gradient-x" />
                            <p className="font-accent text-3xl text-rose-700 leading-snug pt-3 drop-shadow-sm font-bold">
                                "{wish}"
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
