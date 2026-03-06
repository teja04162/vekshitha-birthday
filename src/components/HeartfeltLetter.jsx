import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data';

export default function HeartfeltLetter() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 flex items-center justify-center z-10">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl w-full bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(251,113,133,0.15)] relative overflow-hidden"
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-rose-300 rounded-tl-3xl opacity-50 m-4" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-rose-300 rounded-br-3xl opacity-50 m-4" />

                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                    <motion.h3 variants={itemVariants} className="font-accent text-5xl md:text-6xl text-rose-600 mb-10 font-bold drop-shadow-sm text-center">
                        {siteData.letter.greeting}
                    </motion.h3>

                    <div className="space-y-8 font-body text-xl md:text-2xl text-gray-800 leading-relaxed max-w-2xl relative z-10">
                        {/* Decorative floating quote behind text */}
                        <div className="absolute -top-10 -left-10 text-[120px] text-rose-200/40 font-serif leading-none z-[-1]">
                            &ldquo;
                        </div>
                        {siteData.letter.paragraphs.map((p, index) => (
                            <motion.p key={index} variants={itemVariants}>
                                {p}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div variants={itemVariants} className="mt-16 text-right relative z-10">
                        <p className="font-accent text-4xl md:text-5xl text-rose-500 font-bold drop-shadow-sm">
                            {siteData.letter.closing}
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
