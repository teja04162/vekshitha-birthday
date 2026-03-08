import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../data';
import { Heart, MailOpen } from 'lucide-react';

export default function HeartfeltLetter() {
    const [isOpen, setIsOpen] = useState(false);

    const letterVariants = {
        closed: { height: 0, opacity: 0, y: 50 },
        open: {
            height: 'auto',
            opacity: 1,
            y: 0,
            transition: {
                height: { duration: 0.8, ease: "anticipate" },
                opacity: { duration: 0.5, delay: 0.3 },
                y: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 }
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center z-10">

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 1 }}
                className="w-full max-w-3xl perspective-[1000px] flex flex-col items-center"
            >
                {/* Envelope Wrapper */}
                <motion.div
                    className="relative w-full max-w-lg bg-rose-100 rounded-3xl shadow-[0_20px_50px_#fb71854d] p-8 text-center cursor-pointer border border-white/60 mb-8 mx-auto hover:shadow-[0_20px_60px_#fb718580] transition-shadow duration-500"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-3xl pointer-events-none" />

                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center gap-4 text-rose-500"
                    >
                        <MailOpen size={64} className="drop-shadow-sm" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-400 text-center px-4">
                            A Letter For You
                        </h2>
                        <span className="text-sm font-body uppercase tracking-widest text-rose-400/80 font-bold">
                            Tap to {isOpen ? 'Close' : 'Open'}
                        </span>
                    </motion.div>
                </motion.div>

                {/* The Letter */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={letterVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="w-full bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-10 md:p-16 shadow-[0_30px_60px_-15px_#fb71854d] relative overflow-hidden flex flex-col items-center"
                        >
                            {/* Decorative Letter Lines/Accents */}
                            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-rose-200 rounded-tl-[2rem] opacity-50 m-6" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-rose-200 rounded-br-[2rem] opacity-50 m-6" />

                            {/* Faint ruling lines to look like stationery */}
                            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(251, 113, 133, 0.1) 40px)', backgroundSize: '100% 40px', marginTop: '60px' }} />

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-full relative z-10"
                            >
                                <motion.h3 variants={itemVariants} className="font-display italic text-4xl md:text-5xl lg:text-6xl text-rose-600 mb-10 font-bold drop-shadow-sm text-center">
                                    {siteData.letter.greeting}
                                </motion.h3>

                                <div className="space-y-6 md:space-y-8 font-handwriting text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-[1.6] max-w-3xl mx-auto font-medium px-4 md:px-8">
                                    {siteData.letter.paragraphs.map((p, index) => (
                                        <motion.p key={index} variants={itemVariants} className="text-left sm:text-justify md:indent-8">
                                            {p}
                                        </motion.p>
                                    ))}
                                </div>

                                <motion.div variants={itemVariants} className="mt-16 flex flex-col items-end w-full max-w-3xl mx-auto px-4 md:px-8">
                                    <p className="font-accent text-5xl md:text-6xl lg:text-7xl text-rose-500 font-bold drop-shadow-md pb-4 pr-4 md:pr-12">
                                        {siteData.letter.closing}
                                    </p>
                                    <Heart className="text-rose-400 mt-2 md:mr-16 animate-pulse" fill="currentColor" size={32} />
                                </motion.div>
                            </motion.div>

                            {/* Realistic Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
