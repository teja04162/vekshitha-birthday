import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { siteData } from '../data';
import { Sparkles, Heart } from 'lucide-react';

export default function FinalSurprise() {
    const [revealed, setRevealed] = useState(false);

    const triggerSurprise = () => {
        setRevealed(true);

        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 z-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="glass-card max-w-2xl w-full p-10 md:p-16 flex flex-col items-center"
            >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-rose-600 mb-8">
                    {siteData.final.title}
                </h2>

                {!revealed ? (
                    <motion.button
                        onClick={triggerSurprise}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white font-body text-xl rounded-full shadow-[0_10px_25px_rgba(251,113,133,0.4)] hover:shadow-[0_15px_35px_rgba(251,113,133,0.6)] transition-all duration-300"
                    >
                        <Sparkles size={24} />
                        {siteData.final.buttonText}
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="font-accent text-5xl md:text-7xl text-rose-500 font-bold mb-6 animate-pulse">
                            {siteData.final.message}
                        </h3>
                        <div className="flex justify-center gap-4 text-rose-400">
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>
                                <Heart size={40} fill="currentColor" />
                            </motion.div>
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>
                                <Heart size={40} fill="currentColor" />
                            </motion.div>
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>
                                <Heart size={40} fill="currentColor" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Footer text */}
            <footer className="absolute bottom-8 text-rose-800/60 font-body text-sm flex items-center gap-2">
                Made with <Heart size={14} fill="currentColor" className="text-rose-500" /> for {siteData.name}
            </footer>
        </section>
    );
}
