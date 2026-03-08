import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { siteData } from '../data';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';

export default function FinalSurprise() {
    const [revealed, setRevealed] = useState(false);
    const [floatingShapes, setFloatingShapes] = useState([]);

    useEffect(() => {
        // Generate floating background shapes on client side to avoid hydration mismatch
        const shapes = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
            type: i % 3
        }));
        setFloatingShapes(shapes);
    }, []);

    const triggerSurprise = () => {
        setRevealed(true);

        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        // Fireworks confetti
        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#8a2be2', '#00ffff']
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#8a2be2', '#00ffff']
            }));
        }, 250);

        // School pride side cannons
        setTimeout(() => {
            const end = Date.now() + (10 * 1000);
            const colors = ['#ff0000', '#ff69b4', '#ffd700'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                    zIndex: 60
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                    zIndex: 60
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }, 1000);
    };

    return (
        <section className={`relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden transition-colors duration-[2000ms] ${revealed ? 'bg-slate-950' : 'bg-transparent'}`}>

            {/* Floating Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {floatingShapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: revealed ? [0, 0.4, 0] : [0, 0.2, 0],
                            scale: revealed ? [0, 1.2, 0] : [0, 1, 0],
                            y: [`${shape.y}vh`, `${shape.y - 30}vh`]
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            delay: shape.delay,
                            ease: "linear"
                        }}
                        className={`absolute font-black drop-shadow-sm ${shape.type === 0 ? 'text-rose-400/30' : shape.type === 1 ? 'text-purple-400/30' : 'text-amber-400/30'}`}
                        style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
                    >
                        {shape.type === 0 ? <Heart size={shape.size} fill="currentColor" /> :
                            shape.type === 1 ? <Star size={shape.size} fill="currentColor" /> :
                                <Sparkles size={shape.size} />}
                    </motion.div>
                ))}
            </div>

            {/* Glowing orbs moving dynamically */}
            <AnimatePresence>
                {revealed && (
                    <>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-gradient-to-tr from-pink-600/30 to-purple-600/30 blur-[100px] md:blur-[150px] rounded-full z-0 pointer-events-none mix-blend-screen -translate-x-1/2 -translate-y-1/2"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-gradient-to-tr from-rose-500/20 to-orange-500/20 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-screen"
                        />
                    </>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                style={{ perspective: 1000 }}
                className={`max-w-4xl w-full p-8 md:p-16 flex flex-col items-center rounded-3xl relative z-10 overflow-hidden transition-all duration-[2000ms] ${revealed
                        ? 'bg-black/40 border border-rose-500/30 shadow-[0_0_100px_rgba(244,114,182,0.2)] backdrop-blur-xl'
                        : 'glass-card border border-white/60 shadow-[0_20px_60px_-15px_rgba(255,192,203,0.5)]'
                    }`}
            >
                {/* Subtle internal shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay" />

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-rose-300/30 to-transparent blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-300/30 to-transparent blur-2xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <AnimatePresence mode="wait">
                    {!revealed ? (
                        <motion.div
                            key="unrevealed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center text-center space-y-10 w-full relative z-10 py-10"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Gift size={72} className="text-rose-500 drop-shadow-[0_10px_15px_rgba(244,114,182,0.4)]" />
                            </motion.div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 animate-gradient-x drop-shadow-sm leading-tight px-4 pb-4">
                                {siteData.final.title}
                            </h2>

                            <motion.div className="relative group mt-8">
                                <motion.div
                                    className="absolute -inset-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-gradient-x"
                                />
                                <motion.button
                                    onClick={triggerSurprise}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative flex items-center gap-4 px-10 md:px-14 py-5 md:py-6 bg-white text-rose-500 font-body text-xl md:text-2xl rounded-full shadow-[0_10px_30px_#fb718550] transition-all duration-300 font-bold font-heading overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        <Sparkles size={28} className="animate-spin-slow group-hover:scale-125 transition-transform text-rose-500" />
                                        <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:to-purple-600 transition-all font-bold tracking-wide">
                                            {siteData.final.buttonText}
                                        </span>
                                    </span>
                                    {/* Button shine effect */}
                                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-rose-100 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                type: "spring",
                                damping: 15,
                                staggerChildren: 0.2
                            }}
                            className="flex flex-col items-center w-full relative z-10 py-8"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12, duration: 1.5, delay: 0.2 }}
                                className="mb-8"
                            >
                                <motion.div
                                    animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-rose-500/30 blur-3xl rounded-full" />
                                    <Heart size={90} fill="currentColor" className="text-rose-500 relative z-10 drop-shadow-[0_0_30px_rgba(244,114,182,0.8)]" />
                                </motion.div>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="font-accent text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 font-bold mb-14 drop-shadow-[0_0_25px_rgba(251,113,133,0.3)] animate-gradient-x text-center leading-normal py-2"
                            >
                                {siteData.final.message}
                            </motion.h3>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="flex justify-center flex-wrap gap-6 md:gap-10 text-rose-400 mt-2"
                            >
                                {[
                                    { delay: 0, size: 40, color: "text-rose-400" },
                                    { delay: 0.2, size: 56, color: "text-purple-400" },
                                    { delay: 0.4, size: 72, color: "text-pink-500" },
                                    { delay: 0.6, size: 56, color: "text-purple-400" },
                                    { delay: 0.8, size: 40, color: "text-rose-400" }
                                ].map((heart, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.2 + heart.delay, type: 'spring', damping: 10 }}
                                    >
                                        <motion.div
                                            animate={{
                                                y: [0, -25, 0],
                                                scale: [1, 1.15, 1],
                                                rotate: [0, i % 2 === 0 ? 15 : -15, 0]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2.5 + i * 0.2,
                                                delay: heart.delay,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <Heart size={heart.size} fill="currentColor" className={`${heart.color} drop-shadow-[0_0_20px_currentColor]`} />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Footer text */}
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className={`absolute bottom-8 font-body text-sm md:text-base font-medium flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-[2000ms] backdrop-blur-md overflow-hidden ${revealed
                        ? 'text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                        : 'text-gray-600 glass-card border border-white/60 hover:bg-white/60'
                    }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                <span className="relative z-10">Made with</span>
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="relative z-10"
                >
                    <Heart size={18} fill="currentColor" className="text-rose-500 drop-shadow-sm" />
                </motion.div>
                <span className="relative z-10">for {siteData.name}</span>
            </motion.footer>
        </section>
    );
}
