import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, Moon, Sun, Feather, Quote } from 'lucide-react';
import { siteData } from '../data';

const icons = { Heart, Sparkles, Star, Moon, Sun, Feather };

export default function PreciousMoments() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [floatingShapes, setFloatingShapes] = useState([]);

    const cards = siteData.preciousMoments || [];

    useEffect(() => {
        // Generate floating background shapes on client side to avoid hydration mismatch
        const shapes = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
            type: i % 2
        }));
        setFloatingShapes(shapes);
    }, []);

    if (cards.length === 0) return null;

    const nextStep = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1 === cards.length ? 0 : prev + 1));
    };

    const prevStep = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 < 0 ? cards.length - 1 : prev - 1));
    };

    const variants = {
        initial: (direction) => ({
            x: direction > 0 ? 800 : -800,
            opacity: 0,
            scale: 0.6,
            rotateY: direction > 0 ? 60 : -60,
            rotateZ: direction > 0 ? 10 : -10,
            filter: "blur(15px)",
        }),
        animate: {
            zIndex: 10,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: 0,
            filter: "blur(0px)",
            transition: {
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.5 },
                rotateY: { type: "spring", stiffness: 200, damping: 20 },
                rotateZ: { type: "spring", stiffness: 200, damping: 20 },
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 800 : -800,
            opacity: 0,
            scale: 0.6,
            rotateY: direction < 0 ? 60 : -60,
            rotateZ: direction < 0 ? 10 : -10,
            filter: "blur(15px)",
            transition: {
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.5 }
            }
        })
    };

    return (
        <section id="moments" className="relative min-h-[100vh] py-24 px-6 z-10 overflow-hidden flex flex-col items-center justify-center pointer-events-auto">

            {/* Dynamic Background Glows */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-purple-300/20 rounded-full blur-[120px] -z-10 mix-blend-overlay"
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-rose-400/20 rounded-full blur-[100px] -z-10 mix-blend-overlay"
            />

            {/* Floating Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {floatingShapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0, 1, 0],
                            y: [`${shape.y}vh`, `${shape.y - 40}vh`],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            delay: shape.delay,
                            ease: "linear"
                        }}
                        className={`absolute drop-shadow-[0_0_8px_currentColor] ${shape.type === 0 ? 'text-rose-300/40' : 'text-purple-300/40'}`}
                        style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
                    >
                        {shape.type === 0 ? <Heart size={shape.size} fill="currentColor" /> : <Sparkles size={shape.size} />}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                className="text-center mb-16 z-30"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 animate-gradient-x drop-shadow-md mb-6 leading-tight">
                    Precious Moments
                </h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "8rem" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-1.5 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full shadow-[0_0_15px_rgba(251,113,133,0.5)]"
                />
            </motion.div>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-6xl h-[550px] md:h-[650px] flex items-center justify-center perspective-[1500px]">

                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute w-full max-w-md md:max-w-4xl h-full flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing px-4"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) {
                                nextStep();
                            } else if (swipe > 10000) {
                                prevStep();
                            }
                        }}
                    >
                        {/* The Premium Glass Card with Continuous Hover */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, rotateX: 5, rotateY: direction === 0 ? -5 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`relative w-full h-[450px] md:h-[550px] p-10 md:p-16 bg-white/60 backdrop-blur-3xl border-2 border-white/90 rounded-[3rem] shadow-[0_30px_70px_-15px_rgba(199,146,234,0.4)] flex flex-col justify-center items-center text-center overflow-hidden group`}
                            >

                                {/* Inner Gradient Lighting */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cards[index].color} opacity-[0.15] group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />

                                {/* Corner decorations */}
                                <div className="absolute top-0 left-0 w-40 h-40 bg-white/50 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/50 blur-2xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

                                {/* Floating Quote Icon */}
                                <motion.div
                                    animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3], rotate: [-5, 5, -5] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute top-8 left-8 md:top-12 md:left-12 text-rose-400/60 mix-blend-multiply"
                                >
                                    <Quote size={56} className="md:w-20 md:h-20" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2], rotate: [175, 185, 175] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-purple-400/60 mix-blend-multiply rotate-180"
                                >
                                    <Quote size={56} className="md:w-20 md:h-20" />
                                </motion.div>

                                {/* Icon Renderer */}
                                {(() => {
                                    const IconComp = icons[cards[index].icon] || Heart;
                                    return (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180, y: 20 }}
                                            animate={{ scale: 1, rotate: 0, y: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                                            className="relative"
                                        >
                                            <div className="absolute inset-0 bg-white/60 blur-xl rounded-full group-hover:bg-white/90 transition-all duration-500 pointer-events-none" />
                                            <motion.div
                                                animate={{ y: [-5, 5, -5] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${cards[index].color} flex items-center justify-center text-white mb-8 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}
                                            >
                                                <IconComp size={56} className="drop-shadow-md" />
                                            </motion.div>
                                        </motion.div>
                                    );
                                })()}

                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-6 drop-shadow-sm relative z-10"
                                >
                                    {cards[index].title}
                                </motion.h3>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="w-24 h-1.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto rounded-full mb-8 opacity-80 relative z-10"
                                />

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    className="font-body text-2xl md:text-3xl lg:text-4xl text-gray-700 leading-snug drop-shadow-sm font-medium z-10 px-4 md:px-12"
                                >
                                    {cards[index].message}
                                </motion.p>

                                {/* Edge highlights */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none" />
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none" />

                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none z-20" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full flex justify-between z-40 px-2 md:px-6 pointer-events-none">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevStep}
                        className="pointer-events-auto p-4 md:p-6 rounded-full glass bg-white/80 hover:bg-white text-rose-500 hover:text-rose-600 transition-all duration-300 shadow-[0_10px_30px_rgba(251,113,133,0.3)] group border border-white"
                    >
                        <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform drop-shadow-sm" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextStep}
                        className="pointer-events-auto p-4 md:p-6 rounded-full glass bg-white/80 hover:bg-white text-rose-500 hover:text-rose-600 transition-all duration-300 shadow-[0_10px_30px_rgba(251,113,133,0.3)] group border border-white"
                    >
                        <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform drop-shadow-sm" />
                    </motion.button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-4 mt-12 z-30">
                {cards.map((_, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setDirection(i > index ? 1 : -1);
                            setIndex(i);
                        }}
                        className={`transition-all duration-500 rounded-full ${i === index ? 'w-14 h-4 bg-gradient-to-r from-rose-400 to-purple-400 shadow-[0_0_15px_rgba(251,113,133,0.6)]' : 'w-4 h-4 bg-white/80 hover:bg-white shadow-md'}`}
                    />
                ))}
            </div>

        </section>
    );
}
